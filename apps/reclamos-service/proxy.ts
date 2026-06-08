import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED = [
    'http://localhost:3002',
    'https://nexo-reclamos-postventa.vercel.app'
]

export function proxy(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';

  // Si origin no esta en la whitelist (variable ALLOWED), no exponer Access-Control-Allow-Origin
  const allowedOrigin = ALLOWED.includes(origin) ? origin : '';

  // Responder rápido a preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {}),
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '600'
      }
    });
  }

  const res = NextResponse.next();

  if(allowedOrigin) {
    res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return res;
}

export const config = {
  matcher: '/api/:path*'
};