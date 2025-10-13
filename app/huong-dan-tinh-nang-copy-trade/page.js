import Layout from '@/components/layout/Layout'
import HuongDanCopyTradeComponent from './HuongDanCopyTradeComponent'

export const metadata = {
  title: 'Hướng dẫn tạo liên kết giới thiệu | Nivex Hub',
  description: 'Chuyên trang hướng dẫn tạo liên kết giới thiệu, mời bạn bè, hoa hồng và nhiều thứ khác.',
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
        title: "Hướng dẫn tạo liên kết giới thiệu | Nivex Hub",
        description: "Chuyên trang hướng dẫn tạo liên kết giới thiệu, mời bạn bè, hoa hồng và nhiều thứ khác.",
        url: "https://nivex.vn/huong-dan-tao-lien-ket-gioi-thieu",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Chuyên trang hướng dẫn tạo liên kết giới thiệu, mời bạn bè, hoa hồng và nhiều thứ khác."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function HuongDanCopyTradeLayout() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <HuongDanCopyTradeComponent />
    </Layout>
  )
}