'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import "/public/app/dist/modified.css"

export default function MainMenu() {
    const pathname = usePathname()
    const [currentMenuItem, setCurrentMenuItem] = useState("")

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-item" : ""
    const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current-menu-item" : ""

    return (
        <>
            <ul id="menu-primary-menu" className="menu">
                <li className={`menu-item`}>
                    <Link href="/" className='master-item'>Trang chủ </Link>
                    
                </li>
                <li className={`menu-item menu-item-has-children ${checkParentActive([
                    "/huong-dan-su-dung-app-nivex",
                    "/huong-dan-dang-ky-dang-nhap",
                    "/huong-dan-nap-tien", 
                    "/xac-minh-danh-tinh-kyc",
                    "/ai-copy-trade",
                    "/gioi-thieu-ve-nivex",
                    "/huong-dan-rut-tien",
                    "/giao-dich-p2p",
                    "/chuyen-tien-noi-bo",
                    "/xac-thuc-hai-lop-2fa",
                    "/huong-dan-lien-ket-google-authenticator",
                    "/nguyen-ly-hoat-dong-copy-trade",
                    "/nang-luc-canh-tranh",
                    "/tim-hieu-tiem-nang-loi-nhuan",
                    "/phan-thuong-bao-li-xi-nivex",
                    "/huong-dan-tao-lien-ket-gioi-thieu",

                    ])}`}>
                    <Link href="/gioi-thieu-ve-nivex" className='master-item'>Về Nivex</Link>
                    <ul className="sub-menu">
                        <li className={`menu-item ${checkCurrentMenuItem("/gioi-thieu-ve-nivex")}`}>
                            <Link href="/gioi-thieu-ve-nivex">Giới thiệu</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/ai-copy-trade")}`}>
                            <Link href="/ai-copy-trade">AI Copy Trade</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/huong-dan-su-dung-app-nivex") || 
                            checkCurrentMenuItem("/huong-dan-dang-ky-dang-nhap") ||
                            checkCurrentMenuItem("/huong-dan-nap-tien") ||
                            checkCurrentMenuItem("/xac-minh-danh-tinh-kyc") ||
                            checkCurrentMenuItem("/huong-dan-rut-tien") ||
                            checkCurrentMenuItem("/giao-dich-p2p") ||
                            checkCurrentMenuItem("/chuyen-tien-noi-bo") ||
                            checkCurrentMenuItem("/xac-thuc-hai-lop-2fa") ||
                            checkCurrentMenuItem("/huong-dan-lien-ket-google-authenticator") ||
                            checkCurrentMenuItem("/nguyen-ly-hoat-dong-copy-trade") ||
                            checkCurrentMenuItem("/nang-luc-canh-tranh") ||
                            checkCurrentMenuItem("/tim-hieu-tiem-nang-loi-nhuan") ||
                            checkCurrentMenuItem("/huong-dan-tao-lien-ket-gioi-thieu")
                            }`}>
                            <Link href="/huong-dan-su-dung-app-nivex">Hướng dẫn sử dụng App</Link>
                        </li>
                    </ul>
                </li>
                <li className={`menu-item menu-item-has-children ${checkParentActive(["/kien-thuc-tong-quan",
                    "/thuat-ngu",])}`}>
                    <Link href="/kien-thuc-tong-quan"  className='master-item'>Kiến thức</Link>
                    <ul className="sub-menu">
                        <li className={`menu-item ${checkCurrentMenuItem("/kien-thuc-tong-quan")}`}>
                            <Link href="/kien-thuc-tong-quan">Tổng quan</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/thuat-ngu")}`}>
                            <Link href="/thuat-ngu">Thuật ngữ</Link>
                        </li>
                    </ul>
                </li>
                <li className={`menu-item ${pathname === "/khoa-hoc" ? "current-menu-item" : ""}`}>
                    <Link href="/khoa-hoc"  className='master-item'>Khóa học</Link>
                </li>
                <li className={`menu-item menu-item-has-children ${checkParentActive(["/su-kien",
                    "/su-kien-tham-gia",])}`}>
                    <Link href="/su-kien" className='master-item'>Sự kiện</Link>
                    <ul className="sub-menu">
                        <li className={`menu-item ${checkCurrentMenuItem("/su-kien")}`}>
                            <Link href="/su-kien">Sự kiện Nivex tổ chức</Link>
                        </li>
                        <li className={`menu-item ${checkCurrentMenuItem("/su-kien-tham-gia")}`}>
                            <Link href="/su-kien-tham-gia">Sự kiện Nivex tham dự</Link>
                        </li>
                    </ul>
                </li>
                <li className={`menu-item ${pathname === "/tin-tuc" ? "current-menu-item" : ""}`}>
                    <Link href="/tin-tuc"  className='master-item'>Tin tức </Link>
                </li>
                <li className={`menu-item ${pathname === "/tin-nhanh" ? "current-menu-item" : ""}`}>
                    <Link href="/tin-nhanh"  className='master-item'>Tin nhanh </Link>
                </li>
            </ul>
        </>
    )
}

