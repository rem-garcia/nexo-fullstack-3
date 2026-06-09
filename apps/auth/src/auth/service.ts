import { getSupabaseAnon, getSupabaseAdmin } from '../../lib/supabase'
import { authRepository } from './repository'
import { LoginDto, LoginResult, RegisterDto } from './model'

export const authService = {
  // Valida el JWT (Bearer) contra Supabase y devuelve el perfil del usuario.
  // Es el reemplazo de la sesión por cookie: ahora la identidad viaja en el token.
  getMe: async (token: string) => {
    const supabase = getSupabaseAnon()
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return null
    return authRepository.findProfileById(user.id)
  },

  login: async (dto: LoginDto): Promise<LoginResult> => {
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    })
    if (error || !data.session) {
      return {
        user: null,
        access_token: null,
        refresh_token: null,
        error: error?.message ?? 'Credenciales inválidas',
      }
    }
    const profile = await authRepository.findProfileById(data.user.id)
    return {
      user: profile,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      error: null,
    }
  },

  register: async (dto: RegisterDto) => {
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          full_name: dto.full_name,
          role: dto.role,
        },
      },
    })
    if (error) return { user: null, error: error.message }
    return { user: data.user, error: null }
  },

  // Envía el correo de recuperación. `redirectTo` apunta a la página
  // /reset-password del frontend, donde el usuario define la nueva clave.
  requestPasswordReset: async (email: string, redirectTo: string) => {
    const supabase = getSupabaseAnon()
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) return { error: error.message }
    return { error: null }
  },

  // Confirma la nueva contraseña usando el access_token de recuperación que
  // Supabase incluye en el enlace del correo. El frontend nunca toca Supabase:
  // solo reenvía ese token + la nueva clave a este backend.
  confirmPasswordReset: async (accessToken: string, password: string) => {
    const anon = getSupabaseAnon()
    const { data: { user }, error } = await anon.auth.getUser(accessToken)
    if (error || !user) return { error: 'Enlace inválido o expirado' }
    const admin = getSupabaseAdmin()
    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, { password })
    if (updateError) return { error: updateError.message }
    return { error: null }
  },
}
