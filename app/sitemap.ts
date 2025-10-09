// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { query } from "./lib/neon"  // bạn đã có helper này

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'

// (tùy chọn) cache lại mỗi 6h
export const revalidate = 6 * 60 * 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Các trang tĩnh của bạn (điền đúng những page đang có)
  const staticPages = [
    '',                            
    'giao-dich-p2p',
    'guide-for-beginners',
    'huong-dan-dang-ky-dang-nhap',
    'huong-dan-rut-tien',
    'huong-dan-nap-tien',
    'xac-minh-danh-tinh-kyc',
  ].map((p) => ({
    url: `${BASE_URL}/${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Trang bài viết kiến thức (đổi prefix đường dẫn cho đúng project của bạn)
  // Ví dụ bạn dùng /chi-tiet-kien-thuc/[slug]
  const rows = await query(`
    SELECT slug, COALESCE(updated_at, created_at) AS lastmod
    FROM public.knowledge
    WHERE status = 'active' AND slug IS NOT NULL
  `)

  const knowledge = rows.map((r: any) => ({
    url: `${BASE_URL}/chi-tiet-kien-thuc/${r.slug}`,  // đổi nếu bạn dùng đường dẫn khác
    lastModified: r.lastmod ?? new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...knowledge]
}
