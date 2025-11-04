import Layout from "@/components/layout/Layout"
import KnowledgePage from './KnowledgePage'

export const metadata = {
    title: 'Kiến thức tổng quan | Nivex Hub',
    description: 'Trang bị nền tảng cơ bản để tự tin bước vào thế giới blockchain và tài sản số',
    alternates: {
        canonical: 'https://nivex.info/kien-thuc-tong-quan/'
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
        title: "Kiến thức tổng quan | Nivex Hub",
        description: "Trang bị nền tảng cơ bản để tự tin bước vào thế giới blockchain và tài sản số.",
        url: "https://nivex.info/kien-thuc-tong-quan",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Trang bị nền tảng cơ bản để tự tin bước vào thế giới blockchain và tài sản số"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function Knowledge() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <KnowledgePage />
        </Layout>
    )
}