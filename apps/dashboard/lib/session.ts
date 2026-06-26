import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// El frontend NUNCA toca Supabase. Toda la identidad se obtiene pidiéndosela
// al backend de auth (/api/auth) reenviando el JWT que guardamos en cookie.

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'coordinador'
  | 'tecnico'
  | 'cliente'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  is_active: boolean
}

export const SESSION_COOKIE = 'nexo_token'

const AUTH_API = process.env.AUTH_API_URL || process.env.NEXT_PUBLIC_AUTH_API_URL!

export async function getToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value ?? null
}

// Pide el perfil al backend usando el Bearer token. Devuelve null si no hay
// sesión válida (token ausente o expirado).
export async function getProfile(): Promise<Profile | null> {
  const token = await getToken()
  if (!token) return null
  try {
    const res = await fetch(AUTH_API, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.user ?? null
  } catch {
    return null
  }
}

// Guard: exige sesión. Redirige a /login si no hay perfil.
export async function requireProfile(): Promise<Profile> {
  const profile = await getProfile()
  if (!profile) redirect(process.env.NEXT_PUBLIC_AUTH_FRONT_URL!)
  return profile
}

// Guard por rol: exige sesión y que el rol esté permitido.
export async function requireRole(roles: UserRole[]): Promise<Profile> {
  const profile = await requireProfile()
  if (!roles.includes(profile.role)) redirect('/dashboard')
  return profile
}
