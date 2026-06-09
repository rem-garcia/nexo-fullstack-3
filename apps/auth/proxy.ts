import { NextRequest, NextResponse } from 'next/server'

// CORS para el backend de auth. El frontend (dashboard) hace fetch cross-origin
// y envía el JWT en el header `Authorization`, por eso lo permitimos aquí.
// En producción, define CORS_ALLOWED_ORIGINS con la(s) URL(s) del frontend
// separadas por coma (ej: "https://nexo-dashboard-six.vercel.app").
function resolveOrigin(origin: string | null): string {
  const configured = process.env.CORS_ALLOWED_ORIGINS
  if (!configured) return origin ?? '*' // sin config: refleja el origen (dev)
  const allowed = configured.split(',').map((o) => o.trim())
  if (origin && allowed.includes(origin)) return origin
  return allowed[0]
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': resolveOrigin(origin),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  }
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get('origin')

  // Preflight: responde de inmediato sin tocar la lógica de la ruta.
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
  }

  const response = NextResponse.next()
  for (const [key, value] of Object.entries(corsHeaders(origin))) {
    response.headers.set(key, value)
  }
  return response
}

export const config = {
  matcher: '/api/:path*',
}
