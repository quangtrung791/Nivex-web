// app/dictionary-sitemap.xml/route.ts
import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.info'
const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

async function fetchAllDictionary() {
  try {
    const url = new URL(`${WP_BASE}/dictionary`)
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
    const json = await res.json()

    if (!res.ok || !json?.success || !json?.data || !Array.isArray(json.data)) {
      return []
    }

    return json.data.filter((item: any) => item.slug)
  } catch (error) {
    console.error('Error fetching dictionary:', error)
    return []
  }
}

export async function GET() {
  try {
    const items = await fetchAllDictionary()

    const urls = items.map((item) => {
      const rawDate = item.updated_at || item.created_at
      const lastmod = rawDate
        ? new Date(rawDate).toISOString() // -> 2025-11-10T12:35:53.000Z
        : new Date().toISOString()
      return `  <url>
    <loc>${BASE_URL}/thuat-ngu/${item.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating dictionary-sitemap.xml:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

