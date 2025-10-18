import Layout from '@/components/layout/Layout'
import KnowledgeDetail from './KnowledgeDetail'

export async function generateMetadata({ params }) {
    const { slug } = params
    const canonical = `https://nivex.vn/chi-tiet-kien-thuc/${slug}`
    
    return {
        title: 'Chi tiết kiến thức | Nivex Hub',
        description: 'Chi tiết kiến thức về các tính năng và cách sử dụng của Nivex Hub.',
        alternates: {
            canonical: canonical
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              maxSnippet: -1,
              maxImagePreview: 'large',
              maxVideoPreview: -1,
            },
        },
        openGraph: {
            title: "Chi tiết kiến thức | Nivex Hub",
            description: "Chi tiết kiến thức về các tính năng và cách sử dụng của Nivex Hub.",
            url: canonical,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: "Chi tiết kiến thức về các tính năng và cách sử dụng của Nivex Hub."
                }
            ],
            locale: "vi_VN",
            type: "article"
        }
    }
}

export default function InternalTransferPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <KnowledgeDetail />
        </Layout>
    )
}