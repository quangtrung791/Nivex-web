import Layout from "@/components/layout/Layout"
import TinTucComponent from "./NewsComponent"

export const metadata = {
    title: "Danh sách tin nhanh | Nivex",
    description: "Bảng tin Nivex luôn cập nhật các tin nhanh mới nhất về thị trường Blockchain, AI, Crypto.",
    keywords: "tin nhanh, tin tức, tin tuc, tin nhanh nivex, tin tuc nivex, tin nhanh nivex hub, tin tuc nivex hub",
    alternates: {
        canonical: "https://nivex.info/tin-nhanh"
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
        title: "Danh sách tin nhanh | Nivex",
        description: "Bảng tin Nivex luôn cập nhật các tin nhanh mới nhất về thị trường Blockchain, AI, Crypto.",
        url: "https://nivex.info/tin-nhanh",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Nivex - Bảng tin Nivex luôn cập nhật các tin nhanh mới nhất về thị trường Blockchain, AI, Crypto."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function TinTucLayout() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <TinTucComponent />
        </Layout>
    )
}

