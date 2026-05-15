import { getSupabaseClient } from '../../lib/supabase'
import { authRepository } from './repository'
import { LoginDto, RegisterDto } from './model'

export const authService = {
  getMe: async () => {
    const supabase = await getSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null
    return authRepository.findProfileById(user.id)
  },

  login: async (dto: LoginDto) => {
    const supabase = await getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password
    })
    if (error) return { user: null, error: error.message }
    const profile = await authRepository.findProfileById(data.user.id)
    return { user: profile, error: null }
  },

  register: async (dto: RegisterDto) => {
    const supabase = await getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          full_name: dto.full_name,
          role: dto.role
        }
      }
    })
    if (error) return { user: null, error: error.message }
    return { user: data.user, error: null }
  },

  logout: async () => {
    const supabase = await getSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) return { error: error.message }
    return { error: null }
  }
}