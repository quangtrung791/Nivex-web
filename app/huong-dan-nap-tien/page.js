import Layout from '@/components/layout/Layout'
import DepositGuide from './DepositGuide'

export const metadata = {
    title: 'Hướng dẫn nạp tiền Nivex | Nivex Hub',
    description: 'Hướng dẫn chi tiết cách nạp tiền vào tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi nạp tiền chưa về.',
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
        title: "Hướng dẫn nạp tiền Nivex | Nivex Hub",
        description: "Hướng dẫn chi tiết cách nạp tiền vào tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi nạp tiền chưa về.",
        url: "https://nivex.vn/huong-dan-nap-tien",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chi tiết cách nạp tiền vào tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi nạp tiền chưa về."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function DepositGuidePage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <DepositGuide />
        </Layout>
    )
}