import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function ClienteDashboard() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'cliente') redirect('/dashboard')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mis Reclamos</h1>
        <p className="text-gray-500 mt-1">Bienvenido, {profile?.full_name}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <i className="fa-solid fa-circle-exclamation text-green-600 text-xl"></i>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Tus reclamos</h3>
        <p className="text-gray-500 text-sm">Aquí aparecerán tus reclamos y su estado actual.</p>
      </div>
    </div>
  )
}