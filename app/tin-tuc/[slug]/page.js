import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import NewsBlogsDetails from "./NewsDetailsComponent";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/news/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const keyword = data?.title || "Chi tiết tin tức";
    const keywords = data?.rank_math_seo_keyword;
    // const desc = (data?.content?.replace(/<[^>]+>/g, '') || "Chi tiết tin tức tại Nivex.").slice(0, 160);
    
    // tránh trường hợp bị cắt ngang chữ
    const plainText = data?.content?.replace(/<[^>]+>/g, '') || "Chi tiết tin tức tại Nivex.";
    const desc = plainText.length > 160
        ? plainText.slice(0, 157).trimEnd() + "..."
        : plainText;

    return {
        title: `${keyword} | Chi tiết tin tức Nivex`,
        description: desc,
        keywords: keywords,
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
        // <Layout headerStyle={1} footerStyle={2}>
        //     <ChiTietThuatNgu />
        // </Layout>
        <Layout headerStyle={1} footerStyle={2}>
            <NewsBlogsDetails />
        </Layout>
    )
}