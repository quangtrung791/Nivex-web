import Layout from "@/components/layout/Layout"
import About1 from "@/components/sections/About1"
import Banner1 from "@/components/sections/Banner1"
import Work1 from "@/components/sections/Work1"
import MenuListNew from "@/components/sections/MenuListNew"
import SanSangGiaoDich from '@/components/sections/SanSangGiaoDich'
import HomepagePopup from '@/components/HomepagePopup'

export default function Home() {
    // Schema JSON-LD cho trang chủ
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Nivex Hub',
        url: 'https://nivex.info',
        logo: 'https://nivex.info/assets/images/logo/NivexIcon.PNG',
        description: 'Nền tảng tri thức cho Kỷ Nguyên Giao Dịch AI, cung cấp kiến thức dễ hiểu cho người mới, tin tức chọn lọc mỗi ngày và lớp học trực tuyến hàng tuần.',
        sameAs: [
            // Có thể thêm các mạng xã hội nếu có
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: 'Vietnamese'
        }
    }

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nivex Hub',
        url: 'https://nivex.info',
        description: 'Nền tảng tri thức cho Kỷ Nguyên Giao Dịch AI, cung cấp kiến thức dễ hiểu cho người mới, tin tức chọn lọc mỗi ngày và lớp học trực tuyến hàng tuần.',
        publisher: {
            '@type': 'Organization',
            name: 'Nivex',
            logo: {
                '@type': 'ImageObject',
                url: 'https://nivex.info/assets/images/logo/NivexIcon.PNG'
            }
        },
        inLanguage: 'vi-VN',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://nivex.info/tin-tuc?search={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        }
    }

    return (
        <>
            <HomepagePopup />
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    )
}