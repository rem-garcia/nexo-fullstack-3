import { createServerClient } from '@nexo/supabase'
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  Profile
} from './auth.types'

export class AuthService {

  // ── REGISTRO ──────────────────────────────────
  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.full_name,
          role: credentials.role
        }
      }
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return {
      user: data.user as unknown as Profile,
      error: null
    }
  }

  // ── LOGIN ─────────────────────────────────────
  static async login(
    credentials: LoginCredentials
  ): Promise<AuthResponse> {
    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return {
      user: data.user as unknown as Profile,
      error: null
    }
  }

  // ── LOGOUT ────────────────────────────────────
  static async logout(): Promise<{ error: string | null }> {
    const supabase = await createServerClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  }

  // ── OBTENER USUARIO ACTUAL ────────────────────
  static async getUser(): Promise<Profile | null> {
    const supabase = await createServerClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return profile as Profile
  }

  // ── OBTENER ROL DEL USUARIO ───────────────────
  static async getRole(): Promise<string | null> {
    const profile = await AuthService.getUser()
    return profile?.role ?? null
  }
}