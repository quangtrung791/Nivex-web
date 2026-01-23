import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // (Tuỳ chọn) Giữ nguyên API cache như bạn đang làm
  if (pathname.startsWith('/api/coins')) {
    const res = NextResponse.next()

    // Noindex toàn site (tuỳ bạn muốn giữ)
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')

    if (pathname.includes('/static')) {
      res.headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800')
      res.headers.set('CDN-Cache-Control', 's-maxage=172800')
      res.headers.set('Vercel-CDN-Cache-Control', 's-maxage=604800')
    } else {
      res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
      res.headers.set('CDN-Cache-Control', 's-maxage=600')
      res.headers.set('Vercel-CDN-Cache-Control', 's-maxage=1800')
    }

    return res
  }

  const res = NextResponse.redirect('https://nivex.info', 301)

  // (Tuỳ chọn) Gắn thêm noindex vào response redirect
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/api/:path*',
    '/assets/:path*',
  ],
}
