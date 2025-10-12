import Layout from "../../components/layout/Layout"
import LearningHub from "../../app/guide-for-beginners/LearningHub"

export const metadata = {
    title: 'Guide for Beginners - Nivex Hub',
    description: 'Hướng dẫn đầu tư tiền mã hóa cho người mới bắt đầu',
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
        title: "Guide for Beginners - Nivex Hub",
        description: "Hướng dẫn đầu tư tiền mã hóa cho người mới bắt đầu",
        url: "https://nivex.vn/guide-for-beginners",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn đầu tư tiền mã hóa cho người mới bắt đầu"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function GuideForBeginners() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <LearningHub />
            </Layout>
        </>
    )
}