// app/sitemap.xml/route.ts - Sitemap Index
import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.info'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

export async function GET() {
  return new NextResponse('Not found', 
    { status: 404 }
  )
//   try {
//     const now = new Date().toISOString()

//     const sitemaps = [
//       `${BASE_URL}/pages-sitemap.xml`,
//       `${BASE_URL}/knowledge-sitemap.xml`,
//       `${BASE_URL}/dictionary-sitemap.xml`,
//       `${BASE_URL}/news-sitemap.xml`,
//       `${BASE_URL}/events-sitemap.xml`,
//       `${BASE_URL}/joined-events-sitemap.xml`,
//       `${BASE_URL}/news-flash-sitemap.xml`,
//     ]

//     const sitemapEntries = sitemaps.map((url) => {
//       return `  <sitemap>
//     <loc>${url}</loc>
//     <lastmod>${now}</lastmod>
//   </sitemap>`
//     }).join('\n')

//     const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${sitemapEntries}
// </sitemapindex>`

//     return new NextResponse(xml, {
//       headers: {
//         'Content-Type': 'application/xml',
//         'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate',
//       },
//     })
//   } catch (error) {
//     console.error('Error generating sitemap index:', error)
//     return new NextResponse('Error generating sitemap', { status: 500 })
//   }
}

