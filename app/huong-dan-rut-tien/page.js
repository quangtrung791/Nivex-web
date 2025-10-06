import Layout from '@/components/layout/Layout'
import WithdrawGuide from './WithdrawGuide'

export const metadata = {
    title: 'Hướng dẫn rút tiền Nivex | Nivex Hub',
    description: 'Hướng dẫn chi tiết cách rút tiền từ tài khoản Nivex một cách nhanh chóng và an toàn. Xử lý các vấn đề khi rút tiền chưa về.',
}

export default function WithdrawGuidePage() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <WithdrawGuide />
        </Layout>
    )
}