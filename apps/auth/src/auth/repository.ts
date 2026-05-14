import { getSupabaseAdmin } from '../../lib/supabase'

export const authRepository = {
  findProfileById: async (id: string) => {
    const supabase = await getSupabaseAdmin()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data
  },

  findProfileByEmail: async (email: string) => {
    const supabase = await getSupabaseAdmin()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    if (error) return null
    return data
  }
}