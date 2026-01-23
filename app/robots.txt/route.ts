import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate',
    },
  })
}