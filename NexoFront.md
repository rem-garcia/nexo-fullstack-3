# NexoFront.md
> Archivo de contexto para desarrollo del frontend del sistema **Nexo**.
> Estado actual: **pendiente de definición**. Este archivo se completará a medida que avance el proyecto y se tomen decisiones sobre el stack, arquitectura y diseño del frontend.

---

## 1. Stack Tecnológico (confirmado)

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Framework | Next.js con TypeScript | ✅ Confirmado |
| Hosting / Deploy | Vercel | ✅ Confirmado |
| Librería de UI | Por definir | ⏳ Pendiente |
| Estado global | Por definir | ⏳ Pendiente |
| Arquitectura de router | Por definir (App Router recomendado) | ⏳ Pendiente |

---

## 2. Integración con el Backend

**El frontend NUNCA toca Supabase.** Solo el backend (API REST) accede a Supabase.
El frontend (dashboard) únicamente hace `fetch` a los backends desplegados como
proyectos separados en Vercel:

```
Frontend (apps/dashboard)        Backend API REST              Supabase
login-page.tsx     ──fetch──►    apps/auth   /api/auth    ──►  Auth
dashboard pages    ──fetch──►    apps/auth   /api/users   ──►  profiles
                   ──fetch──►    apps/tickets/api/tickets ──►  reclamo/tickets
```

### Autenticación con Bearer token (JWT)

Como cada app es un proyecto Vercel distinto (orígenes `*.vercel.app` diferentes)
y no hay dominio propio, no se pueden usar cookies de sesión compartidas (serían
cookies de terceros, bloqueadas por Safari/Firefox). Por eso la sesión viaja como
**Bearer token**:

1. `login` → el backend `/api/auth` valida contra Supabase y devuelve el `access_token`.
2. El dashboard guarda el token en una cookie *first-party* (`nexo_token`).
3. Los Server Components leen esa cookie y la reenvían al backend como
   `Authorization: Bearer <token>` (ver `lib/session.ts`).
4. El backend valida el JWT (`supabase.auth.getUser(token)`) y consulta `profiles`.

### Variables de entorno del frontend (sin claves de Supabase)

```bash
NEXT_PUBLIC_AUTH_API_URL=https://nexo-auth.vercel.app/api/auth
NEXT_PUBLIC_USERS_API_URL=https://nexo-auth.vercel.app/api/users
NEXT_PUBLIC_TICKETS_API_URL=https://nexo-tickets.vercel.app/api/tickets
```

> El backend habilita CORS con `Authorization` mediante `proxy.ts` (middleware de
> Next 16) en cada microservicio.

---

## 3. Tipos compartidos

Los tipos TypeScript del dominio están definidos en `NexoBackend.md` (sección 7) y deben vivir en:

```
src/
  types/
    database.ts   ← Tipos del modelo de datos (Profile, Ticket, Review, etc.)
    api.ts        ← Tipos de requests/responses de Edge Functions
```

Siempre importar los tipos desde `@/types/database` para mantener consistencia con el backend.

---

## 4. Roles y Vistas por Definir

Cada rol del sistema tendrá una sección de la aplicación diferente. Las rutas y componentes se definirán en futuras iteraciones:

| Rol | Sección principal | Estado |
|-----|------------------|--------|
| `cliente` | Portal de reclamos: crear ticket, ver estado, firmar acta | ⏳ Por diseñar |
| `coordinador` | Dashboard de gestión: tickets, asignación, alertas | ⏳ Por diseñar |
| `tecnico` | Vista de trabajos asignados y carga de evidencia | ⏳ Por diseñar |
| `admin` | Panel completo: usuarios, reportes, configuración | ⏳ Por diseñar |

---

## 5. Consideraciones Técnicas a Resolver

Los siguientes puntos deberán definirse antes o durante el desarrollo del frontend:

- [ ] Arquitectura de rutas (App Router vs Pages Router)
- [ ] Estrategia de manejo de estado global (sesión, tickets activos, notificaciones)
- [ ] Librería de componentes UI
- [ ] Estrategia de formularios (React Hook Form, Formik, nativo)
- [ ] Componente de firma digital (canvas HTML5 con librería como `signature_pad`)
- [ ] Manejo de carga de imágenes con preview y validación de tamaño (máx. 10 MB)
- [ ] Estrategia de notificaciones en tiempo real (Supabase Realtime para actualizar estados de tickets sin recargar)
- [ ] Generación de PDF en cliente o servidor para reportes

---

## 6. Referencia al Backend

Para entender el modelo de datos completo, las reglas de negocio, los estados del ticket y las políticas RLS, consultar siempre **`NexoBackend.md`** antes de implementar cualquier funcionalidad del frontend.

---

*Última actualización: Marzo 2026 — Versión 0.1 (borrador inicial)*
