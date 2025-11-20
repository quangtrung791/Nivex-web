import { Inter } from 'next/font/google' // 1. Import font Inter
import "/public/app/dist/app.css"
import "/public/assets/style/crypto-learning.css"
import "/public/app/dist/swiper-bundle.min.css"
import "/public/assets/style/propose-homepage.css"

// 2. Khai báo font Inter
const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: "--dm", 
    display: 'swap',
})


export const metadata = {

    //metadataBase giúp Next.js tạo URL tuyệt đối cho các thẻ/meta liên quan (OG images, canonical...)
    metadataBase: new URL('https://nivex.info'),

    title: 'NIVEX - Nền tảng giao dịch AI & Copytrade thông minh',
    description: 'NIVEX là nền tảng giao dịch tích hợp AI giúp giao dịch minh bạch, an toàn, hỗ trợ Spot, Future và AI Copytrade với hiệu suất tối ưu cho người dùng toàn cầu.',
    
    // Thêm index, follow cho trực quan...
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
        title: "NIVEX - Nền tảng giao dịch AI & Copytrade thông minh",
        description: "NIVEX là nền tảng giao dịch tích hợp AI giúp giao dịch minh bạch, an toàn, hỗ trợ Spot, Future và AI Copytrade với hiệu suất tối ưu cho người dùng toàn cầu.",
        url: "https://nivex.info",
        siteName: "Nivex",
        images: [
            {
                url: "assets/images/logo/NivexIcon.PNG",
                width: 1200,
                height: 630,
                objectFit: "contain",
                alt: "NIVEX là nền tảng giao dịch tích hợp AI giúp giao dịch minh bạch, an toàn, hỗ trợ Spot, Future và AI Copytrade với hiệu suất tối ưu cho người dùng toàn cầu."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            {/* 4. Sử dụng biến của font Inter */}
            <body className={`${inter.variable} body header-fixed is_dark`}>
                    {children}
            </body>
        </html>
    )
}