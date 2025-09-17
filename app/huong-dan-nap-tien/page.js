import Layout from '@/components/layout/Layout'
import DepositGuide from './DepositGuide'

export const metadata = {
    title: 'Hướng dẫn nạp tiền Nivex | Nivex Hub',
    description: 'Hướng dẫn chi tiết cách nạp tiền vào tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi nạp tiền chưa về.',
}

export default function DepositGuidePage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <DepositGuide />
        </Layout>
    )
}