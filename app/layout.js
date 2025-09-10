import { Inter } from 'next/font/google' // 1. Import font Inter
import "/public/app/dist/app.css"
import "/public/assets/style/crypto-learning.css"
import "/public/app/dist/swiper-bundle.min.css"
import BackToTop from '@/components/elements/BackToTop'
import { CoinDataProvider } from '@/components/CoinDataProvider'

// (Không cần dùng Poppins và DM_Sans nữa, có thể xóa hoặc comment lại)
// import { DM_Sans, Poppins } from 'next/font/google'

// 2. Khai báo font Inter
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--dm", 
    display: 'swap',
})

export const metadata = {
    title: 'Nivex hub',
    description: 'Nivex Website Vietnam - nivex.vn',
}

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <head>
                {/* Service Worker registration để tối ưu caching */}
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
            </head>
            {/* 4. Sử dụng biến của font Inter */}
            <body className={`${inter.variable} body header-fixed is_dark`}>
                <CoinDataProvider>
                    {children}
                </CoinDataProvider>
            </body>
        </html>
    )
}