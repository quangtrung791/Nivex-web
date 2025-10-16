import Layout from '@/components/layout/Layout'
import HuongDanLienKetGGAuth from './HuongDanLienKetGGAuthComponent'

export const metadata = {
  title: 'Phần thưởng Bao lì xì Nivex | Nivex Hub',
  description: 'Phần thưởng Bao lì xì Nivex tại Nivex Hub mang đến cơ hội nhận những phần quà hấp dẫn, khuyến khích người dùng tham gia và trải nghiệm các dịch vụ thú vị trong không gian sáng tạo của Nivex.',
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
        title: "Phần thưởng Bao lì xì Nivex | Nivex Hub",
        description: "Phần thưởng Bao lì xì Nivex tại Nivex Hub mang đến cơ hội nhận những phần quà hấp dẫn, khuyến khích người dùng tham gia và trải nghiệm các dịch vụ thú vị trong không gian sáng tạo của Nivex.",
        url: "https://nivex.vn/huong-dan-tao-lien-ket-gioi-thieu",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Phần thưởng Bao lì xì Nivex tại Nivex Hub mang đến cơ hội nhận những phần quà hấp dẫn, khuyến khích người dùng tham gia và trải nghiệm các dịch vụ thú vị trong không gian sáng tạo của Nivex."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function HuongDanLienKetGGAuthLayout() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <HuongDanLienKetGGAuth />
    </Layout>
  )
}