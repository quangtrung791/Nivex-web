import Layout from '@/components/layout/Layout'
import AboutNivexContent from './AboutNivexContent'

const SITE_URL = 'https://nivex.info'
const PAGE_URL = `${SITE_URL}/gioi-thieu-ve-nivex`
const PAGE_TITLE = 'Giới thiệu về Nivex | Nivex Hub'
const PAGE_DESCRIPTION =
  'Nivex xây dựng nền tảng giao dịch tài sản số tập trung vào bảo mật, minh bạch phí và trải nghiệm mượt mà, kết hợp công nghệ AI hỗ trợ giao dịch.'

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Nivex',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/images/logo/Nivex_icon_bg.png`,
        width: 1200,
        height: 630,
        alt: 'Giới thiệu Nivex',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/assets/images/logo/Nivex_icon_bg.png`],
  },
}

export default function AboutNivexPage() {
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Nivex',
        alternateName: ['NivexHub', 'Nivex Vietnam'],
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/images/new/logo_nivex_vn.png`,
          contentUrl: `${SITE_URL}/assets/images/new/logo_nivex_vn.png`,
        },
        sameAs: [
          'https://www.facebook.com/NivexVN',
          'https://x.com/Nivex_Vietnam',
          'https://www.instagram.com/nivex_vietnam/',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: '0963130715',
            email: 'learningchain.nivexvietnam@gmail.com',
            availableLanguage: ['vi', 'en'],
            areaServed: 'VN',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Nivex - Sàn giao dịch tài sản số tích hợp AI',
        inLanguage: 'vi-VN',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Giới thiệu về Nivex',
            item: PAGE_URL,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'vi-VN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/images/new/logo_nivex_vn.png`,
        },
      },
    ],
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={2}>
        <AboutNivexContent />
      </Layout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
    </>
  )
}