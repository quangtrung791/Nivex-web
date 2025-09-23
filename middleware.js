// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Admin Authentication Check - chỉ kiểm tra có token hay không
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Lấy token từ cookie
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      // Không có token, redirect về login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Có token thì cho qua, sẽ verify ở API level
    // (không verify JWT ở middleware vì Edge Runtime không support crypto)
  }

  // Admin API Authentication Check
  if (request.nextUrl.pathname.startsWith('/api/admin') && 
      !request.nextUrl.pathname.startsWith('/api/admin/auth')) {
    
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Token required' },
        { status: 401 }
      );
    }

    // Token có tồn tại, JWT verification sẽ được làm ở API route level
  }
  
  // Tối ưu caching cho API routes
  if (request.nextUrl.pathname.startsWith('/api/coins')) {
    // Static data cache lâu hơn
    if (request.nextUrl.pathname.includes('/static')) {
      response.headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
      response.headers.set('CDN-Cache-Control', 's-maxage=172800');
      response.headers.set('Vercel-CDN-Cache-Control', 's-maxage=604800');
    } else {
      // Market data cache ngắn hơn
      response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      response.headers.set('CDN-Cache-Control', 's-maxage=600');
      response.headers.set('Vercel-CDN-Cache-Control', 's-maxage=1800');
    }
  }
  
  // Tối ưu caching cho static assets
  if (request.nextUrl.pathname.startsWith('/assets/') || 
      request.nextUrl.pathname.endsWith('.css') ||
      request.nextUrl.pathname.endsWith('.js') ||
      request.nextUrl.pathname.endsWith('.png') ||
      request.nextUrl.pathname.endsWith('.jpg') ||
      request.nextUrl.pathname.endsWith('.webp')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Compression headers
  response.headers.set('Accept-Encoding', 'gzip, deflate, br');
  
  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',          // Admin pages  
    '/api/admin/:path*',      // Admin API routes
    '/api/:path*',            // Other API routes
    '/assets/:path*',         // Static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
