import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@nexo/supabase'

export async function middleware(request: NextRequest) {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  // rutas públicas que no requieren autenticación
  const publicRoutes = [
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register'
  ]

  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // si no está autenticado y no es ruta pública
  // redirige al login
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // si está autenticado y trata de ir al login
  // redirige al dashboard
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}