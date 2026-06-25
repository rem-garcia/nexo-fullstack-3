'use client'

import { useEffect } from 'react'

// Recibe el access_token que envía auth-front por la URL y lo guarda en una
// cookie first-party del dashboard (su propio dominio), luego entra al panel.
// Este es el "handoff" de sesión entre los dos frontends (dominios distintos).
export default function RecibirTokenPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      window.location.href = process.env.NEXT_PUBLIC_AUTH_FRONT_URL || '/'
      return
    }

    const secure = window.location.protocol === 'https:' ? '; secure' : ''
    document.cookie = `nexo_token=${token}; path=/; max-age=${60 * 60 * 8}; samesite=lax${secure}`
    window.location.href = '/dashboard'
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <p className="text-slate-400 text-sm">Iniciando sesión...</p>
    </main>
  )
}
