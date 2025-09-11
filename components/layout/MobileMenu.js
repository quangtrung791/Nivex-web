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
                    <li className={`menu-item menu-item-has-children ${checkParentActive(["/thuat-ngu",
                        "/how-to-buy-crypto",
                        "/ai-copy-trade",])}`}>
                        <Link href="#">Kiến thức</Link>
                        <span className={`arrow ${isActive === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} />
                        <ul className="sub-menu" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                            <li className={`menu-item ${checkCurrentMenuItem("/thuat-ngu")}`}>
                                <Link href="/thuat-ngu">Thuật ngữ</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/how-to-buy-crypto")}`}>
                                <Link href="/how-to-buy-crypto">Cách mua Crypto</Link>
                            </li>
                            <li className={`menu-item ${checkCurrentMenuItem("/ai-copy-trade")}`}>
                                <Link href="/ai-copy-trade">AI Copy Trade</Link>
                            </li>
                            <li className={`menu-item`}>
                                <Link href="#">Hướng dẫn người mới</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`menu-item ${pathname === "/markets" ? "current-menu-item" : ""}`}>
                        <Link href="/markets">Thị trường </Link>
                    </li>
                    <li className={`menu-item`}>
                        <Link href="#">Tin tức </Link>
                    </li>
                    <li className={`menu-item`}>
                        <Link href="#">Trung tâm trợ giúp </Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}
