// app/robots.txt/route.ts
import { NextResponse } from 'next/server'

const isProd = process.env.VERCEL_ENV === 'production'
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.info'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

export async function GET() {
  const rules = isProd
    ? 'User-agent: *\nDisallow: /'
    : 'User-agent: *\nDisallow: /' // chặn crawl ở preview

  const robotsTxt = `${rules}

Sitemap: ${BASE}/sitemap-index.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate',
    },
  })
}
