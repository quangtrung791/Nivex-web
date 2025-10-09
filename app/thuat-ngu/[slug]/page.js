import Layout from "@/components/layout/Layout"
import ChiTietThuatNgu from "./DictionaryDetailsPage"
import { Metadata } from "next"

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/vocabulary/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const keyword = data?.keyword || "Thuật ngữ";
    const desc = data?.short_desc?.replace(/<[^>]+>/g, '') || "Tìm hiểu về các từ khóa của ngành blockchain chỉ trong vài phút.";

    return {
        title: `${keyword} | Bảng thuật ngữ Nivex`,
        description: desc,
        openGraph: {
            title: `${keyword} | Bảng thuật ngữ Nivex`,
            description: desc,
            url: `https://nivex.vn/thuat-ngu/${slug}`,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: `Thuật ngữ ${keyword}`
                }
            ],
            locale: "vi_VN",
            type: "website"
        }
    }
}

export default function ThuatNguDetails() {
    return (
        // <Layout headerStyle={1} footerStyle={2}>
        //     <ChiTietThuatNgu />
        // </Layout>
        <Layout>
            <ChiTietThuatNgu />
        </Layout>
    )
}