import { NextRequest, NextResponse } from 'next/server'

// CORS para el backend de tickets. Lo consumen tanto el dashboard como el
// formulario público de reclamos (reclamos-postventa), por eso por defecto
// refleja el origen de la petición. En producción puedes restringirlo con
// CORS_ALLOWED_ORIGINS (URLs separadas por coma).
function resolveOrigin(origin: string | null): string {
  const configured = process.env.CORS_ALLOWED_ORIGINS
  if (!configured) return origin ?? '*'
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
