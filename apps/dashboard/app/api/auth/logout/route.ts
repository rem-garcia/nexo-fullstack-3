import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/session'

// Logout = borrar la cookie con el JWT y volver a la landing. No toca Supabase.
export async function GET() {
  const landing = process.env.NEXT_PUBLIC_LANDING_URL ?? 'https://nexo-landing-xi.vercel.app'
  const response = NextResponse.redirect(landing)
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
