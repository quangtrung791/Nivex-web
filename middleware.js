import { NextResponse } from 'next/server';

export function middleware(request) {
  const res = NextResponse.next()
  const { pathname } = new URL(request.url)

  // Chỉ cache cho API coins ở đây (nếu bạn muốn override so với headers())
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

  return res
}

// Loại trừ _next, favicon, robots, sitemap (như bạn đã làm)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/api/:path*',
    '/assets/:path*',
  ],
}
