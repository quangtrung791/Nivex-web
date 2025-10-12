// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { query } from "./lib/neon.js"  // bạn đã có helper này

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'

// (tùy chọn) cache lại mỗi 6h
export const revalidate = 6 * 60 * 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Các trang tĩnh của bạn (điền đúng những page đang có)
    const staticPages = [
      '',                            
      'giao-dich-p2p',
      'guide-for-beginners',
      'huong-dan-dang-ky-dang-nhap',
      'huong-dan-rut-tien',
      'huong-dan-nap-tien',
      'xac-minh-danh-tinh-kyc',
      'su-kien',
      'su-kien-tham-gia',
      'thuat-ngu',
      'tin-tuc',
      'chuyen-tien-noi-bo',
      'ai-copy-trade',
      'huong-dan-su-dung-app-nivex',
    ].map((p) => ({
      url: `${BASE_URL}/${p}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))

    // Helper function để safely query database
    const safeQuery = async (sql: string) => {
      try {
        const result = await query(sql)
        return Array.isArray(result) ? result : []
      } catch (error) {
        console.error('Database query error in sitemap:', error)
        return []
      }
    }

    // Trang bài viết kiến thức
    const rows = await safeQuery(`
      SELECT slug, COALESCE(updated_at, created_at) AS lastmod
      FROM public.knowledge
      WHERE status = 'active' AND slug IS NOT NULL
    `)

    const knowledge = rows.map((r: any) => ({
      url: `${BASE_URL}/chi-tiet-kien-thuc/${r.slug}`,
      lastModified: r.lastmod ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // trang tin tức
    const newsRows = await safeQuery(`
      SELECT slug, COALESCE(updated_at, created_at) AS lastmod
      FROM public.news
      WHERE status = 'active' AND slug IS NOT NULL
    `)

    const news = newsRows.map((r: any) => ({
      url: `${BASE_URL}/tin-tuc/${r.slug}`,
      lastModified: r.lastmod ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // trang sự kiện
    const eventsRows = await safeQuery(`
      SELECT slug, COALESCE(updated_at, created_at) AS lastmod
      FROM public.event
      WHERE slug IS NOT NULL
    `)

    const events = eventsRows.map((r: any) => ({
      url: `${BASE_URL}/su-kien/${r.slug}`,
      lastModified: r.lastmod ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Sự kiện tham gia
    const joinedEventsRows = await safeQuery(`
      SELECT slug, COALESCE(updated_at, created_at) AS lastmod
      FROM public.joined_events
      WHERE slug IS NOT NULL
    `)

    const joinedEvents = joinedEventsRows.map((r: any) => ({
      url: `${BASE_URL}/su-kien-tham-gia/${r.slug}`,
      lastModified: r.lastmod ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    //Thuật ngữ
    const dictionaryRow = await safeQuery(`
      SELECT slug, COALESCE(updated_at, created_at) AS lastmod
      FROM public.dictionary
      WHERE slug IS NOT NULL
    `)

    const dictionary = dictionaryRow.map((r: any) => ({
      url: `${BASE_URL}/thuat-ngu/${r.slug}`,
      lastModified: r.lastmod ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [
      ...staticPages,
      ...knowledge,
      ...news,
      ...events,
      ...joinedEvents,
      ...dictionary,
    ]
  } catch (error) {
    // Fallback: chỉ trả về static pages nếu có lỗi
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      }
    ]
  }
}
