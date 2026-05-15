import { getSupabaseClient } from '../../../lib/supabase'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!['admin', 'super_admin'].includes(profile?.role ?? '')) {
    redirect('/dashboard')
  }

  const tickets = await fetch(
    process.env.NEXT_PUBLIC_TICKETS_API_URL!,
    { cache: 'no-store' }
  ).then(res => res.json())

  const totalTickets = tickets.tickets?.length ?? 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-500 mt-1">Bienvenido, {profile?.full_name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Tickets</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalTickets}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-users text-blue-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Usuarios</h3>
          <p className="text-gray-500 text-sm mb-4">Gestiona clientes, coordinadores y técnicos</p>
          <a href="/dashboard/admin/usuarios" className="text-blue-600 text-sm font-medium hover:text-blue-500 transition-colors">Ver usuarios →</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-building text-green-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Propiedades</h3>
          <p className="text-gray-500 text-sm mb-4">Administra oficinas y departamentos</p>
          <a href="/dashboard/admin/propiedades" className="text-green-600 text-sm font-medium hover:text-green-500 transition-colors">Ver propiedades →</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-ticket text-yellow-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Tickets</h3>
          <p className="text-gray-500 text-sm mb-4">Revisa todos los reclamos del sistema</p>
          <a href="/dashboard/admin/tickets" className="text-yellow-600 text-sm font-medium hover:text-yellow-500 transition-colors">Ver tickets →</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-helmet-safety text-purple-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Contratistas</h3>
          <p className="text-gray-500 text-sm mb-4">Gestiona técnicos y sus calificaciones</p>
          <a href="/dashboard/admin/contratistas" className="text-purple-600 text-sm font-medium hover:text-purple-500 transition-colors">Ver contratistas →</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-chart-bar text-red-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Reportes</h3>
          <p className="text-gray-500 text-sm mb-4">Genera reportes mensuales en PDF</p>
          <a href="/dashboard/admin/reportes" className="text-red-600 text-sm font-medium hover:text-red-500 transition-colors">Ver reportes →</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <i className="fa-solid fa-shield-halved text-teal-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Garantías</h3>
          <p className="text-gray-500 text-sm mb-4">Monitorea el semáforo de garantías</p>
          <a href="/dashboard/admin/garantias" className="text-teal-600 text-sm font-medium hover:text-teal-500 transition-colors">Ver garantías →</a>
        </div>
      </div>
    </div>
  )
}