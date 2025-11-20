import Layout from '@/components/layout/Layout'
import UserGuidePage from './UserGuidePage'

export const metadata = {
  title: 'Hướng dẫn sử dụng app Nivex | Nivex Hub',
  description: 'Tổng hợp các bước cài đặt, thao tác và giải pháp nhanh để sử dụng Nivex hiệu quả.',
  alternates: {
    canonical: 'https://nivex.info/huong-dan-su-dung-app-nivex'
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
        title: "Hướng dẫn sử dụng app Nivex | Nivex Hub",
        description: "Tổng hợp các bước cài đặt, thao tác và giải pháp nhanh để sử dụng Nivex hiệu quả.",
        url: "https://nivex.info/huong-dan-su-dung-app-nivex",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Tổng hợp các bước cài đặt, thao tác và giải pháp nhanh để sử dụng Nivex hiệu quả."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function UserGuideForNivexApp() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <UserGuidePage />
    </Layout>
  )
}