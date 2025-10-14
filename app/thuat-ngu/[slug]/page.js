import Layout from "@/components/layout/Layout"
import ChiTietThuatNgu from "./DictionaryDetailsPage"
import { Metadata } from "next"
// import { useParams } from "next/navigation";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/dictionary/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    // return await res.json();
    const json = await res.json();
    // Tìm đúng thuật ngữ theo slug
    return json.data?.find(item => item.slug === slug) || null;
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = await getTermBySlug(slug);
    console.log("Metadata data:", data?.keyword); // Thêm dòng này để debug

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
        <Layout headerStyle={1} footerStyle={2}>
            <ChiTietThuatNgu />
        </Layout>
    )
}