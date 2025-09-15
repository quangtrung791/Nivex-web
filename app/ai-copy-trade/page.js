'use client'
import Layout from "../../components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import styles from './aiCopyTrade.module.css'

export default function AICopyTrade() {
    useEffect(() => {
        document.title = "AI copy trade"
    }, []);
    const [openFaq, setOpenFaq] = useState({})

    const toggleFaq = (index) => {
        setOpenFaq(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={2}>
                <div className={styles.howToBuyCryptoSection}>
                    <div className="container">
                        {/* Header Section */}
                        <div className={styles.header}>
                            <h1 className={styles.mainTitle}>
                                <span className={styles.cryptoHighlight}>AI</span> Copy Trade
                            </h1>
                            <p className={styles.subtitle}>
                                Tận dụng công nghệ AI để tự động sao chép chiến lược tối ưu hóa lợi nhuận và quản lý rủi ro trong thời gian thực.
                            </p>
                        </div>
                        <div className={styles.introText}>
                            <h3>
                                <span>3 AI COPY TRADE </span>NỔI BẬT
                            </h3>
                            <p>
                                Khám phá 3 chiến lược AI của Nivex, tối ưu hóa lợi nhuận và tự động quản lý rủi ro từ giao dịch xu hướng đến altcoin và tần số cao.
                            </p>
                        </div>
                        {/* Hero Section */}
                        <div className={styles.heroSection}>
                            <div className={styles.heroImage}>
                                <img src="/assets/images/background/AI_Trade.webp" alt="Crypto Wallet" />
                            </div>
                            <div className={styles.heroContent}>
                                <div>
                                    <p className={`${styles.cryptoHighlight} ${styles.AITradeText}`}>AITrade</p>
                                    <p className={`${styles.heroContentText2}`}>Tần số cao · Tự động hóa coin chính thống</p>
                                </div>
                                <div  className={`${styles.displayFlexTextDescription}`}>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+1,786,506.44 USDT </p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+145.34% </p>
                                        <p>ROI</p> 
                                    </div>
                                </div>

                                <div  className={`${styles.displayFlexTextDescription2}`}>
                                    <p>Định vị: <span>Giao dịch tần số cao, arbitrage trong biên độ BTC/ETH và các coin thanh khoản cao</span> </p>
                                    <p>Quản trị rủi ro: <span>Tự động chốt lời/cắt lỗ, AI nhận diện tâm lý thị trường (big data).</span> </p> 
                                    <p>Phù hợp với: <span>Nhà đầu tư ưa thanh khoản cao, độ ổn định và tự động hóa tối đa.</span> </p> 
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroSection}>
                            
                            <div className={`${styles.heroContent} ${styles.orderMobileSecond}`}>
                                <div>
                                    <p className={`${styles.cryptoHighlight} ${styles.AITradeText}`}>Astrabit</p>
                                    <p className={`${styles.heroContentText2}`}>Khai thác hottrend · Bùng nổ Altcoin</p>
                                </div>
                                <div  className={`${styles.displayFlexTextDescription}`}>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+3,472,414.08 USDT </p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+130.13% </p>
                                        <p>ROI</p> 
                                    </div>
                                </div>

                                <div  className={`${styles.displayFlexTextDescription2}`}>
                                    <p>Định vị: <span>Kết hợp dòng tiền “cá voi” (VC) & dữ liệu nóng on-chain, săn sóng 24–72h</span> </p>
                                    <p>Quản trị rủi ro: <span>Chốt lời linh hoạt, cắt lỗ nhanh.</span> </p> 
                                    <p>Phù hợp với: <span>Nhà đầu tư tìm biên lợi nhuận ngắn hạn từ altcoin.</span> </p> 
                                </div>
                            </div>

                            <div className={`${styles.heroImage} ${styles.orderMobileFirst}`}>
                                <img src="/assets/images/background/astrabit-Pica.webp" alt="Crypto Wallet" />
                            </div>
                        </div>

                        <div className={styles.heroSection}>
                            <div className={styles.heroImage}>
                                <img src="/assets/images/background/Alpha10.webp" alt="Crypto Wallet" />
                            </div>
                            <div className={styles.heroContent}>
                                <div>
                                    <p className={`${styles.cryptoHighlight} ${styles.AITradeText}`}>AITrade</p>
                                    <p className={`${styles.heroContentText2}`}>Tần số cao · Tự động hóa coin chính thống</p>
                                </div>
                                <div  className={`${styles.displayFlexTextDescription}`}>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+3,674,760.80 USDT </p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+130.54%</p>
                                        <p>ROI</p> 
                                    </div>
                                </div>

                                <div  className={`${styles.displayFlexTextDescription2}`}>
                                    <p>Định vị: <span>Mô hình theo xu hướng đa coin, trọng tâm BTC/ETH/BNB.</span> </p>
                                    <p>Quản trị rủi ro: <span>Theo dõi xu hướng + nhận diện đảo chiều.</span> </p> 
                                    <p>Phù hợp với: <span>Nhà đầu tư ưu tiên độ ổn định, chu kỳ nắm giữ dài hơn.</span> </p> 
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className={styles.faqSection}>
                            <h2 className={styles.faqTitle}>Câu hỏi thường gặp</h2>
                            <div className={styles.faqList}>
                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(0)}>
                                        <span>AI Copy Trade có đảm bảo lợi nhuận không??</span>
                                        <span className={`${styles.faqIcon} ${openFaq[0] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[0] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Không. Mặc dù AI giúp tối ưu hóa chiến lược giao dịch và quản lý rủi ro, nhưng không thể loại bỏ hoàn toàn rủi ro.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                        <span>Có thể dừng lệnh sao chép bất kỳ lúc nào không?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[1] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[1] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Có. Bạn có thể dừng hoặc điều chỉnh chiến lược sao chép bất kỳ lúc nào.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                        <span>Cần bao nhiêu vốn để bắt đầu?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[2] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[2] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Bạn có thể bắt đầu với một số vốn nhỏ, tùy chỉnh tỷ lệ vốn phù hợp với chiến lược của mình.</p>
                                    </div>
                                </div>

                                {/* <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(3)}>
                                        <span>Số tiền tối thiểu để mua crypto trên Nivex là bao nhiêu?</span>
                                        <span className={`${styles.faqIcon} ${openFaq === 3 ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq === 3 ? styles.faqAnswerOpen : ''}`}>
                                        <p>Số tiền tối thiểu để mua crypto trên Nivex là 100,000 VNĐ. Bạn có thể bắt đầu với số tiền nhỏ để làm quen với giao dịch.</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}