import Layout from '@/components/layout/Layout'
import TwoFactorAuthentication from './TwoFactorAuthentication'

export const metadata = {
    title: 'Hướng dẫn xác thực hai lớp 2FA | Nivex Hub',
    description: 'Giúp tăng cường bảo mật tài khoản của bạn, tránh bị chặn SMS hoặc mất mã qua email do lỗi mạng..',
    alternates: {
        canonical: 'https://nivex.info/xac-thuc-hai-lop-2fa'
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
        title: "    ",
        description: "Giúp tăng cường bảo mật tài khoản của bạn, tránh bị chặn SMS hoặc mất mã qua email do lỗi mạng.",
        url: "https://nivex.info/xac-thuc-hai-lop-2fa",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Giúp tăng cường bảo mật tài khoản của bạn, tránh bị chặn SMS hoặc mất mã qua email do lỗi mạng."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function TwoFactorAuthenticationPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <TwoFactorAuthentication />
        </Layout>
    )
}