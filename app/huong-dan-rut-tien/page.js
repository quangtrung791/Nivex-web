import Layout from '@/components/layout/Layout'
import WithdrawGuide from './WithdrawGuide'

export const metadata = {
    title: 'Hướng dẫn rút tiền Nivex | Nivex Hub',
    description: 'Hướng dẫn chi tiết cách rút tiền từ tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi rút tiền chưa về.',
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
        title: "Hướng dẫn rút tiền Nivex | Nivex Hub",
        description: "Hướng dẫn chi tiết cách rút tiền từ tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi rút tiền chưa về.",
        url: "https://nivex.vn/huong-dan-rut-tien",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chi tiết cách rút tiền từ tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi rút tiền chưa về."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function WithdrawGuidePage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <WithdrawGuide />
        </Layout>
    )
}