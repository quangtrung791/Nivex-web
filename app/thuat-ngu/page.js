import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import DictionaryPage from "./DictionaryPage"

export const metadata = {
    title: "Danh sách thuật ngữ | Nivex",
    description: "Tìm hiểu các từ khóa thông dụng về ngành blockchain chỉ trong vài phút.",
    openGraph: {
        title: "Danh sách thuật ngữ | Nivex",
        description: "Tìm hiểu các từ khóa thông dụng về ngành blockchain chỉ trong vài phút.",
        url: "https://nivex.vn/thuat-ngu",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Nivex - Danh sách thuật ngữ của ngành Blockchain"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function ThuatNguPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <DictionaryPage />
        </Layout>
    )
}