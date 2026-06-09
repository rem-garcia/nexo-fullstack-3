import { getSupabaseAdmin } from '../../lib/supabase'
import { CreateUserDto } from './model'

export const usersRepository = {
  findAll: async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
  },

  create: async (dto: CreateUserDto) => {
    const admin = getSupabaseAdmin()

    // 1) Crea el usuario en Supabase Auth (service role).
    const { data, error } = await admin.auth.admin.createUser({
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: { full_name: dto.full_name, role: dto.role },
    })
    if (error || !data.user) throw new Error(error?.message ?? 'No se pudo crear el usuario')

    // 2) Asegura la fila en `profiles` (por si no hay trigger que la cree).
    const profile = {
      id: data.user.id,
      full_name: dto.full_name,
      email: dto.email,
      phone: dto.phone ?? null,
      role: dto.role,
      is_active: true,
    }
    const { error: profileError } = await admin.from('profiles').upsert(profile)
    if (profileError) throw new Error(profileError.message)

    return profile
  },
}
