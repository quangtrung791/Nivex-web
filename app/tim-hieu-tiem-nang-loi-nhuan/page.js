import Layout from '@/components/layout/Layout'
import TimHieuTiemNangLoiNhuan from './TimHieuTiemNangLoiNhuanComponent'

export const metadata = {
  title: 'Tìm hiểu về tiềm năng lợi nhuận | Nivex Hub',
  description: 'Huớng dẫn liên kết Google Authenticator với Nivex Hub giúp tăng cường bảo mật tài khoản của bạn. Thực hiện các bước đơn giản để thiết lập xác thực hai yếu tố (2FA), bảo vệ dữ liệu và tài khoản của bạn khỏi các nguy cơ tấn công.',
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
        title: "Tìm hiểu về tiềm năng lợi nhuận | Nivex Hub",
        description: "Huớng dẫn liên kết Google Authenticator với Nivex Hub giúp tăng cường bảo mật tài khoản của bạn. Thực hiện các bước đơn giản để thiết lập xác thực hai yếu tố (2FA), bảo vệ dữ liệu và tài khoản của bạn khỏi các nguy cơ tấn công.",
        url: "https://nivex.vn/tim-hieu-tiem-nang-loi-nhuan",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Huớng dẫn liên kết Google Authenticator với Nivex Hub giúp tăng cường bảo mật tài khoản của bạn. Thực hiện các bước đơn giản để thiết lập xác thực hai yếu tố (2FA), bảo vệ dữ liệu và tài khoản của bạn khỏi các nguy cơ tấn công."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function TimHieuTiemNangLoiNhuanLayout() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <TimHieuTiemNangLoiNhuan />
    </Layout>
  )
}