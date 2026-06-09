import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

// Cliente anónimo: login (signInWithPassword) y validación de JWT (getUser(token)).
// Stateless: este backend no guarda sesión en cookies, trabaja con Bearer tokens.
export function getSupabaseAnon() {
  return createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// Cliente admin (service role): acceso a la tabla profiles y a la Admin API.
// NUNCA debe exponerse al frontend; solo vive en el backend.
export function getSupabaseAdmin() {
  return createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
