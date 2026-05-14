import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function CoordinadorDashboard() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'coordinador') redirect('/dashboard')

  const tickets = await fetch(
    process.env.NEXT_PUBLIC_TICKETS_API_URL!,
    { cache: 'no-store' }
  ).then(res => res.json())

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel Coordinador</h1>
        <p className="text-gray-500 mt-1">Bienvenido, {profile?.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Tickets</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{tickets.tickets?.length ?? 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Tickets pendientes</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {tickets.tickets?.map((ticket: any) => (
            <div key={ticket.id} className="p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{ticket.nombre_cliente}</p>
                <p className="text-sm text-gray-500">{ticket.tipo_falla} — {ticket.ubicacion_falla}</p>
                <p className="text-sm text-gray-500">{ticket.nro_dpto} | {ticket.tipo_propiedad}</p>
              </div>
              <p className="text-sm text-gray-400">{new Date(ticket.creado_en).toLocaleDateString('es-CL')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}