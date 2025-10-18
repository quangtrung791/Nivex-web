import Layout from '@/components/layout/Layout'
import HuongDanCopyTradeComponent from './HuongDanCopyTradeComponent'

export const metadata = {
  title: 'Hướng dẫn Tính năng sao chép các Tổ chức Chiến lược giao dịch bằng AI | Nivex Hub',
  description: 'Chuyên trang Hướng dẫn Tính năng sao chép các Tổ chức Chiến lược giao dịch bằng AI với Nivex Hub.',
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
        title: "Hướng dẫn Tính năng sao chép các Tổ chức Chiến lược giao dịch bằng AI | Nivex Hub",
        description: "Chuyên trang Hướng dẫn Tính năng sao chép các Tổ chức Chiến lược giao dịch bằng AI với Nivex Hub.",
        url: "https://nivex.vn/huong-dan-tinh-nang-copy-trade",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Chuyên trang Hướng dẫn Tính năng sao chép các Tổ chức Chiến lược giao dịch bằng AI với Nivex Hub."
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