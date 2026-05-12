# NexoBackend.md
> Archivo de contexto para desarrollo del backend del sistema **Nexo**.
> Propósito: proveer a la IA asistente el conocimiento completo de la arquitectura, modelos de datos, reglas de negocio y convenciones del backend para que pueda generar código coherente, seguro y alineado al proyecto.

---

## 1. Descripción del Proyecto

**Nexo** es una aplicación web para la gestión de visitas postventa en una empresa inmobiliaria que administra arriendos de oficinas y departamentos. El sistema centraliza el ciclo completo de atención de reclamos: desde que el cliente reporta una falla hasta que firma digitalmente el acta de conformidad.

### Actores del sistema

| Rol | Descripción |
|-----|-------------|
| `cliente` | Arrendatario que reporta fallas y confirma la resolución |
| `coordinador` | Personal interno de postventa que gestiona tickets y asigna técnicos |
| `tecnico` | Contratista externo que ejecuta las reparaciones |
| `admin` | Administrador del sistema con acceso total |

---

## 2. Stack Tecnológico Backend

| Capa | Tecnología | Uso |
|------|-----------|-----|
| Base de datos | Supabase (PostgreSQL 15) | Almacenamiento relacional principal |
| Autenticación | Supabase Auth | JWT, sesiones, verificación de email |
| Almacenamiento de archivos | Supabase Storage | Fotos de tickets, firmas digitales, reportes PDF |
| Lógica de servidor | Supabase Edge Functions (Deno / TypeScript) | Notificaciones, lógica de negocio compleja, webhooks |
| Seguridad de datos | Row Level Security (RLS) en PostgreSQL | Aislamiento de datos por rol y usuario |
| Notificaciones email | Resend (via Edge Function) | Correos transaccionales automáticos |
| Deploy / CI | Vercel (frontend) + Supabase Cloud | Hosting y base de datos gestionados |

---

## 3. Modelo de Datos

### Convenciones generales
- Todos los IDs son `uuid` generados con `gen_random_uuid()`.
- Todos los timestamps usan `timestamptz` en UTC.
- Campos de auditoría en todas las tablas: `created_at`, `updated_at`.
- Snake_case para nombres de tablas y columnas.
- Prefijo `fk_` no se usa; las foreign keys se nombran `tabla_id`.

---

### 3.1 Tabla `profiles`
Extiende `auth.users` de Supabase. Se crea automáticamente vía trigger al registrar un usuario.

```sql
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  email       text not null unique,
  phone       text,
  role        text not null check (role in ('cliente', 'coordinador', 'tecnico', 'admin')),
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

**Trigger de creación automática:**
```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'cliente')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

### 3.2 Tabla `properties`
Propiedades administradas por la inmobiliaria.

```sql
create table public.properties (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,        -- Ej: "TORRE-A-501"
  address         text not null,
  type            text not null check (type in ('oficina', 'departamento')),
  floor           int,
  unit_number     text,
  tower           text,
  warranty_start  date,                        -- Fecha de entrega al arrendatario
  warranty_days   int default 365,             -- Días de garantía
  client_id       uuid references public.profiles(id),
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

**Campo calculado (vista):**
```sql
create or replace view public.properties_warranty as
select
  *,
  warranty_start + (warranty_days || ' days')::interval as warranty_end,
  (warranty_start + (warranty_days || ' days')::interval)::date - current_date as warranty_days_remaining,
  case
    when (warranty_start + (warranty_days || ' days')::interval)::date - current_date > 90 then 'green'
    when (warranty_start + (warranty_days || ' days')::interval)::date - current_date between 30 and 90 then 'yellow'
    else 'red'
  end as warranty_status
from public.properties;
```

---

### 3.3 Tabla `contractors`
Perfil de contratistas/técnicos externos. Complementa `profiles` para técnicos.

```sql
create table public.contractors (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  company_name    text,                        -- Razón social si aplica
  specialties     text[] not null default '{}', -- ['gasfiteria', 'electricidad', ...]
  avg_rating      numeric(3,2) default 0,      -- Calculado, actualizado por trigger
  total_reviews   int default 0,
  status          text not null default 'activo' check (status in ('activo', 'suspendido')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

---

### 3.4 Tabla `tickets`
Núcleo del sistema. Registra cada reclamo postventa.

```sql
create table public.tickets (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,        -- Ej: "NX-2026-00145" (generado por trigger)
  property_id     uuid not null references public.properties(id),
  client_id       uuid not null references public.profiles(id),
  coordinator_id  uuid references public.profiles(id),
  contractor_id   uuid references public.contractors(id),

  -- Clasificación
  category        text not null check (category in (
                    'gasfiteria', 'electricidad', 'estructural',
                    'climatizacion', 'otros'
                  )),
  urgency         text not null default 'media' check (urgency in ('baja', 'media', 'alta')),
  title           text not null,
  description     text not null,

  -- Estado
  status          text not null default 'pendiente' check (status in (
                    'pendiente', 'asignado', 'en_visita', 'repuestos_solicitados',
                    'segunda_visita', 'pendiente_conformidad', 'finalizado', 'rechazado'
                  )),
  rejection_reason text,                       -- Obligatorio si status = 'rechazado'

  -- Tiempos
  assigned_at     timestamptz,
  visited_at      timestamptz,
  resolved_at     timestamptz,
  closed_at       timestamptz,

  -- SLA tracking
  sla_deadline    timestamptz,                 -- assigned_at + 48h por defecto
  sla_breached    boolean default false,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

**Trigger para generar código de ticket:**
```sql
create or replace function public.generate_ticket_code()
returns trigger as $$
declare
  year_part text;
  seq_num   int;
begin
  year_part := to_char(now(), 'YYYY');
  select count(*) + 1 into seq_num
  from public.tickets
  where extract(year from created_at) = extract(year from now());
  new.code := 'NX-' || year_part || '-' || lpad(seq_num::text, 5, '0');
  return new;
end;
$$ language plpgsql;

create trigger set_ticket_code
  before insert on public.tickets
  for each row execute procedure public.generate_ticket_code();
```

---

### 3.5 Tabla `ticket_status_history`
Historial inmutable de cambios de estado. Nunca se actualiza, solo se inserta.

```sql
create table public.ticket_status_history (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  changed_by  uuid not null references public.profiles(id),
  from_status text,
  to_status   text not null,
  comment     text,
  created_at  timestamptz not null default now()
);
```

---

### 3.6 Tabla `ticket_media`
Archivos adjuntos a un ticket (fotos antes/después, documentos).

```sql
create table public.ticket_media (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  phase       text not null check (phase in ('reporte', 'durante', 'cierre')),
  file_path   text not null,                  -- Path en Supabase Storage
  file_name   text not null,
  file_type   text not null,                  -- 'image/jpeg', 'image/png', etc.
  file_size   int,                            -- Bytes
  created_at  timestamptz not null default now()
);
```

---

### 3.7 Tabla `visit_schedules`
Propuestas de horarios y confirmación de visitas.

```sql
create table public.visit_schedules (
  id              uuid primary key default gen_random_uuid(),
  ticket_id       uuid not null references public.tickets(id) on delete cascade,
  proposed_slots  jsonb not null,             -- Array de {date, time_from, time_to}
  selected_slot   jsonb,                      -- Slot elegido por el cliente
  confirmed_at    timestamptz,
  reminder_sent   boolean default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

**Estructura del JSONB `proposed_slots`:**
```json
[
  { "date": "2026-04-10", "time_from": "09:00", "time_to": "11:00" },
  { "date": "2026-04-10", "time_from": "14:00", "time_to": "16:00" },
  { "date": "2026-04-11", "time_from": "10:00", "time_to": "12:00" }
]
```

---

### 3.8 Tabla `conformity_acts`
Acta de conformidad firmada digitalmente al cerrar un ticket.

```sql
create table public.conformity_acts (
  id              uuid primary key default gen_random_uuid(),
  ticket_id       uuid not null unique references public.tickets(id) on delete cascade,
  signed_by       uuid not null references public.profiles(id),
  signature_path  text not null,              -- Path en Supabase Storage (imagen PNG)
  summary         text,                       -- Resumen del trabajo realizado
  signed_at       timestamptz not null default now(),
  ip_address      text,                       -- IP del firmante para trazabilidad
  created_at      timestamptz not null default now()
);
```

---

### 3.9 Tabla `reviews`
Calificación obligatoria del cliente al cerrar un ticket.

```sql
create table public.reviews (
  id              uuid primary key default gen_random_uuid(),
  ticket_id       uuid not null unique references public.tickets(id) on delete cascade,
  contractor_id   uuid not null references public.contractors(id),
  client_id       uuid not null references public.profiles(id),
  rating          int not null check (rating between 1 and 5),
  comment         text,
  created_at      timestamptz not null default now()
);
```

**Trigger para actualizar `avg_rating` en `contractors`:**
```sql
create or replace function public.update_contractor_rating()
returns trigger as $$
begin
  update public.contractors
  set
    avg_rating    = (select round(avg(rating)::numeric, 2) from public.reviews where contractor_id = new.contractor_id),
    total_reviews = (select count(*) from public.reviews where contractor_id = new.contractor_id),
    updated_at    = now()
  where id = new.contractor_id;
  return new;
end;
$$ language plpgsql;

create trigger on_review_created
  after insert on public.reviews
  for each row execute procedure public.update_contractor_rating();
```

---

### 3.10 Tabla `notifications_log`
Registro de todas las notificaciones enviadas. Útil para auditoría y reenvíos.

```sql
create table public.notifications_log (
  id          uuid primary key default gen_random_uuid(),
  recipient   uuid not null references public.profiles(id),
  type        text not null,                  -- 'ticket_created', 'status_changed', etc.
  channel     text not null default 'email',
  subject     text,
  body        text,
  sent_at     timestamptz,
  status      text default 'pending' check (status in ('pending', 'sent', 'failed')),
  error       text,
  created_at  timestamptz not null default now()
);
```

---

## 4. Row Level Security (RLS)

> **Regla general:** habilitar RLS en todas las tablas públicas. Nada es accesible por defecto; cada política debe ser explícita.

### Helper function para obtener el rol del usuario autenticado

```sql
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer stable;
```

### Políticas principales por tabla

#### `profiles`
```sql
alter table public.profiles enable row level security;

-- Cada usuario ve y edita solo su propio perfil
create policy "profiles: read own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles: update own" on public.profiles
  for update using (id = auth.uid());

-- Admin y coordinador pueden leer todos los perfiles
create policy "profiles: admin/coord read all" on public.profiles
  for select using (get_my_role() in ('admin', 'coordinador'));
```

#### `tickets`
```sql
alter table public.tickets enable row level security;

-- Cliente ve solo sus propios tickets
create policy "tickets: client read own" on public.tickets
  for select using (client_id = auth.uid());

-- Cliente crea tickets
create policy "tickets: client insert" on public.tickets
  for insert with check (client_id = auth.uid() and get_my_role() = 'cliente');

-- Coordinador y admin ven todos los tickets
create policy "tickets: coord/admin read all" on public.tickets
  for select using (get_my_role() in ('coordinador', 'admin'));

-- Coordinador y admin actualizan tickets
create policy "tickets: coord/admin update" on public.tickets
  for update using (get_my_role() in ('coordinador', 'admin'));

-- Técnico ve tickets asignados a él
create policy "tickets: tecnico read assigned" on public.tickets
  for select using (
    get_my_role() = 'tecnico' and
    contractor_id in (select id from public.contractors where profile_id = auth.uid())
  );
```

#### `ticket_media`
```sql
alter table public.ticket_media enable row level security;

-- El propietario del ticket puede ver los archivos
create policy "media: client read own ticket" on public.ticket_media
  for select using (
    ticket_id in (select id from public.tickets where client_id = auth.uid())
  );

-- Técnico sube archivos en tickets asignados
create policy "media: tecnico insert assigned" on public.ticket_media
  for insert with check (
    get_my_role() in ('tecnico', 'coordinador', 'admin', 'cliente')
  );

-- Coordinador y admin ven todos
create policy "media: coord/admin all" on public.ticket_media
  for select using (get_my_role() in ('coordinador', 'admin'));
```

#### `reviews`
```sql
alter table public.reviews enable row level security;

-- Cliente inserta review solo en sus tickets
create policy "reviews: client insert own" on public.reviews
  for insert with check (
    client_id = auth.uid() and
    ticket_id in (select id from public.tickets where client_id = auth.uid())
  );

-- Todos los roles pueden leer reviews (transparencia)
create policy "reviews: all read" on public.reviews
  for select using (true);
```

---

## 5. Supabase Storage

### Buckets

| Bucket | Acceso | Descripción |
|--------|--------|-------------|
| `ticket-media` | Privado | Fotos adjuntas a tickets (reporte, durante, cierre) |
| `signatures` | Privado | Imágenes PNG de firmas digitales |
| `reports` | Privado | PDFs de reportes mensuales generados |

### Convención de rutas de archivos

```
ticket-media/
  {ticket_id}/reporte/{uuid}.jpg
  {ticket_id}/durante/{uuid}.jpg
  {ticket_id}/cierre/{uuid}.jpg

signatures/
  {ticket_id}/{uuid}.png

reports/
  {year}/{month}/reporte-{property_id}.pdf
```

### URLs firmadas
Todos los archivos se sirven mediante URLs firmadas con expiración de 1 hora. Nunca se exponen rutas directas al cliente.

```typescript
// Ejemplo de generación de URL firmada
const { data } = await supabase.storage
  .from('ticket-media')
  .createSignedUrl(filePath, 3600) // 1 hora
```

---

## 6. Edge Functions

Ubicación: `supabase/functions/`

### 6.1 `notify-status-change`
Se invoca cuando el estado de un ticket cambia. Envía email al cliente y/o técnico.

**Trigger:** Database Webhook en `tickets` (UPDATE de columna `status`)

```typescript
// supabase/functions/notify-status-change/index.ts
// Recibe: { ticket_id, old_status, new_status, changed_by }
// Acción: consulta datos del ticket, construye email y envía via Resend
```

### 6.2 `check-sla-breaches`
Cron job que revisa tickets sin asignar en más de 48 horas.

**Schedule:** Cada hora (`0 * * * *`)

```typescript
// supabase/functions/check-sla-breaches/index.ts
// Acción: busca tickets en 'pendiente' con created_at > 48h
//         actualiza sla_breached = true
//         notifica al coordinador por email
```

### 6.3 `send-visit-reminder`
Recuerda al cliente seleccionar un horario si no lo hizo en 24 horas.

**Schedule:** Cada 6 horas

```typescript
// supabase/functions/send-visit-reminder/index.ts
// Acción: busca visit_schedules con confirmed_at IS NULL y created_at > 24h
//         reminder_sent = false
//         envía email de recordatorio al cliente
```

### 6.4 `generate-monthly-report`
Genera el reporte PDF mensual de tickets y lo guarda en Storage.

**Trigger:** Manual (invocada desde el panel de admin) o cron mensual

```typescript
// supabase/functions/generate-monthly-report/index.ts
// Recibe: { month, year, property_id? }
// Acción: consulta tickets del período, genera PDF, sube a Storage 'reports'
```

---

## 7. Tipos TypeScript compartidos

> Estos tipos deben vivir en `src/types/database.ts` y ser compartidos entre el frontend y las Edge Functions.

```typescript
export type UserRole = 'cliente' | 'coordinador' | 'tecnico' | 'admin'

export type TicketStatus =
  | 'pendiente'
  | 'asignado'
  | 'en_visita'
  | 'repuestos_solicitados'
  | 'segunda_visita'
  | 'pendiente_conformidad'
  | 'finalizado'
  | 'rechazado'

export type TicketCategory =
  | 'gasfiteria'
  | 'electricidad'
  | 'estructural'
  | 'climatizacion'
  | 'otros'

export type TicketUrgency = 'baja' | 'media' | 'alta'

export type MediaPhase = 'reporte' | 'durante' | 'cierre'

export type WarrantyStatus = 'green' | 'yellow' | 'red'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  code: string
  address: string
  type: 'oficina' | 'departamento'
  floor: number | null
  unit_number: string | null
  tower: string | null
  warranty_start: string | null
  warranty_days: number
  client_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Ticket {
  id: string
  code: string
  property_id: string
  client_id: string
  coordinator_id: string | null
  contractor_id: string | null
  category: TicketCategory
  urgency: TicketUrgency
  title: string
  description: string
  status: TicketStatus
  rejection_reason: string | null
  assigned_at: string | null
  visited_at: string | null
  resolved_at: string | null
  closed_at: string | null
  sla_deadline: string | null
  sla_breached: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  ticket_id: string
  contractor_id: string
  client_id: string
  rating: number
  comment: string | null
  created_at: string
}

export interface VisitSlot {
  date: string        // 'YYYY-MM-DD'
  time_from: string  // 'HH:MM'
  time_to: string    // 'HH:MM'
}
```

---

## 8. Variables de Entorno

```bash
# .env.local (Next.js) — nunca commitear
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Solo en Edge Functions / servidor — nunca exponer al cliente
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
RESEND_API_KEY=<resend-api-key>
```

> **Regla crítica:** `SUPABASE_SERVICE_ROLE_KEY` bypasea RLS completamente. Solo usarla en Edge Functions con `security definer`. Nunca exponerla en el cliente.

---

## 9. Convenciones de Desarrollo

### Nombrado
- **Tablas:** plural, snake_case (`tickets`, `visit_schedules`)
- **Columnas:** snake_case (`created_at`, `client_id`)
- **Edge Functions:** kebab-case (`notify-status-change`)
- **Tipos TS:** PascalCase para interfaces, camelCase para variables

### Reglas de negocio críticas
1. Un ticket solo puede avanzar de estado; no puede retroceder salvo de `pendiente_conformidad` → `en_visita` (si el cliente rechaza el acta).
2. El estado `finalizado` es irreversible.
3. No se puede asignar un contratista con `status = 'suspendido'`.
4. La review es obligatoria para pasar a `finalizado`; validar a nivel de Edge Function, no solo en frontend.
5. Toda eliminación es lógica (`is_active = false`); no se hace `DELETE` en tablas principales.
6. El campo `sla_breached` lo gestiona exclusivamente la Edge Function `check-sla-breaches`; el frontend es solo lectura.

### Manejo de errores en Edge Functions
```typescript
// Patrón estándar de respuesta
return new Response(
  JSON.stringify({ success: false, error: 'Mensaje descriptivo' }),
  { status: 400, headers: { 'Content-Type': 'application/json' } }
)
```

---

## 10. Diagrama de Flujo del Ticket

```
[Cliente crea ticket]
        │
        ▼
   PENDIENTE ──(+48h sin acción)──► SLA BREACH → alerta coordinador
        │
   [Coordinador asigna técnico]
        │
        ▼
   ASIGNADO ──► [Sistema envía slots de horario al cliente]
        │
   [Cliente confirma horario]
        │
        ▼
   EN_VISITA ──► [Técnico sube fotos de cierre]
        │
        ├──► [Se necesitan repuestos]
        │         │
        │    REPUESTOS_SOLICITADOS
        │         │
        │    SEGUNDA_VISITA ──► [Técnico sube fotos]
        │         │
        ▼         ▼
   PENDIENTE_CONFORMIDAD
        │
   [Cliente firma acta]──── rechaza ────► EN_VISITA
        │
        ▼
   [Cliente califica 1-5 ★] (obligatorio)
        │
        ▼
   FINALIZADO (irreversible)
```

---

*Última actualización: Marzo 2026 — Versión 1.0*
