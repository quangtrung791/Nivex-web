import { NextResponse } from 'next/server';

export function middleware(request) {
  // ===========================================================
  // REDIRECT TOÀN BỘ SANG NIVEX.INFO
  // ===========================================================
  
  // URL đích đến
  const targetUrl = 'https://nivex.info';

  // Cách 1: Chuyển mọi link về TRANG CHỦ nivex.info
  // Ví dụ: your-site.com/bai-viet-1  --->  nivex.info
  return NextResponse.redirect(new URL(targetUrl), 308); // 308 là chuyển vĩnh viễn (tốt cho SEO trang mới)

  // Cách 2: (Nếu bạn muốn giữ nguyên đường dẫn phía sau)
  // Ví dụ: your-site.com/bai-viet-1  --->  nivex.info/bai-viet-1
  // Nếu muốn dùng cách này, hãy comment Cách 1 và mở comment dòng dưới đây:
  
  /*
  const newUrl = new URL(request.nextUrl.pathname, targetUrl);
  newUrl.search = request.nextUrl.search; // Giữ cả query params (?id=...)
  return NextResponse.redirect(newUrl, 308);
  */
}

// Config: Giữ lại để tránh redirect các file hệ thống của Next.js gây lỗi
export const config = {
  matcher: [
    /*
     * Match tất cả request path ngoại trừ:
     * 1. /api/ (nếu bạn muốn redirect cả API thì xóa dòng api)
     * 2. _next/static (static files)
     * 3. _next/image (image optimization files)
     * 4. favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
