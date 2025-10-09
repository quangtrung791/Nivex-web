import Layout from '@/components/layout/Layout'
import CoursesPage from './CoursesPage'
import Header2 from '@/components/layout/header/Header2.css'

export const metadata = {
  title: 'Khóa học | Nivex Hub',
  description: 'Giới thiệu khóa học tại Nivex',
}

export default function Courses() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <CoursesPage />
    </Layout>
  )
}