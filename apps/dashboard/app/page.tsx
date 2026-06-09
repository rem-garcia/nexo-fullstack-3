import { redirect } from 'next/navigation'
import { requireProfile } from '@/lib/session'

export default async function HomePage() {
  const profile = await requireProfile()

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
