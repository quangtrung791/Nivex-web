import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import SuKien from "./EventComponent"

export const metadata = {
    title: "Sự kiện tổ chức tại Nivex",
    description: "Hãy tham dự các sự kiện do chính Nivex tổ chức.",
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
        title: "Sự kiện tổ chức tại Nivex",
        description: "Hãy tham dự các sự kiện do chính Nivex tổ chức.",
        url: "https://nivex.vn/su-kien",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Nivex - Các sự kiện bùng nổ được tổ chức bởi chính Nivex"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function SuKienPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <SuKien />
        </Layout>
    )
}