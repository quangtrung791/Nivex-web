import Layout from '@/components/layout/Layout'
import P2PTrading from './P2PTrading'

export const metadata = {
    title: 'Hướng dẫn giao dịch P2P Nivex | Nivex Hub',
    description: 'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
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
        title: "Hướng dẫn giao dịch P2P Nivex | Nivex Hub",
        description: "Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.",
        url: "https://nivex.vn/giao-dich-p2p",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function P2PTradingPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <P2PTrading />
        </Layout>
    )
}