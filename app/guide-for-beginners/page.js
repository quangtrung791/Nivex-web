import Layout from "../../components/layout/Layout"
import LearningHub from "../../app/guide-for-beginners/LearningHub"

export const metadata = {
    title: 'Guide for Beginners - Nivex Hub',
    description: 'Hướng dẫn đầu tư tiền mã hóa cho người mới bắt đầu',
}

export default function GuideForBeginners() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <LearningHub />
            </Layout>
        </>
    )
}