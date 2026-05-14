import { getSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@nexo/ui'

const adminItems = [
  { id: 1, name: 'Home',         iconClass: 'fa-solid fa-house-user',         path: '/dashboard' },
  { id: 2, name: 'Tickets',      iconClass: 'fa-solid fa-ticket',             path: '/dashboard/admin/tickets' },
  { id: 3, name: 'Usuarios',     iconClass: 'fa-solid fa-users',              path: '/dashboard/admin/usuarios' },
  { id: 4, name: 'Propiedades',  iconClass: 'fa-solid fa-building',           path: '/dashboard/admin/propiedades' },
  { id: 5, name: 'Contratistas', iconClass: 'fa-solid fa-helmet-safety',      path: '/dashboard/admin/contratistas' },
  { id: 6, name: 'Reportes',     iconClass: 'fa-solid fa-chart-bar',          path: '/dashboard/admin/reportes' },
  { id: 7, name: 'Garantías',    iconClass: 'fa-solid fa-shield-halved',      path: '/dashboard/admin/garantias' },
]

const coordinadorItems = [
  { id: 1, name: 'Home',    iconClass: 'fa-solid fa-house-user',      path: '/dashboard' },
  { id: 2, name: 'Tickets', iconClass: 'fa-solid fa-ticket',          path: '/dashboard/coordinador' },
  { id: 3, name: 'Visitas', iconClass: 'fa-solid fa-calendar-check',  path: '/dashboard/coordinador/visitas' },
]

const tecnicoItems = [
  { id: 1, name: 'Home',        iconClass: 'fa-solid fa-house-user',  path: '/dashboard' },
  { id: 2, name: 'Mis Tickets', iconClass: 'fa-solid fa-ticket',      path: '/dashboard/tecnico' },
]

const clienteItems = [
  { id: 1, name: 'Home',         iconClass: 'fa-solid fa-house-user',        path: '/dashboard' },
  { id: 2, name: 'Mis Reclamos', iconClass: 'fa-solid fa-circle-exclamation', path: '/dashboard/cliente' },
]

function getNavItems(role: string) {
  switch (role) {
    case 'admin':
    case 'super_admin': return adminItems
    case 'coordinador': return coordinadorItems
    case 'tecnico':     return tecnicoItems
    case 'cliente':     return clienteItems
    default:            return adminItems
  }
}

export default async function Layout({
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

  const navItems = getNavItems(profile?.role ?? '')

  return (
    <DashboardLayout navItems={navItems} fullName={profile?.full_name ?? null}>
      {children}
    </DashboardLayout>
  )
}