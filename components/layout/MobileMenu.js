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
                    <li className={`menu-item menu-item-has-children ${checkParentActive(["/home-v2", "/home-v3"])}`}>
                        <Link href="/">Trang chủ </Link>
                        {/* <span className="arrow" onClick={() => handleClick(1)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                            <li className={`menu-item ${checkCurrentMenuItem("/")}`}>
                                <Link href="/">Home 01</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/home-v2")}`}>
                                <Link href="/home-v2">Home 02</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/home-v3")}`}>
                                <Link href="/home-v3">Home 03</Link>
                            </li>
                        </ul> */}
                    </li>
                    <li className={`menu-item menu-item-has-children ${checkParentActive(["/kien-thuc-tong-quan",
                        "/huong-dan-su-dung-app-nivex",
                        "/huong-dan-dang-ky-dang-nhap",
                        "/huong-dan-nap-tien", 
                        "/xac-minh-danh-tinh-kyc",
                        "/thuat-ngu",
                        "/ai-copy-trade",])}`}>
                        <Link href="/kien-thuc-tong-quan">Kiến thức</Link>
                        <span className={`arrow ${isActive === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                            <li className={`menu-item ${checkCurrentMenuItem("/kien-thuc-tong-quan")}`}>
                                <Link href="/kien-thuc-tong-quan">Tổng quan</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/huong-dan-su-dung-app-nivex") || 
                                checkCurrentMenuItem("/huong-dan-dang-ky-dang-nhap") ||
                                checkCurrentMenuItem("/huong-dan-nap-tien") ||
                                checkCurrentMenuItem("/xac-minh-danh-tinh-kyc")}`}>
                                <Link href="/huong-dan-su-dung-app-nivex">Hướng dẫn sử dụng App</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/thuat-ngu")}`}>
                                <Link href="/thuat-ngu">Thuật ngữ</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/ai-copy-trade")}`}>
                                <Link href="/ai-copy-trade">AI Copy Trade</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`menu-item ${pathname === "/su-kien" ? "current-menu-item" : ""}`}>
                        <Link href="/su-kien">Sự kiện</Link>
                    </li>
                    <li className={`menu-item ${pathname === "/tin-tuc" ? "current-menu-item" : ""}`}>
                        <Link href="/tin-tuc">Tin tức</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}
