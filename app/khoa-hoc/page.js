import Layout from '@/components/layout/Layout'
import CoursesPage from './CoursesPage'



export const metadata = {
  title: 'Khóa học Nivex Hub',
  description: 'Khám phá các khóa học đa dạng tại Nivex Hub. Nâng cao kỹ năng, phát triển chuyên môn và định hình tương lai sự nghiệp của bạn ngay hôm nay!',
  alternates: {
    canonical: 'https://nivex.vn/khoa-hoc/'
  },
  robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: 'large',
          maxVideoPreview: -1,
        },
    },
    openGraph: {
        title: "Các khóa học | Nivex Hub",
        description: "Giới thiệu khóa học tại Nivex",
        url: "https://nivex.vn/khoa-hoc/",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/logo/Nivex_icon_bg.png",
                width: 1200,
                height: 630,
                alt: "Giới thiệu khóa học tại Nivex."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function Courses() {
  return (
    <Layout headerStyle={1} footerStyle={2}>
      <CoursesPage />
    </Layout>
  )
}