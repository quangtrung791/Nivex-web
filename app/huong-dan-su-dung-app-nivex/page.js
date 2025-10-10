import Layout from '@/components/layout/Layout'
import UserGuidePage from './UserGuidePage'

export const metadata = {
  title: 'Hướng dẫn sử dụng app Nivex | Nivex Hub',
  description: 'Tổng hợp các bước cài đặt, thao tác và giải pháp nhanh để sử dụng Nivex hiệu quả.',
}

export default function UserGuideForNivexApp() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <UserGuidePage />
    </Layout>
  )
}