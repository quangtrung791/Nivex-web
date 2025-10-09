import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import EventDetails from "./ChiTietSuKienComponent";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/event/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
}

// Tạo metadata động
export async function generateMetadataSuKien({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const title = data?.title || "Sự kiện Nivex";
    const desc = data?.short_desc?.replace(/<[^>]+>/g, '') || "Sự kiện tại Nivex tổ chức";

    return {
        title: `${title} | Chi tiết sự kiện Nivex`,
        description: desc,
        openGraph: {
            title: `${title} | Chi tiết sự kiện Nivex`,
            description: desc,
            url: `https://nivex.vn/su-kien/${slug}`,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: `Sự kiện ${title} do chính Nivex tổ chức`
                }
            ],
            locale: "vi_VN",
            type: "website"
        }
    }
}

export default function EventDetailsPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <EventDetails />
        </Layout>
    )
}