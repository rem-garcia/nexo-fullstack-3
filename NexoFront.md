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

El frontend consume el backend de Supabase directamente usando el SDK oficial `@supabase/supabase-js`.

### Cliente de Supabase

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Variables de entorno requeridas

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

> Para lógica de servidor (Server Components, API Routes), usar `@supabase/ssr` con `createServerClient`.
> Ver documentación: https://supabase.com/docs/guides/auth/server-side/nextjs

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
