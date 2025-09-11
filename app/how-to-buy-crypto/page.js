'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import styles from './howToBuyCrypto.module.css'

export default function HowToBuyCrypto() {
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
                                Cách mua <span className={styles.cryptoHighlight}>Crypto</span>
                            </h1>
                            <p className={styles.subtitle}>
                                Tìm hiểu cách thực mua Bitcoin và các đồng crypto xếp đầu về vốn hóa.
                            </p>
                        </div>

                        {/* Hero Section */}
                        <div className={styles.heroSection}>
                            <div className={styles.heroContent}>
                                <h2 className={styles.heroTitle}>
                                    MUA CRYPTO TRÊN<br />
                                    NIVEX NHANH CHÓNG<br />
                                    TRONG <span className={styles.stepHighlight}>4 BƯỚC</span>
                                </h2>
                                <p className={styles.heroDescription}>
                                    Khởi đầu hành trình với Bitcoin, Altcoin và bộ công cụ AI giao dịch tối ưu.
                                </p>
                            </div>
                            <div className={styles.heroImage}>
                                <img src="/assets/images/layout/mainBorker.svg" alt="Crypto Wallet" />
                            </div>
                        </div>

                        {/* Steps Grid */}
                        <div className={styles.stepsGrid}>
                            {/* Step 1 - Tạo tài khoản */}
                            <div className={styles.stepCard}>
                                <div className={styles.stepIcon}>
                                    {/* <div className={styles.stepNumber}>1</div> */}
                                    <img src="/assets/images/icon/icon_user_green.png" alt="User" />
                                </div>
                                <h3 className={styles.stepTitle}>Tạo tài khoản</h3>
                                <p className={styles.stepDescription}>
                                    Đăng ký bằng email hoặc số điện thoại và hoàn tất KYC để mở khóa toàn bộ tính năng trên Nivex.
                                </p>
                                <Link href="/register">
                                    <button className={styles.stepButton}>Đăng ký<span className={styles.stepButtonIconArrow}></span></button>
                                </Link>
                                <div className={styles.stepCardIconArrow}></div>
                            </div>

                            {/* Step 2 - Thêm phương thức thanh toán */}
                            <div className={styles.stepCard}>
                                <div className={styles.stepIcon}>
                                    {/* <div className={styles.stepNumber}>2</div> */}
                                    <img src="/assets/images/icon/wallet_green.png" alt="Wallet" />
                                </div>
                                <h3 className={styles.stepTitle}>Thêm phương thức thanh toán</h3>
                                <p className={styles.stepDescription}>
                                    Đăng ký bằng email hoặc số điện thoại và hoàn tất KYC để mở khóa toàn bộ tính năng trên Nivex.
                                </p>
                                <Link href="/wallet">
                                    <button className={styles.stepButton}>Nạp<span className={styles.stepButtonIconArrow}></span></button>
                                </Link>
                                <div className={styles.stepCardIconArrow}></div>
                            </div>

                            {/* Step 3 - Đặt hàng */}
                            <div className={styles.stepCard}>
                                <div className={styles.stepIcon}>
                                    {/* <div className={styles.stepNumber}>3</div> */}
                                    <img src="/assets/images/icon/buy-button-green.png" alt="Buy" />
                                </div>
                                <h3 className={styles.stepTitle}>Đặt hàng</h3>
                                <p className={styles.stepDescription}>
                                    Bạn có thể mua crypto độ dàng trên Nivex với nhiều tùy chọn giao dịch P2P hoặc Spot.
                                </p>
                                <Link href="/buy-crypto-select">
                                    <button className={styles.stepButton}>Mua Crypto<span className={styles.stepButtonIconArrow}></span></button>
                                </Link>
                                <div className={styles.stepCardIconArrow}></div>
                            </div>

                            {/* Step 4 - Nắm giữ hay Giao dịch */}
                            <div className={styles.stepCard}>
                                <div className={styles.stepIcon}>
                                    {/* <div className={styles.stepNumber}>4</div> */}
                                    <img src="/assets/images/icon/trade-icon-green.png" alt="Trade" />
                                </div>
                                <h3 className={styles.stepTitle}>Nắm giữ hay Giao dịch</h3>
                                <p className={styles.stepDescription}>
                                    Số crypto bạn mua sẽ hiển thị trong ví Nivex. Bạn có thể giữ, giao dịch ngay trên sàn hoặc rút bất kỳ lúc nào.
                                </p>
                                <Link href="/markets">
                                    <button className={styles.stepButton}>Giao dịch<span className={styles.stepButtonIconArrow}></span></button>
                                </Link>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className={styles.faqSection}>
                            <h2 className={styles.faqTitle}>Câu hỏi thường gặp</h2>
                            <div className={styles.faqList}>
                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(0)}>
                                        <span>Tôi có cần xác minh KYC để mua crypto trên Nivex không?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[0] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[0] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Có, để đảm bảo an toàn và tuân thủ quy định, bạn cần hoàn tất xác minh KYC để sử dụng đầy đủ các tính năng mua bán crypto trên Nivex.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                        <span>Mua crypto trên Nivex có an toàn không?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[1] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[1] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Nivex sử dụng các biện pháp bảo mật tiên tiến nhất để bảo vệ tài sản của người dùng, bao gồm mã hóa SSL, xác thực 2FA và lưu trữ lạnh.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                        <span>Làm thế nào để bán crypto trên Nivex?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[2] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[2] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Bạn có thể bán crypto thông qua giao dịch P2P hoặc Spot trên Nivex. Chỉ cần chọn loại crypto, nhập số lượng và xác nhận giao dịch.</p>
                                    </div>
                                </div>

                                <div className={styles.faqItem}>
                                    <div className={styles.faqQuestion} onClick={() => toggleFaq(3)}>
                                        <span>Số tiền tối thiểu để mua crypto trên Nivex là bao nhiêu?</span>
                                        <span className={`${styles.faqIcon} ${openFaq[3] ? styles.faqIconOpen : ''}`}></span>
                                    </div>
                                    <div className={`${styles.faqAnswer} ${openFaq[3] ? styles.faqAnswerOpen : ''}`}>
                                        <p>Số tiền tối thiểu để mua crypto trên Nivex là 100,000 VNĐ. Bạn có thể bắt đầu với số tiền nhỏ để làm quen với giao dịch.</p>
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