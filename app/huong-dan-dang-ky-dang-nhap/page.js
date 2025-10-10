import Layout from "../../components/layout/Layout"
import RegisterLoginGuide from "./RegisterLoginGuide"

export const metadata = {
    title: 'Hướng dẫn đăng ký và đăng nhập - Nivex Hub',
    description: 'Hướng dẫn chi tiết cách tạo tài khoản và đăng nhập vào Nivex',
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
        title: "Hướng dẫn đăng ký và đăng nhập - Nivex Hub",
        description: "Hướng dẫn chi tiết cách tạo tài khoản và đăng nhập vào Nivex",
        url: "https://nivex.vn/huong-dan-dang-ky-dang-nhap",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Hướng dẫn chi tiết cách tạo tài khoản và đăng nhập vào Nivex"
            }
        ],
        locale: "vi_VN",
        type: "website"
    }

}

export default function RegisterLoginGuidePage() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <RegisterLoginGuide />
            </Layout>
        </>
    )
}