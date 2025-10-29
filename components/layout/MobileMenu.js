'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MobileMenu({ isMobileMenu }) {
    const [isActive, setIsActive] = useState(0)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
    const pathname = usePathname()
    const [currentMenuItem, setCurrentMenuItem] = useState("")

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-item" : ""
    const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current-menu-item" : ""
    return (
        <>
            <nav id="main-nav-mobi" className="main-nav" style={{ display: `${isMobileMenu ? "block" : "none"}` }}>
                <ul id="menu-primary-menu" className="menu">
                    <li className={`menu-item`}>
                        <Link href="/">Trang chủ</Link>
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
                        "/xac-thuc-hai-lop-2fa"])}`}>
                        <Link href="/gioi-thieu-ve-nivex">Về Nivex</Link>
                        <span className={`arrow ${isActive === 1 ? 'active' : ''}`} onClick={() => handleClick(1)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
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
                                checkCurrentMenuItem("/xac-thuc-hai-lop-2fa") }`}>
                                <Link href="/huong-dan-su-dung-app-nivex">Hướng dẫn sử dụng App</Link>
                            </li>
                            
                        </ul>
                    </li>

                    <li className={`menu-item menu-item-has-children ${checkParentActive(["/kien-thuc-tong-quan",
                        "/thuat-ngu",])}`}>
                        <Link href="/kien-thuc-tong-quan">Kiến thức</Link>
                        <span className={`arrow ${isActive === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                            <li className={`menu-item ${checkCurrentMenuItem("/kien-thuc-tong-quan")}`}>
                                <Link href="/kien-thuc-tong-quan">Tổng quan</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/thuat-ngu")}`}>
                                <Link href="/thuat-ngu">Thuật ngữ</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`menu-item ${pathname === "/khoa-hoc" ? "current-menu-item" : ""}`}>
                        <Link href="/khoa-hoc">Khóa học</Link>
                    </li>
                    <li className={`menu-item menu-item-has-children ${checkParentActive(["/su-kien",
                        "/su-kien-tham-gia",])}`}>
                        <Link href="/su-kien">Sự kiện</Link>
                        <span className={`arrow ${isActive === 3 ? 'active' : ''}`} onClick={() => handleClick(3)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                            <li className={`menu-item ${checkCurrentMenuItem("/su-kien")}`}>
                                <Link href="/su-kien">Sự kiện Nivex tổ chức</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/su-kien-tham-gia")}`}>
                                <Link href="/su-kien-tham-gia">Sự kiện Nivex tham dự</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`menu-item ${pathname === "/tin-tuc" ? "current-menu-item" : ""}`}>
                        <Link href="/tin-tuc">Tin tức</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}
