import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

const navItems = [
  { id: 1, name: 'Home',         iconClass: 'fa-solid fa-house-user',     path: '/dashboard' },
  { id: 2, name: 'Tickets',      iconClass: 'fa-solid fa-ticket',         path: '/dashboard/admin/tickets' },
  { id: 3, name: 'Usuarios',     iconClass: 'fa-solid fa-users',          path: '/dashboard/admin/usuarios' },
  { id: 4, name: 'Propiedades',  iconClass: 'fa-solid fa-building',       path: '/dashboard/admin/propiedades' },
  { id: 5, name: 'Contratistas', iconClass: 'fa-solid fa-helmet-safety',  path: '/dashboard/admin/contratistas' },
  { id: 6, name: 'Reportes',     iconClass: 'fa-solid fa-chart-bar',      path: '/dashboard/admin/reportes' },
  { id: 7, name: 'Garantías',    iconClass: 'fa-solid fa-shield-halved',  path: '/dashboard/admin/garantias' },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  const fechaFooter = new Date()

  return (
    <div className="flex min-h-screen">
      <aside
        className="hidden lg:flex flex-col justify-between w-64 min-h-screen text-white"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div>
          <h2
            className="py-6 text-center text-xl font-bold border-b"
            style={{ borderColor: '#1e3a5f' }}
          >
            Nexo
          </h2>

          <nav className="mt-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 mx-3 my-1 rounded-lg transition-colors hover:bg-[#0f4070] text-sm text-slate-300"
                  >
                    <i className={`${item.iconClass} w-5 text-center text-blue-400`}></i>
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="border-t py-4 px-4"
          style={{ borderColor: '#1e3a5f' }}
        >
          <p className="text-slate-400 text-xs text-center mb-3">
            {profile?.full_name}
          </p>
          <a
            href="/api/auth/logout"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm text-slate-300 hover:bg-[#0f4070] transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Cerrar sesión
          </a>
          <p className="text-slate-600 text-xs text-center mt-3">
            Nexo © {fechaFooter.getFullYear()}
          </p>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
}