import Layout from '@/components/layout/Layout'
import P2PTrading from './P2PTrading'

export const metadata = {
    title: 'Hướng dẫn giao dịch P2P Nivex | Nivex Hub',
    description: 'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
}

export default function P2PTradingPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <P2PTrading />
        </Layout>
    )
}