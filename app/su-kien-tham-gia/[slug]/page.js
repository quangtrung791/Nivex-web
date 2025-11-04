import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import JoinedEventDetailsComponent from "./ChiTietSKTGComponent";

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';
// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const res = await fetch(
      `${WP_BASE}/joined-events/by-slug/${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    );
    const json = await res.json();
    if (!res.ok || !json?.success || !json?.data) return null;

    return json.data;
  }

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const title = data?.title || "Sự kiện Nivex tham dự";
    const desc = data?.short_desc?.replace(/<[^>]+>/g, '') || "Sự kiện Nivex đã tham dự";
    const keywords = data?.rank_math_seo_keyword || '';
    
    return {
        title: `${title} | Chi tiết sự kiện Nivex`,
        description: desc,
        keywords,
        alternates: {
            canonical: `https://nivex.info/su-kien-tham-gia/${slug}`
        },
        openGraph: {
            title: `${title} | Chi tiết sự kiện Nivex`,
            description: desc,
            keywords : keywords,
            url: `https://nivex.info/su-kien-tham-gia/${slug}`,
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