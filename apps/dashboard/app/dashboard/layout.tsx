import { getSupabaseClient } from '../../lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Nexo — Panel de Gestión</h1>
        <span className="text-sm text-gray-500">{user.email}</span>
      </nav>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}