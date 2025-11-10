// app/knowledge-sitemap.xml/route.ts
import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.info'
const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

async function fetchAllKnowledge() {
  try {
    const allItems: any[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const url = new URL(`${WP_BASE}/knowledge`)
      url.searchParams.set('status', 'active')
      url.searchParams.set('page', page.toString())
      url.searchParams.set('per_page', '100')

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
      const json = await res.json()

      if (!res.ok || !json?.success || !json?.data || !Array.isArray(json.data)) {
        hasMore = false
        break
      }

      const items = json.data.filter((item: any) => item.slug)
      allItems.push(...items)

      // Kiểm tra xem còn trang tiếp theo không
      if (!json.meta || !json.meta.total_pages || page >= json.meta.total_pages) {
        hasMore = false
      } else {
        page++
      }
    }

    return allItems
  } catch (error) {
    console.error('Error fetching knowledge:', error)
    return []
  }
}

export async function GET() {
  try {
    const items = await fetchAllKnowledge()

    const urls = items.map((item) => {
      const lastmod = item.updated_at || item.created_at || new Date().toISOString()
      return `  <url>
    <loc>${BASE_URL}/chi-tiet-kien-thuc/${item.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
    console.error('Error generating knowledge-sitemap.xml:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

