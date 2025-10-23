import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import ChiTietTinTucComponent from "./NewsDetailsComponent";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const url = `https://nivexhub.learningchain.vn/wp-json/nivex/v1/news/by-slug/${encodeURIComponent(slug)}`
    const res = await fetch(url, { cache: 'no-store' })
    const json = await res.json()
  
    if (!res.ok || !json?.success || !json?.data) return null
    // Trả về đúng object bài viết để generateMetadata dùng trực tiếp
    return json.data
  }

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const keyword = data?.title || "Chi tiết tin tức";
    // const desc = (data?.content?.replace(/<[^>]+>/g, '') || "Chi tiết tin tức tại Nivex.").slice(0, 160);
    
    // tránh trường hợp bị cắt ngang chữ
    const plainText = data?.content?.replace(/<[^>]+>/g, '') || "Chi tiết tin tức tại Nivex.";
    const desc = data.rank_math_seo_description || (plainText.length > 160
        ? plainText.slice(0, 157).trimEnd() + "..."
        : plainText);

    return {
        title: `${keyword} | Chi tiết tin tức Nivex`,
        description: desc,
        keywords: data.rank_math_seo_keyword || '',
        alternates: {
            canonical: `https://nivex.vn/tin-tuc/${slug}`
        },
        openGraph: {
            title: `${keyword} | Chi tiết tin tức Nivex`,
            description: desc,
            url: `https://nivex.vn/tin-tuc/${slug}`,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: `${keyword}`
                }
            ],
            locale: "vi_VN",
            type: "website"
        }
    }
}

export default function ChiTietTinTucPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <ChiTietTinTucComponent />
        </Layout>
    )
}
