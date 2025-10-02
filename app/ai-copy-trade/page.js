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
                                Tận dụng công nghệ AI để tự động sao chép chiến lược, tối ưu hóa lợi nhuận và quản lý rủi ro trong thời gian thực.
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
                                <img src="https://learningchain.vn/wp-content/uploads/2025/10/AITrade_aicopytrade_nivex.webp" alt="Crypto Wallet" />
                            </div>
                            <div className={styles.heroContent}>
                                <div>
                                    <p className={`${styles.cryptoHighlight} ${styles.AITradeText}`}>AITrade</p>
                                    <p className={`${styles.heroContentText2}`}>Tần số cao · Tự động hóa coin chính thống</p>
                                </div>
                                <div  className={`${styles.displayFlexTextDescription}`}>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+2,756,536.59 USDT</p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+306.41%</p>
                                        <p>ROI</p> 
                                    </div>
                                </div>

                                <div  className={`${styles.displayFlexTextDescription2}`}>
                                    <p>Định vị: <span>Giao dịch tần số cao, arbitrage trong biên độ BTC/ETH và các coin thanh khoản cao.</span> </p>
                                    <p>Quản trị rủi ro: <span>Tự động chốt lời/cắt lỗ, AI nhận diện tâm lý thị trường (big data).</span> </p> 
                                    <p>Phù hợp với: <span>Nhà đầu tư ưa <b>thanh khoản cao</b>, độ ổn định và tự động hóa tối đa.</span> </p> 
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
                                        <p>+6,305,345.90 USDT</p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+162.66%</p>
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
                                <img src="https://learningchain.vn/wp-content/uploads/2025/10/astrabit_aicopytrade_nive.webp" alt="Crypto Wallet" />
                            </div>
                        </div>

                        <div className={styles.heroSection}>
                            <div className={styles.heroImage}>
                                <img src="https://learningchain.vn/wp-content/uploads/2025/10/Alpha10_aicopytra_nivex.webp" alt="Crypto Wallet" />
                            </div>
                            <div className={styles.heroContent}>
                                <div>
                                    <p className={`${styles.cryptoHighlight} ${styles.AITradeText}`}>AIpha 10</p>
                                    <p className={`${styles.heroContentText2}`}>Xu hướng ổn định · Coin chính thống</p>
                                </div>
                                <div  className={`${styles.displayFlexTextDescription}`}>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+6,497,844.53 USDT </p>
                                        <p>Hiệu suất tích lũy</p> 
                                    </div>
                                    <div className={`${styles.heroDescription} ${styles.beforeTextWithBorder}`}>
                                        <p>+140.43%</p>
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
                                        <span>AI Copy Trade có đảm bảo lợi nhuận không?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[0] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[0] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Các chiến lược của chúng tôi được thiết kế với quy trình backtest và quản lý rủi ro cực kỳ nghiêm ngặt để duy trì hiệu suất ổn định và hạn chế tối đa rủi ro thua lỗ nặng trong các điều kiện thị trường khác nhau.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                        <span>Có thể dừng lệnh sao chép bất kỳ lúc nào không?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[1] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[1] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Chiến lược Copytrade không giới hạn thời điểm dừng lệnh. Việc dừng lệnh sao chép có thể mất phí (được tính phụ thuộc vào thời gian lệnh đang đi, khối lượng giao dịch và đồng mà lệnh đang đi)</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                        <span>Cần bao nhiêu vốn để bắt đầu?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[2] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[2] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Bạn có thể bắt đầu với số vốn nhỏ và tùy chỉnh tỷ lệ vốn theo chiến lược; nền tảng hỗ trợ mọi quy mô vốn, nên người dùng vốn nhỏ vẫn có thể tham gia Copy Trade để tích lũy lợi nhuận ổn định.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(3)}>
                                        <span>Bắt đầu Copy Trading trên Nivex như thế nào?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[3] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[3] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Chỉ với vài bước:
                                            <br />&nbsp;1. Chọn sản phẩm AI Copy Trade Cấp Tổ Chức → nhấn Bắt đầu.
                                            &nbsp;<br />&nbsp;2. Nhập số tiền muốn đầu tư → Xác nhận.
                                            &nbsp;<br />&nbsp;3. Hệ thống tự động sao chép mọi tín hiệu giao dịch; bạn theo dõi lợi nhuận theo thời gian thực, không cần thao tác thêm.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(4)}>
                                        <span>Làm sao để chọn chiến lược phù hợp với tôi?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[4] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[4] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Nền tảng cung cấp đầy đủ dữ liệu về hiệu suất lịch sử, kết quả backtest, và các chỉ số rủi ro. Dựa trên khả năng chấp nhận rủi ro và mục tiêu lợi nhuận, bạn có thể chọn chiến lược "An toàn - Ổn định" hoặc "Tấn công - Mạo hiểm".</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(5)}>
                                        <span>Rủi ro & kiểm soát rủi ro ra sao?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[5] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[5] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Hệ thống sử dụng cơ chế quản lý rủi ro linh hoạt, quản lý vị thế thông minh và stop-loss tự động. Rủi ro thị trường được theo dõi 24/7 để đảm bảo kiểm soát hiệu quả trong mọi tình huống.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}