import Layout from "../../components/layout/Layout"
import KYCVerification from "./KYCVerification"

export const metadata = {
    title: 'Xác minh danh tính KYC - Nivex Hub',
    description: 'Hướng dẫn chi tiết các bước xác minh danh tính KYC trên Nivex',
}

export default function KYCVerificationPage() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <KYCVerification />
            </Layout>
        </>
    )
}