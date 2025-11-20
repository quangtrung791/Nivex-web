// app/giao-dich-p2p/page.tsx (hoặc page.jsx)
import Layout from '@/components/layout/Layout'
import P2PTrading from './P2PTrading'

export const metadata = {
  title: 'Hướng dẫn giao dịch P2P Nivex | Nivex Hub',
  description:
    'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
  alternates: {
    canonical: 'https://nivex.info/giao-dich-p2p'
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: 'Hướng dẫn giao dịch P2P Nivex | Nivex Hub',
    description:
      'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
    url: 'https://nivex.info/giao-dich-p2p',
    siteName: 'Nivex',
    images: [{ url: '/assets/images/logo/Nivex_icon_bg.png', width: 1200, height: 630, alt: 'Nivex P2P' }],
    locale: 'vi_VN',
    type: 'website',
  },
}

export default function P2PTradingPage() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cách thực hiện giao dịch P2P trên Nivex',
    description:
      'Hướng dẫn 9 bước để mua USDT qua P2P trên Nivex: vào P2P, chọn người bán, tạo đơn, thanh toán, xác nhận và nhận coin.',
    mainEntityOfPage: 'https://nivex.info/giao-dich-p2p',
    totalTime: 'PT10M', // ước lượng
    supply: [
      { '@type': 'HowToSupply', name: 'Ứng dụng ngân hàng hoặc ví thanh toán' },
      { '@type': 'HowToSupply', name: 'Tài khoản Nivex đã KYC' },
    ],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Vào P2P', text: 'Từ trang chủ, nhấn Thêm → P2P trong mục Giao dịch.' },
      { '@type': 'HowToStep', position: 2, name: 'Chọn người bán', text: 'Nhấn Mua vào, so sánh giá, phương thức thanh toán, hạn mức.' },
      { '@type': 'HowToStep', position: 3, name: 'Tạo đơn hàng', text: 'Chọn người bán → Mua → nhập số tiền/số lượng → chọn phương thức thanh toán → Xác nhận mua.' },
      { '@type': 'HowToStep', position: 4, name: 'Nhận thông tin', text: 'Xem thông tin tài khoản nhận tiền do người bán cung cấp.' },
      { '@type': 'HowToStep', position: 5, name: 'Thanh toán', text: 'Chuyển tiền theo thông tin và chụp màn hình biên lai làm bằng chứng.' },
      { '@type': 'HowToStep', position: 6, name: 'Xác nhận thanh toán', text: 'Quay lại ứng dụng Nivex và nhấn “Tôi đã thanh toán”.' },
      { '@type': 'HowToStep', position: 7, name: 'Tải ảnh biên lai', text: 'Tải ảnh biên lai lên và xác nhận.' },
      { '@type': 'HowToStep', position: 8, name: 'Chờ giải phóng coin', text: 'Trao đổi với người bán nếu cần và chờ họ giải phóng coin.' },
      { '@type': 'HowToStep', position: 9, name: 'Kiểm tra số dư', text: 'Vào trang chủ kiểm tra Tổng tài sản để xác nhận đã nhận USDT.' },
    ],
    // Khai báo publisher giúp Google hiểu thương hiệu
    publisher: {
      '@type': 'Organization',
      name: 'Nivex',
      url: 'https://nivex.info',
      logo: { '@type': 'ImageObject', url: 'https://nivex.info/assets/images/logo/Nivex_icon_bg.png' },
    },
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={2}>
        <P2PTrading />
      </Layout>

      {/* JSON-LD HowTo cho SEO */}
      <script
        type="application/ld+json"
        // Quan trọng: stringify sạch sẽ, không chèn biến không hiển thị
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </>
  )
}
