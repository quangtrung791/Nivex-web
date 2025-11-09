// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const res = NextResponse.next()

  // Cache cho API coins
  const { pathname } = new URL(request.url)
  if (pathname.startsWith('/api/coins')) {
    if (pathname.includes('/static')) {
      res.headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800')
      res.headers.set('CDN-Cache-Control', 's-maxage=172800')
      res.headers.set('Vercel-CDN-Cache-Control', 's-maxage=604800')
    } else {
      res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
      res.headers.set('CDN-Cache-Control', 's-maxage=600')
      res.headers.set('Vercel-CDN-Cache-Control', 's-maxage=1800')
    }
  }

  // Cache static assets
  if (
    pathname.startsWith('/assets/') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.webp')
  ) {
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return res;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/assets/:path*',
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt).*)',
  ],
}
