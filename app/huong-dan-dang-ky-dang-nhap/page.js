import Layout from "../../components/layout/Layout"
import RegisterLoginGuide from "./RegisterLoginGuide"

export const metadata = {
    title: 'Hướng dẫn đăng ký và đăng nhập - Nivex Hub',
    description: 'Hướng dẫn chi tiết cách tạo tài khoản và đăng nhập vào Nivex',
}

export default function RegisterLoginGuidePage() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <RegisterLoginGuide />
            </Layout>
        </>
    )
}