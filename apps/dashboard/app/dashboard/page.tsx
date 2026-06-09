import { redirect } from 'next/navigation'
import { requireProfile } from '@/lib/session'

export default async function DashboardPage() {
  const profile = await requireProfile()

  // redirigir según rol
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
