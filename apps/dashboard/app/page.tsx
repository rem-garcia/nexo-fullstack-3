import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  switch (profile.role) {
    case 'admin':
    case 'super_admin':
      redirect('/dashboard/admin')
    case 'coordinador':
      redirect('/dashboard/coordinador')
    case 'tecnico':
      redirect('/dashboard/tecnico')
    case 'cliente':
      redirect('/dashboard/cliente')
    default:
      redirect('/login')
  }
}