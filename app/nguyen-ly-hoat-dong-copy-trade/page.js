import Layout from '@/components/layout/Layout'
import NguyenLyHoatDongCopyTrade from './NguyenLyCopyTradeComponent'

export const metadata = {
  title: 'Nguyên lý hoạt động Copy Trade | Nivex Hub',
  description: 'Chiến lược AI cấp tổ chức phân tích thị trường như thế nào.',
  alternates: {
    canonical: 'https://nivex.info/nguyen-ly-hoat-dong-copy-trade'
  },
  robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: 'large',
          maxVideoPreview: -1,
        },
    },
    openGraph: {
        title: "Nguyên lý hoạt động Copy Trade | Nivex Hub",
        description: "Chiến lược AI cấp tổ chức phân tích thị trường như thế nào.",
        url: "https://nivex.info/nguyen-ly-hoat-dong-copy-trade",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Chiến lược AI cấp tổ chức phân tích thị trường như thế nào."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function NguyenLyCopyTradeLayout() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <NguyenLyHoatDongCopyTrade />
    </Layout>
  )
}