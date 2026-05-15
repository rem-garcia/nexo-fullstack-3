import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ORIGIN = 'http://localhost:3002'; // URL frontend local. Cambiar a URL publico de Vercel.

export function proxy(req: NextRequest) {
  // Responder rápido a preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': ORIGIN,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '600'
      }
    });
  }

  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin', ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export const config = {
  matcher: '/api/:path*'
};