import Layout from '@/components/layout/Layout'
import TimHieuTiemNangLoiNhuan from './TimHieuTiemNangLoiNhuanComponent'

export const metadata = {
  title: 'Tìm hiểu về tiềm năng lợi nhuận | Nivex Hub',
  description: 'Nivex Hub là nền tảng sáng tạo kết nối các nhà đầu tư và doanh nghiệp, mang đến cơ hội lớn để tối đa hóa lợi nhuận.',
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
        description: "Nivex Hub là nền tảng sáng tạo kết nối các nhà đầu tư và doanh nghiệp, mang đến cơ hội lớn để tối đa hóa lợi nhuận.",
        url: "https://nivex.vn/tim-hieu-tiem-nang-loi-nhuan",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Nivex Hub là nền tảng sáng tạo kết nối các nhà đầu tư và doanh nghiệp, mang đến cơ hội lớn để tối đa hóa lợi nhuận."
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