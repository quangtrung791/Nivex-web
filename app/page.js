import Layout from "@/components/layout/Layout"
import About1 from "@/components/sections/About1"
import Banner1 from "@/components/sections/Banner1"
import Work1 from "@/components/sections/Work1"
import MenuListNew from "@/components/sections/MenuListNew"
import SanSangGiaoDich from '@/components/sections/SanSangGiaoDich'
import HomepagePopup from '@/components/HomepagePopup'

export default function Home() {
    // Schema JSON-LD cho trang chủ

    // const organizationSchema = {
    //     '@context': 'https://schema.org',
    //     '@type': 'Organization',
    //     name: 'Nivex Hub',
    //     url: 'https://nivex.info',
    //     logo: 'https://nivex.info/assets/images/logo/Nivex_icon_bg.png',
    //     description: 'Nền tảng tri thức cho Kỷ Nguyên Giao Dịch AI, cung cấp kiến thức dễ hiểu cho người mới, tin tức chọn lọc mỗi ngày và lớp học trực tuyến hàng tuần.',
    //     sameAs: [
    //         // Có thể thêm các mạng xã hội nếu có
    //     ],
    //     contactPoint: {
    //         '@type': 'ContactPoint',
    //         contactType: 'Customer Service',
    //         availableLanguage: 'Vietnamese'
    //     }
    // }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": "Place",
            "@id": "https://nivex.info/#place",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "10.7729888",
                "longitude": "106.7520856"
            },
            "hasMap": "https://www.google.com/maps/place/NIVEX+VIET+NAM/@10.772994,106.7472147,17z/data=!3m1!4b1!4m6!3m5!1s0x31752500625ca515:0x809b33302de94cd7!8m2!3d10.7729888!4d106.7520856!16s%2Fg%2F11xlqbmkl8?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "29 Trần Quý Kiên, P. Cát Lái",
                "addressLocality": "TP. Hồ Chí Minh",
                "addressRegion": "TP. Hồ Chí Minh",
                "postalCode": "700000",
                "addressCountry": "VN"
            }
            },
            {
            "@type": "ImageObject",
            "@id": "https://nivex.info/#logo",
            "url": "https://nivex.info/assets/images/new/logo_nivex_vn.png",
            "contentUrl": "https://nivex.info/assets/images/new/logo_nivex_vn.png"
            },
            {
            "@type": "ImageObject",
            "@id": "https://nivex.info/#hero",
            "url": "https://nivex.info/assets/images/new/logo_nivex_vn.png",
            "contentUrl": "https://nivex.info/assets/images/new/logo_nivex_vn.png"
            },
            {
            "@type": "Organization",
            "@id": "https://nivex.info/#organization",
            "name": "Nivex",
            "alternateName": [
                "NivexHub",
                "Nivex"
            ],
            "url": "https://nivex.info/",
            "description": "Nivex xây dựng một nền tảng giao dịch tập trung vào bảo mật, minh bạch phí và trải nghiệm mượt mà, với bộ công cụ AI cùng với các tín hiệu quỹ tổ chức hàng đầu",
            "disambiguatingDescription": "Nivex - Sàn giao dịch tài sản số tích hợp công nghệ AI",
            "slogan": "Nivex - Sàn giao dịch tài sản số tích hợp công nghệ AI",
            "legalName": "NivexHub",
            "logo": { "@id": "https://nivex.info/#logo" },
            "image": { "@id": "https://nivex.info/#hero" },
            "foundingDate": "2025-05-05",
            "taxID": "0318936094",
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": 150 },
            "location": { "@id": "https://nivex.info/#place" },
            "email": "learningchain.nivexvietnam@gmail.com",
            "telephone": "0963130715",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "29 Trần Quý Kiên, P. Cát Lái",
                "addressLocality": "TP. Hồ Chí Minh",
                "addressRegion": "TP. Hồ Chí Minh",
                "postalCode": "700000",
                "addressCountry": "VN"
            },
            "contactPoint": [
                {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "learningchain.nivexvietnam@gmail.com",
                "telephone": "0963130715",
                "availableLanguage": ["vi", "en"],
                "areaServed": "VN"
                }
            ],
            "sameAs": [
                "https://www.facebook.com/NivexVN",
                "https://x.com/Nivex_Vietnam",
                "https://www.instagram.com/nivex_vietnam/"
            ],
            "knowsAbout": [
                "Cryptocurrency Exchange",
                "Digital Asset Trading",
                "Spot Trading",
                "Futures Trading",
                "AI Trading Tools",
                "Trading Signals",
                "Order Matching Engine",
                "Security & Compliance (KYC/AML)",
                "Blockchain",
                "Web3",
                "API Integration",
                "Fee Transparency"
            ]
            },
            {
            "@type": "WebSite",
            "@id": "https://nivex.info/#website",
            "url": "https://nivex.info/",
            "name": "NIVEX - Nền Tảng Crypto AI & Copytrade Thông Minh",
            "description": "Giao dịch crypto thông minh với NIVEX. Nền tảng giao dịch crypto tích hợp AI thông minh. Bảo mật cao, dễ sử dụng cho người mới. Đăng ký miễn phí.",
            "inLanguage": "vi-VN",
            "publisher": { "@id": "https://nivex.info/#organization" },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://nivex.info/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
            },
            {
            "@type": "WebPage",
            "@id": "https://nivex.info/#webpage",
            "url": "https://nivex.info/",
            "name": "NIVEX - Nền Tảng Crypto AI & Copytrade Thông Minh",
            "description": "Giao dịch crypto thông minh với NIVEX. Nền tảng giao dịch crypto tích hợp AI thông minh. Bảo mật cao, dễ sử dụng cho người mới. Đăng ký miễn phí.",
            "inLanguage": "vi-VN",
            "datePublished": "2025-04-26T07:59:39+07:00",
            "dateModified": "2025-11-18T11:48:06+07:00",
            "isPartOf": { "@id": "https://nivex.info/#website" },
            "about": { "@id": "https://nivex.info/#organization" },
            "primaryImageOfPage": { "@id": "https://nivex.info/#hero" },
            "keywords": [
                "Nivex",
                "NivexHub",
                "NivexVietnam",
                "san giao dich tai san so"
            ],
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".hero-section", ".section-story"]
            }
            }
        ]
    }
    return (
        <>
            // <HomepagePopup />
            <Layout headerStyle={1} footerStyle={2}>
                <Banner1 />
                <MenuListNew />
                {/* <Crypto1 /> */}
                {/* <Coinlist1 /> */}
                <Work1 />
                <About1 />
                <SanSangGiaoDich />
                {/* <Download /> */}
                {/* <Testimonials1 /> */}
                {/* <Sale /> */}
                {/* <Propose /> */}

            </Layout>

            {/* Schema JSON-LD - Đặt ở cuối trang để không ảnh hưởng hiệu suất */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    )
}
