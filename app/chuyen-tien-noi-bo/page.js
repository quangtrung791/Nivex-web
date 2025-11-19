import Layout from '@/components/layout/Layout'
import InternalTransfer from './InternalTransfer'

export const metadata = {
    title: 'Hướng dẫn chuyển tiền nội bộ | Nivex Hub',
    description: 'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
    alternates: {
        canonical: 'https://nivex.info/chuyen-tien-noi-bo'
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
        title: "    ",
        description: "Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.",
        url: "https://nivex.info/chuyen-tien-noi-bo",
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

export default function InternalTransferPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <InternalTransfer />
        </Layout>
    )
}