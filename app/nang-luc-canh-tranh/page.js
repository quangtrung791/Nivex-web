import Layout from '@/components/layout/Layout'
import NangLucCanhTranhComponent from './NangLucCanhTranhComponent'

export const metadata = {
  title: 'Copy Trade và AI Nâng cao - Năng lực cạnh tranh | Nivex Hub',
  description: 'Khám phá sức mạnh của Copy Trade kết hợp AI Nâng cao cùng Nivex Hub - giải pháp tối ưu giúp nhà đầu tư nâng cao năng lực cạnh tranh, tối đa hóa lợi nhuận và tự động hóa chiến lược giao dịch thông minh.',
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
        title: "Copy Trade và AI Nâng cao - Năng lực cạnh tranh | Nivex Hub",
        description: "Khám phá sức mạnh của Copy Trade kết hợp AI Nâng cao cùng Nivex Hub - giải pháp tối ưu giúp nhà đầu tư nâng cao năng lực cạnh tranh, tối đa hóa lợi nhuận và tự động hóa chiến lược giao dịch thông minh.",
        url: "https://nivex.vn/huong-dan-tao-lien-ket-gioi-thieu",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Khám phá sức mạnh của Copy Trade kết hợp AI Nâng cao cùng Nivex Hub - giải pháp tối ưu giúp nhà đầu tư nâng cao năng lực cạnh tranh, tối đa hóa lợi nhuận và tự động hóa chiến lược giao dịch thông minh."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function NangLucCanhTranhLayout() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <NangLucCanhTranhComponent />
    </Layout>
  )
}