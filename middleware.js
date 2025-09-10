// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
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
    '/api/:path*',
    '/assets/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
