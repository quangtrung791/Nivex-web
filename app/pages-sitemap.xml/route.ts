// app/pages-sitemap.xml/route.ts
import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.info'

export const runtime = 'nodejs'
export const revalidate = 6 * 60 * 60 // Cache 6 giờ

export async function GET() {
  try {
    // Các trang tĩnh
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
      'kien-thuc-tong-quan',
      'khoa-hoc',
      'chuyen-tien-noi-bo',
      'ai-copy-trade',
      'huong-dan-su-dung-app-nivex',
      'xac-thuc-hai-lop-2fa',
      'nguyen-ly-hoat-dong-copy-trade',
      'gioi-thieu-ve-nivex',
      'phan-thuong-bao-li-xi-nivex',
      'huong-dan-tao-lien-ket-gioi-thieu',
      'nang-luc-canh-tranh',
      'tim-hieu-tiem-nang-loi-nhuan',
      'huong-dan-lien-ket-google-authenticator',
    ]

    const now = new Date().toISOString()

    const urls = staticPages.map((path) => {
      const url = path ? `${BASE_URL}/${path}` : BASE_URL
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
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
    console.error('Error generating pages-sitemap.xml:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

