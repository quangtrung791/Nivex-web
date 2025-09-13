'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './LearningHub.module.css'

export default function LearningHub() {
    const [activeTab, setActiveTab] = useState('futures')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    
    const tabData = {
        futures: [
            {
                id: 1,
                title: "Learn about UI8 coin and earn an all Access Pass",
                category: "Floyd Buckridge",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            },
            {
                id: 2,
                title: "Learn about UI8 coin and earn an all Access Pass", 
                category: "Floyd Buckridge",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            },
            {
                id: 3,
                title: "Learn about UI8 coin and earn an all Access Pass",
                category: "Floyd Buckridge", 
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            },
            {
                id: 4,
                title: "Learn about UI8 coin and earn an all Access Pass",
                category: "Floyd Buckridge",
                date: "00/00/2025", 
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ],
        spot: [
            {
                id: 1,
                title: "Spot Trading Fundamentals for Beginners",
                category: "Trading Expert",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            },
            {
                id: 2,
                title: "Understanding Market Orders vs Limit Orders",
                category: "Trading Expert", 
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ],
        copyTrade: [
            {
                id: 1,
                title: "How to Start Copy Trading Safely",
                category: "Copy Trade Pro",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp", 
                duration: "Learn & Earn"
            },
            {
                id: 2,
                title: "Choosing the Right Traders to Follow",
                category: "Copy Trade Pro",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ],
        p2p: [
            {
                id: 1,
                title: "P2P Trading Security Guidelines",
                category: "Security Expert",
                date: "00/00/2025", 
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ],
        guide: [
            {
                id: 1,
                title: "Cryptocurrency Basics for Absolute Beginners",
                category: "Crypto Teacher",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn" 
            },
            {
                id: 2,
                title: "How to Secure Your Crypto Wallet",
                category: "Security Expert",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ],
        indicator: [
            {
                id: 1,
                title: "Technical Analysis: RSI Indicator Explained",
                category: "TA Expert",
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            },
            {
                id: 2,
                title: "Moving Averages for Crypto Trading",
                category: "TA Expert", 
                date: "00/00/2025",
                image: "/assets/images/background/bg_crypto_learning_button.webp",
                duration: "Learn & Earn"
            }
        ]
    }

    const tabs = [
        { id: 'futures', label: 'Futures' },
        { id: 'spot', label: 'Spot' },
        { id: 'copyTrade', label: 'Copy Trade' },
        { id: 'p2p', label: 'P2P' },
        { id: 'guide', label: 'Hướng dẫn Người dùng' },
        { id: 'indicator', label: 'Chỉ báo Kỹ thuật' }
    ]

    return (
        <section className={styles.learningHubSection}>
            <div className={`container ${styles.padingleftandRightNone}`}>
                <div className="row">
                    <div className="col-12">
                        <div className={styles.learningGuideForBeginnersHeader}>
                            <h1 className={styles.learningMainTitle}>
                                Tiền mã hóa cho người <span className={styles.highlightGreen}>mới bắt đầu</span>
                            </h1>
                            <p className={styles.learningSubtitle}>
                                Trang bị kiến thức cơ bản để tự tin bước vào thế giới blockchain và tài sản số
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`row ${styles.sectionGuideContent}`}>
                    <div className={`col-lg-3 ${styles.borderRightGuideContent}`}>
                        {/* Mobile dropdown */}
                        <div className={styles.mobileDropdown}>
                            <div className={styles.mobileDropdownInnerFlex}>
                                <button
                                    type="button"
                                    className={styles.dropdownToggle}
                                    onClick={() => setIsDropdownOpen((v) => !v)}
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="listbox"
                                >
                                    {tabs.find((t) => t.id === activeTab)?.label || 'Danh mục'}
                                
                                </button>
                                <span className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>
                                </span>
                            </div>
                            <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`} role="listbox">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        role="option"
                                        aria-selected={activeTab === tab.id}
                                        className={`${styles.learningMenuItem} ${activeTab === tab.id ? styles.active : ''}`}
                                        onClick={() => {
                                            setActiveTab(tab.id)
                                            setIsDropdownOpen(false)
                                        }}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Desktop sidebar */}
                        <div className={`${styles.learningSidebar} ${styles.desktopSidebar}`}>
                            <ul className={styles.learningMenu}>
                                {tabs.map(tab => (
                                    <li 
                                        key={tab.id}
                                        className={`${styles.learningMenuItem} ${activeTab === tab.id ? styles.active : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`col-lg-9 ${styles.sectionGuideContentVideo}`}>
                        <div className={styles.learningContent}>
                            <div className={styles.learningGrid}>
                                {tabData[activeTab]?.map((item) => (
                                    <div key={item.id} className={styles.learningCard}>
                                        <div className={styles.cardImage}>
                                            <img src={item.image} alt={item.title} />
                                            {/* <div className={styles.playButton}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                                </svg>
                                            </div> */}
                                        </div>
                                        <div className={styles.cardContent}>
                                            <span className={styles.category}>{item.duration}</span>
                                            <h3 className={styles.cardTitle}>{item.title}</h3>
                                            <div className={styles.cardMeta}>
                                                <div className={styles.author}>
                                                    <div className={styles.authorDot}></div>
                                                    <span>{item.category}</span>
                                                </div>
                                                <span className={styles.date}>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}