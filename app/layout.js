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

    title: 'NIVEX - Nền Tảng Crypto AI & Copytrade Thông Minh',
    description: 'Giao dịch crypto thông minh với NIVEX. Nền tảng giao dịch crypto tích hợp AI thông minh. Bảo mật cao, dễ sử dụng cho người mới. Đăng ký miễn phí.',
    alternates: {
        canonical: 'https://nivex.info',
    },
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
        title: "NIVEX - Nền Tảng Crypto AI & Copytrade Thông Minh",
        description: "Giao dịch crypto thông minh với NIVEX. Nền tảng giao dịch crypto tích hợp AI thông minh. Bảo mật cao, dễ sử dụng cho người mới. Đăng ký miễn phí.",
        url: "https://nivex.info",
        siteName: "Nivex",
        images: [
            {
                url: "assets/images/icon/icon_menu_header.png",
                width: 1200,
                height: 630,
                objectFit: "contain",
                alt: "Giao dịch crypto thông minh với NIVEX. Nền tảng giao dịch crypto tích hợp AI thông minh. Bảo mật cao, dễ sử dụng cho người mới. Đăng ký miễn phí."
            }
        ],
        locale: "vi_VN",
        type: "website"
    },

    // themeColor: "#bcfe08",
    // // manifest: "/manifest.webmanifest",
    // icons: {
    //     icon: [
    //       { url: "https://nivexhub.learningchain.vn/wp-content/uploads/2025/11/zdsfsdhdfxgshjrdfgthd.webp", sizes: "192x192", type: "image/png" },
    //     ],
    //     apple: [{ url: "https://nivexhub.learningchain.vn/wp-content/uploads/2025/11/zdsfsdhdfxgshjrdfgthd.webp", sizes: "180x180", type: "image/png" }]
    // },
    // appleWebApp: {
    //     capable: true,
    //     statusBarStyle: "black-translucent",
    //     title: "Nivex Hub"
    // }
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