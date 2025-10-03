'use client'
import { useState } from 'react'
import styles from './DepositGuide.module.css'

export default function DepositGuide() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleDeposit}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-8">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>
                                Làm thế nào để <span>nạp tiền mã hóa?</span>
                            </h1>
                        </div>
                        <div className={`col-md-4 ${styles.col4mdCenter}`}>
                             <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Hướng dẫn chi tiết giúp bạn nạp tiền vào Nivex
nhanh chóng, an toàn và thuận tiện.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deposit Steps Section */}
            <section className={styles.depositSection}>
                <div className="container">
                    <h2 className={`${styles.depositSectionTitle} ${styles.depositSectionTitleDesktop}`}>
                                Làm thế nào để <span>nạp tiền mã hóa?</span>
                    </h2>
                    {/* Step 1 */}
                    <div className={`${styles.displayFlexContainer}`}>
                        <h2 className={`${styles.depositSectionTitle} ${styles.depositSectionTitleMobile}`}>
                                Làm thế nào để <span>nạp tiền mã hóa?</span>
                        </h2>
                        <div className={`col-lg-8 ${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>1. Đăng nhập tài khoản</h3>
                                    <p className={styles.stepDescription}>
                                        Đầu tiên, hãy chắc chắn bạn đã đăng nhập vào tài khoản <span className={styles.highlightGreen} style={{ textDecoration: 'underline' }}>Nivex</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>2. Truy cập trang nạp tiền</h3>
                                    <p className={styles.stepDescription}>
                                        Trên trang tài khoản của bạn, tìm tùy chọn <span className={styles.highlightGreen}>[Nạp tiền]</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>3. Chọn loại tiền mã hóa</h3>
                                    <p className={styles.stepDescription}>
                                        Chọn loại tiền mã hóa bạn muốn nạp (Bitcoin, Ethereum, USDT, v.v.).
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>4. Thực hiện giao dịch</h3>
                                    <p className={styles.stepDescription}>
                                        Hệ thống sẽ cung cấp cho bạn một địa chỉ nạp tiền để bạn gửi tài sản vào.
                                    </p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>5. Gửi tiền mã hóa</h3>
                                    <p className={styles.stepDescription}>
                                        Sử dụng ví tiền mã hóa bên ngoài, gửi tiền đến địa chỉ được cung cấp.
                                    </p>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>6. Xác nhận giao dịch</h3>
                                    <p className={styles.stepDescription}>
                                        Xác nhận giao dịch trong ví của bạn và chờ đợi mạng blockchain xác nhận.
                                    </p>
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>7. Tình trạng tài khoản</h3>
                                    <p className={styles.stepDescription}>
                                        Sau khi mạng lưới xác nhận giao dịch, tiền sẽ tự động hiển thị trong tài khoản Nivex của bạn.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`col-lg-4 ${styles.illustrationColumn}`}>
                            <div className={styles.illustrationWrapper}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Troubleshooting Section */}
            <section className={styles.troubleshootingSection}>
                <div className={`container ${styles.displayFlexContainerTroubleshooting}`}>
                    <div className={styles.troubleshootingHeader}>
                        <h2 className={styles.troubleshootingTitle}>
                            Xử lý khi <span>nạp tiền chưa về</span>
                        </h2>
                        <p className={styles.troubleshootingSubtitle}>
                            Nếu tiền nạp của bạn chưa về, các nguyên nhân có thể bao gồm:
                        </p>
                    </div>

                    <div className={styles.troubleshootingGrid}>
                        {/* Option 1 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage1}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>TRỄ MẠNG</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Sự chậm trễ có thể xảy ra do tắc nghẽn mạng blockchain, hãy kiên nhẫn chờ thêm.
                            </p>
                        </div>

                        {/* Option 2 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage2}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>SAI ĐỊA CHỈ</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Vui lòng kiểm tra xem bạn đã gửi đúng địa chỉ nạp được hệ thống cung cấp chưa.
                            </p>
                        </div>

                        {/* Option 3 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage3}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>HẠN MỨC NẠP TỐI THIỂU</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Nếu bạn nạp số tiền nhỏ hơn hạn mức tối thiểu, hệ thống sẽ không xử lý giao dịch.
                            </p>
                        </div>
                    </div>

                    <div className={styles.troubleshootingHeader}>
                        <h3 className={styles.stepTroubleshootingTitle}>
                            Các bước xử lý
                        </h3>
                    </div>

                     <div className={`${styles.troubleshootingGrid2} ${styles.troubleshootingGrid}`}>
                        {/* Option 1 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage4}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>KIỂM TRA TRẠNG THÁI GIAO DỊCH</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Kiểm tra trạng thái giao dịch trên trình khám phá blockchain (blockchain explorer).
                            </p>
                        </div>

                        {/* Option 2 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage5}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>LIÊN HỆ CSKH</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Nếu giao dịch quá lâu vẫn chưa về, vui lòng liên hệ bộ phận CSKH của Nivex để hỗ trợ.
                            </p>
                        </div>

                        {/* Option 3 */}
                        <div className={styles.troubleshootingCard}>
                            <div className={styles.troubleshootingIcon}>
                                <div className={`${styles.iconPlaceholder} ${styles.iconPlaceholderImage6}`}>
                                    
                                </div>
                            </div>
                            <h3 className={styles.troubleshootingCardTitle}>CUNG CẤP THÔNG TIN CHI TIẾT</h3>
                            <p className={styles.troubleshootingCardDesc}>
                                Chuẩn bị sẵn thông tin giao dịch bao gồm: thời gian giao dịch, số tiền, địa chỉ gửi, TXID.
                            </p>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <h4 className={styles.supportTitle}>Liên hệ hỗ trợ</h4>
                    <p className={styles.supportText}>
                        Truy cập trang web chính thức của <span className={styles.highlightGreen} style={{textDecoration: 'underline'}}>Nivex</span>, nhấp vào nút
                        <span className={styles.highlightGreen} style={{textDecoration: 'underline'}}> [Liên hệ chúng tôi]</span> hoặc <span className={styles.highlightGreen} style={{textDecoration: 'underline'}}>[Hỗ trợ trực tuyến]</span> ở cuối trang.
                    </p>
                </div>
            </section>
        </>
    )
}