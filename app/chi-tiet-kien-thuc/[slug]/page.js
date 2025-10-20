import Layout from '@/components/layout/Layout'
import KnowledgeDetail from './KnowledgeDetail'
import { notFound } from 'next/navigation'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'

async function getArticle(slug) {
  // Nên gọi trực tiếp nguồn dữ liệu; ở đây dùng API nội bộ cho nhanh
  const res = await fetch(`${BASE_URL}/api/knowledge/${slug}`, {
    // Chọn 1 trong 2 tùy nhu cầu:
    cache: 'no-store',            // luôn mới
  })
  const json = await res.json()
  if (!json?.success || !json?.data) notFound()
  return json.data
}

function summarize(html, wordLimit = 100) {
  if (!html) return ''
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.split(/\s+/).slice(0, wordLimit).join(' ')
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const article = await getArticle(slug)

  const canonical = `${BASE_URL}/chi-tiet-kien-thuc/${slug}`
  const description = summarize(article.content, 50) + '...'

  // Next.js hỗ trợ metadata "keywords"
  const keywords = article?.rank_math_seo_keyword || ''

  return {
    title: `${article.title} | Nivex Hub`,
    description,
    keywords,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, maxSnippet: -1, maxImagePreview: 'large', maxVideoPreview: -1 },
    },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      siteName: 'Nivex',
      images: [
        {
          url: article?.image || '/assets/images/logo/Nivex_icon_bg.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'vi_VN',
      type: 'article',
      article: {
        publishedTime: article?.created_at,
        modifiedTime: article?.updated_at || article?.created_at,
        section: 'Kiến thức',
        authors: ['Nivex Hub'],
        tags: keywords,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [article?.image || '/assets/images/logo/Nivex_icon_bg.png'],
      site: '@nivexhub',
      creator: '@nivexhub',
    },
  }
}

export default async function InternalTransferPage({ params }) {
  const article = await getArticle(params.slug) // memoized cùng request với generateMetadata
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <KnowledgeDetail initialArticle={article} />
    </Layout>
  )
}
