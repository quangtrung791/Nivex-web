import Layout from "@/components/layout/Layout"
import KnowledgePage from './KnowledgePage'

export const metadata = {
    title: 'Kiến thức tổng quan | Nivex Hub',
    description: 'Trang bị nền tảng cơ bản để tự tin bước vào thế giới blockchain và tài sản số',
}

export default function Knowledge() {
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <KnowledgePage />
        </Layout>
    )
}