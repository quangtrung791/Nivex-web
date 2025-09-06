import { Inter } from 'next/font/google' // 1. Import font Inter
import "/public/app/dist/app.css"
import "/public/assets/style/crypto-learning.css"
import "/public/app/dist/swiper-bundle.min.css"

// (Không cần dùng Poppins và DM_Sans nữa, có thể xóa hoặc comment lại)
// import { DM_Sans, Poppins } from 'next/font/google'

// 2. Khai báo font Inter
const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--dm", // 3. Gán vào biến --dm để CSS cũ vẫn hoạt động
    display: 'swap',
})

export const metadata = {
    title: 'Nivex',
    description: 'Nivex Website Vietnam - nivex.vn',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* 4. Sử dụng biến của font Inter */}
            <body className={`${inter.variable} body header-fixed is_dark`}>{children}</body>
        </html>
    )
}