'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './InternalTransfer.module.css'



export default function InternalTransfer() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleDeposit}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>
                                Chuyển tiền <span>Nội Bộ</span>
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col4mdCenter}`}>
                             <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <section className={styles.breadcrumbSection}>
                <div className="container">
                    <nav className={styles.breadcrumb}>
                        <Link href="/huong-dan-su-dung-app-nivex">Hướng dẫn sử dụng app Nivex</Link>
                        <span className={styles.separator}>&gt;</span>
                        <span className={styles.current}>Chuyển tiền nội bộ</span>
                    </nav>
                </div>
            </section>

            {/* Deposit Steps Section */}
            <section className={styles.depositSection + ' ' + styles.withdrawSectionImageAfter}>
                <div className="container">
                    <h2 className={`${styles.depositSectionTitle}`}>
                            Cách <span>chuyển tiền nội bộ</span> trên Nivex
                    </h2>

                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>1. Từ màn hình chính, vào <span className={styles.hightlightP2P}>Tài sản</span> → chọn <span className={styles.hightlightP2P}>Rút tiền</span></p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder1}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder2}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>2. Chọn <span className={styles.hightlightP2P}>Chuyển khoản</span> trong nền tảng (vì đây là giao dịch miễn phí) → <span className={styles.hightlightP2P}>Xác nhận</span></p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>3. Chọn loại coin bạn muốn chuyển (ví dụ: USDT)</p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder3}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder4}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>4. Chọn phương thức chuyển (qua <span className={styles.hightlightP2P}>UID</span>, <span className={styles.hightlightP2P}>Email</span>, hoặc <span className={styles.hightlightP2P}>Số điện thoại</span>)</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>5. Nhập <span className={styles.hightlightP2P}>thông tin người nhận</span>, <span className={styles.hightlightP2P}>số tiền muốn chuyển</span>, và kiểm tra lại: phí giao dịch phải là <span className={styles.hightlightP2P}>0 USDT</span>.</p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder5}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder6}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>6. 6. Nhấn <span className={styles.hightlightP2P}>Chuyển tiền ngay</span> để xác nhận → Nhập <span className={styles.hightlightP2P}>Mật khẩu thanh toán</span> để hoàn tất.</p>
                                
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>7. Hệ thống báo <span className={styles.hightlightP2P}>Chuyển tiền thành công</span>. Bạn có thể nhấn <span className={styles.hightlightP2P}>Xem chi tiết</span> để xem lại lịch sử giao dịch.</p>
                                    <p className={styles.stepDescription}>
                                        Sau khi mạng lưới xác nhận giao dịch, tiền sẽ tự động hiển thị trong tài khoản Nivex của bạn.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle} style={{fontStyle: 'italic'}}>Quá trình chuyển tiền nội bộ đã hoàn tất, tiền sẽ được gửi đến người nhận ngay lập tức và không mất phí.</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}