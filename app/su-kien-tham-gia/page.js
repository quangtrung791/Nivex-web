import Layout from "@/components/layout/Layout"
// import { Metadata } from "next"
import SuKienAlt from "./JoinedEventComponent"

export const metadata = {
    title: "Các sự kiện Nivex đã tham dự",
    description: "Các sự kiện lớn Nivex đã được mời đến tham dự.",
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
        description: "Các sự kiện lớn Nivex đã được mời đến tham dự.",
        url: "https://nivex.vn/su-kien-tham-gia",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Nivex - Các sự kiện lớn Nivex đã được mời đến tham dự."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function SuKienPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <SuKienAlt />
        </Layout>
    )
}