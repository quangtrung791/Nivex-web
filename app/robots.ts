// app/robots.ts
import type { MetadataRoute } from 'next'

const isProd = process.env.VERCEL_ENV === 'production'
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'

// cache lại 6 giờ (tùy chọn)
export const revalidate = 6 * 60 * 60

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProd
      ? [{ userAgent: '*', allow: '/' }]
      : [{ userAgent: '*', disallow: '/' }], // chặn crawl ở preview
    sitemap: `${BASE}/sitemap.xml`,
  }
}
