import { Menu } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from "next/link"
import MainMenu from '../Menu'
import MobileMenu from '../MobileMenu'
import styles from '@/components/layout/header/header2.module.css'

const ThemeSwitch = dynamic(() => import('../../elements/ThemeSwitch'), {
    ssr: false,
})
export default function Header1({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>

            <header id="header_main" className={`header ${scroll ? "is-fixed is-small" : ""}`} style={{'height': '60px'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="header__body d-flex justify-content-between">
                                <div className={`header__left ${styles.headerLeft}`}>
                                    <div className="logo">
                                        <div className="dark" >
                                            <img className={styles.logoHeaderNivex } src="https://learningchain.vn/wp-content/uploads/2025/10/Nivex_icon_handicape.webp" alt=""/>
                                        </div>
                                    </div>
                                    <div className={styles.newClass1 }>
                                            <p>|</p>
                                    </div>
                                    <div className="logo">
                                        <div className="dark" >
                                            <img className={styles.logoHeaderLearningChain } src="https://learningchain.vn/wp-content/uploads/2025/10/White-Logo-Learning-Chain-Text-01-1.webp" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className={`header__right ${styles.headerRight}`}>
                                   <div className={styles.textHeaderRight}>
                                        Learningchain.vn
                                   </div>
                                   <div className={styles.textHeaderRight2}>
                                        NIVEX0.ONE
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
