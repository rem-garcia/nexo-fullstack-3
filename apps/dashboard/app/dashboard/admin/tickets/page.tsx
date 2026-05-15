import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function TicketsPage() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!['admin', 'super_admin', 'coordinador'].includes(profile?.role ?? '')) {
    redirect('/dashboard')
  }

  // Obtener reclamos
  const reclamosRes = await fetch(
    process.env.NEXT_PUBLIC_TICKETS_API_URL!,
    { cache: 'no-store' }
  ).then(res => res.json())

  // Obtener tickets formales
  const ticketsRes = await fetch(
    `${process.env.NEXT_PUBLIC_TICKETS_API_URL!.replace('/tickets', '/tickets/manage')}`,
    { cache: 'no-store' }
  ).then(res => res.json())

  const reclamos = reclamosRes.tickets ?? []
  const tickets = ticketsRes.tickets ?? []

  // IDs de reclamos que ya tienen ticket
  const reclamosConTicket = new Set(tickets.map((t: any) => t.reclamo_id))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Tickets</h1>
        <p className="text-gray-500 mt-1">Reclamos recibidos y tickets activos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Reclamos</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{reclamos.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Tickets Activos</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{tickets.filter((t: any) => t.estado !== 'cerrado').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Tickets Cerrados</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{tickets.filter((t: any) => t.estado === 'cerrado').length}</p>
        </div>
      </div>

      {/* Reclamos pendientes de ticket */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Reclamos sin ticket asignado</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {reclamos.filter((r: any) => !reclamosConTicket.has(r.id)).map((reclamo: any) => (
            <div key={reclamo.id} className="p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{reclamo.nombre_cliente}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <i className="fa-solid fa-building text-xs mr-1"></i>
                  {reclamo.tipo_propiedad} — {reclamo.nro_dpto}
                </p>
                <p className="text-sm text-gray-500">
                  <i className="fa-solid fa-triangle-exclamation text-xs text-yellow-500 mr-1"></i>
                  {reclamo.tipo_falla} en {reclamo.ubicacion_falla}
                </p>
                {reclamo.descripcion_falla && (
                  <p className="text-sm text-gray-400 mt-1 italic">"{reclamo.descripcion_falla}"</p>
                )}
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(reclamo.creado_en).toLocaleDateString('es-CL')}
                </p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  Pendiente
                </span>
              </div>
            </div>
          ))}
          {reclamos.filter((r: any) => !reclamosConTicket.has(r.id)).length === 0 && (
            <div className="p-4 text-center text-gray-400 text-sm">
              No hay reclamos pendientes
            </div>
          )}
        </div>
      </div>

      {/* Tickets activos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Tickets activos</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {tickets.map((ticket: any) => (
            <div key={ticket.id} className="p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  {ticket.reclamo?.nombre_cliente ?? 'Sin nombre'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {ticket.reclamo?.tipo_falla} en {ticket.reclamo?.ubicacion_falla}
                </p>
                {ticket.notas && (
                  <p className="text-sm text-gray-400 mt-1">{ticket.notas}</p>
                )}
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(ticket.created_at).toLocaleDateString('es-CL')}
                </p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                  ticket.estado === 'en_proceso' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {ticket.estado === 'pendiente' ? 'Pendiente' :
                   ticket.estado === 'en_proceso' ? 'En proceso' : 'Cerrado'}
                </span>
              </div>
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="p-4 text-center text-gray-400 text-sm">
              No hay tickets activos
            </div>
          )}
        </div>
      </div>
    </div>
  )
}