import Layout from "@/components/layout/Layout"
import ChiTietThuatNgu from "./DictionaryDetailsPage"
import { Metadata } from "next"
// import { useParams } from "next/navigation";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    // const res = await fetch(
    //     `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/dictionary/${slug}`,
    //     { cache: "no-store" }
    // );
    const res = await fetch(
        `https://nivex.vn/api/dictionary/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
    // const json = await res.json();
    // Tìm đúng thuật ngữ theo slug
    // return json.data?.find(item => item.slug?.toLowerCase() === slug.toLowerCase()) || null;
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params;
    const dataGet = await getTermBySlug(slug);
    console.log("Metadata data:", dataGet); // Thêm dòng này để debug

    const keyword = dataGet?.keyword || "Thuật ngữ";
    
    const plainText = dataGet?.short_desc?.replace(/<[^>]+>/g, '') || "Tìm hiểu về các từ khóa của ngành blockchain chỉ trong vài phút.";
    const desc = plainText.length > 160
        ? plainText.slice(0, 157).trimEnd() + "..."
        : plainText;
    // const desc = dataGet?.short_desc?.replace(/<[^>]+>/g, '') || "Tìm hiểu về các từ khóa của ngành blockchain chỉ trong vài phút.";

    console.log(keyword);
    
    return {
        title: `${dataGet?.keyword} | Bảng thuật ngữ Nivex`,
        description: desc,
        openGraph: {
            title: `${dataGet?.keyword} | Bảng thuật ngữ Nivex`,
            description: desc,
            url: `https://nivex.vn/thuat-ngu/${dataGet?.slug}`,
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
