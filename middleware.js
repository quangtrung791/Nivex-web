import { NextResponse } from 'next/server';

export function middleware(request) {
  // Tạo response để xử lý tiếp
  const res = NextResponse.next()
  const { pathname } = new URL(request.url)

  // ===========================================================
  // PHẦN 1: CHẶN INDEX & BOT (CODE MỚI THÊM)
  // ===========================================================

  // 1. Thêm Header bắt buộc "NOINDEX" cho toàn bộ site
  // Cái này sẽ ghi đè mọi config metadata trong code React của bạn
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')

  // 2. (Tùy chọn mạnh tay) Nếu muốn chặn bot không cho truy cập luôn (Lỗi 403)
  // Lưu ý: Nếu bật cái này, Facebook/Zalo có thể không hiện ảnh thumbnail khi share link.
  // Nếu muốn bật, hãy xóa dấu /* và */ bao quanh đoạn dưới:

  /*
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const botKeywords = ['bot', 'crawl', 'spider', 'googlebot', 'bingbot', 'ahrefs', 'semrush']
  const isBot = botKeywords.some(keyword => userAgent.includes(keyword))
  
  if (isBot) {
    return new NextResponse('Bot Access Denied', { status: 403 })
  }
  */

  // ===========================================================
  // PHẦN 2: LOGIC CACHE CŨ CỦA BẠN
  // ===========================================================
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

// Config giữ nguyên như cũ
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
    '/api/:path*',
    '/assets/:path*',
  ],
}
