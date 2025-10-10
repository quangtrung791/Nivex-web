import Layout from "../../components/layout/Layout"
import KYCVerification from "./KYCVerification"

export const metadata = {
    title: 'Xác minh danh tính KYC - Nivex Hub',
    description: 'Hướng dẫn chi tiết các bước xác minh danh tính KYC trên Nivex',
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
        title: "Xác minh danh tính KYC - Nivex Hub",
        description: "Hướng dẫn chi tiết các bước xác minh danh tính KYC trên Nivex",
        url: "https://nivex.vn/su-kien",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chi tiết các bước xác minh danh tính KYC trên Nivex"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function KYCVerificationPage() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <KYCVerification />
            </Layout>
        </>
    )
}