import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import JoinedEventDetailsComponent from "./ChiTietSKTGComponent";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/joined_events/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const title = data?.title || "Sự kiện Nivex tham dự";
    const desc = data?.short_desc?.replace(/<[^>]+>/g, '') || "Sự kiện Nivex đã tham dự";
    const keywords = data?.rank_math_seo_keyword || '';
    console.log('[metadata] rank_math_seo_keyword:', data?.rank_math_seo_keyword);
    return {
        title: `${title} | Chi tiết sự kiện Nivex`,
        description: desc,
        keywords,
        alternates: {
            canonical: `https://nivex.vn/su-kien-tham-gia/${slug}`
        },
        openGraph: {
            title: `${title} | Chi tiết sự kiện Nivex`,
            description: desc,
            keywords : keywords,
            url: `https://nivex.vn/su-kien-tham-gia/${slug}`,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: `Sự kiện ${title} Nivex đã được mời tham dự`
                }
            ],
            locale: "vi_VN",
            type: "website"
        }
    }
}

export default function JoinedEventDetailsPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <JoinedEventDetailsComponent />
        </Layout>
    )
}