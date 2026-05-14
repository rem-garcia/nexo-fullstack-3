import { getSupabaseClient } from '../../../lib/supabase'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const tickets = await fetch(
    process.env.NEXT_PUBLIC_TICKETS_API_URL!,
    { cache: 'no-store' }
  ).then(res => res.json())

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Panel Administrador</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Total Tickets</p>
          <p className="text-3xl font-bold">{tickets.tickets?.length ?? 0}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Todos los Tickets</h3>
        </div>
        <div className="divide-y">
          {tickets.tickets?.map((ticket: any) => (
            <div key={ticket.id} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{ticket.nombre_cliente}</p>
                  <p className="text-sm text-gray-500">{ticket.tipo_falla} — {ticket.ubicacion_falla}</p>
                  <p className="text-sm text-gray-500">{ticket.nro_dpto} | {ticket.tipo_propiedad}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(ticket.creado_en).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
