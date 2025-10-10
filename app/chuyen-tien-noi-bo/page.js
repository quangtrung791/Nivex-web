import Layout from '@/components/layout/Layout'
import InternalTransfer from './InternalTransfer'

export const metadata = {
    title: 'Hướng dẫn chuyển tiền nội bộ | Nivex Hub',
    description: 'Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.',
}

export default function InternalTransferPage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <InternalTransfer />
        </Layout>
    )
}