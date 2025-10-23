import { Inter } from 'next/font/google' // 1. Import font Inter
import "/public/app/dist/app.css"
import "/public/assets/style/crypto-learning.css"
import "/public/app/dist/swiper-bundle.min.css"
import "/public/assets/style/propose-homepage.css"
// import BackToTop from '@/components/elements/BackToTop'
// import { CoinDataProvider } from '@/components/CoinDataProvider'

// (Không cần dùng Poppins và DM_Sans nữa, có thể xóa hoặc comment lại)
// import { DM_Sans, Poppins } from 'next/font/google'

// 2. Khai báo font Inter
const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: "--dm", 
    display: 'swap',
})


export const metadata = {

    //metadataBase giúp Next.js tạo URL tuyệt đối cho các thẻ/meta liên quan (OG images, canonical...)
    metadataBase: new URL('https://nivex.vn'),

    title: 'Nivex Hub',
    description: 'Nivex – nền tảng giao dịch crypto bằng trí tuệ nhân tạo, cung cấp spot và futures an toàn, nhanh chóng, dành cho cộng đồng người dùng Việt.',
    
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
        title: "Nivex Hub",
        description: "Nivex – nền tảng giao dịch crypto bằng trí tuệ nhân tạo, cung cấp spot và futures an toàn, nhanh chóng, dành cho cộng đồng người dùng Việt.",
        url: "https://nivex.vn",
        siteName: "Nivex",
        images: [
            {
                url: "/assets/images/icon/icon_menu_header.png",
                width: 1200,
                height: 630,
                alt: "Nivex – nền tảng giao dịch crypto bằng trí tuệ nhân tạo, cung cấp spot và futures an toàn, nhanh chóng, dành cho cộng đồng người dùng Việt."
            }
        ],
        locale: "vi_VN",
        type: "website"
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            {/* <head>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js')
                                        .then(function(registration) {
                                            console.log('SW registered: ', registration);
                                        })
                                        .catch(function(registrationError) {
                                            console.log('SW registration failed: ', registrationError);
                                        });
                                });
                            }
                        `,
                    }}
                />
            </head> */}
            {/* 4. Sử dụng biến của font Inter */}
            <body className={`${inter.variable} body header-fixed is_dark`}>
                    {children}
            </body>
        </html>
    )
}