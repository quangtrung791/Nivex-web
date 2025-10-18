'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './TwoFactorAuthentication.module.css'



export default function TwoFactorAuthentication() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleDeposit}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>
                                <span>Xác thực</span> 2 lớp (2FA)
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col4mdCenter}`}>
                             <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Giúp tăng cường bảo mật tài khoản của bạn, tránh bị chặn SMS hoặc mất mã qua email do lỗi mạng.gười dùng Nivex khác tức thì và hoàn toàn miễn phí.</p>
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
                        <span className={styles.current}>Xác thực 2 lớp (2FA)</span>
                    </nav>
                </div>
            </section>

            {/* Deposit Steps Section */}
            <section className={styles.depositSection + ' ' + styles.withdrawSectionImageAfter}>
                <div className="container">
                    <h2 className={`${styles.depositSectionTitle}`}>
                        Cách liên kết <span>Google Authenticator</span> với Nivex
                    </h2>

                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>1. Mở và đăng nhập vào ứng dụng Nivex. Nhấn vào <span className={styles.hightlightP2P}>ảnh đại diện (avatar)</span> ở góc trên bên trái để vào <span className={styles.hightlightP2P}>Trung tâm cá nhân</span>, sau đó chọn <span className={styles.hightlightP2P}>Bảo mật</span>.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>2. Trong trang <span className={styles.hightlightP2P}>Bảo mật</span>, tìm và chọn <span className={styles.hightlightP2P}>Google Authenticator</span>.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>3. Chọn <span className={styles.hightlightP2P}>Xác thực qua email/điện thoại</span>. Nhấn vào <span className={styles.hightlightP2P}>Lấy mã xác thực</span>, sau đó nhập mã bạn nhận được vào ô và chọn <span className={styles.hightlightP2P}>Xác nhận</span>.</p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder1}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder2}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder3}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>4. Hãy sao chép <span className={styles.hightlightP2P}>Khóa thiết lập</span> gồm 16 ký tự do Nivex cung cấp.</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>5. Trên trang chi tiết tài khoản của ứng dụng <span className={styles.hightlightP2P}>Google Authenticator</span>, điền <span className={styles.hightlightP2P}>NIVEX</span> vào tên mã để dễ tìm kiếm. 
                                        Trong ô Khóa của bạn, dán khóa 16 ký tự vừa sao chép, sau đó chọn <span className={styles.hightlightP2P}>Thêm</span>, sau đó ứng dụng sẽ hiển thị mã xác thực 6 số.</p>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>6. Quay lại ứng dụng Nivex, nhập mã xác thực 6 số từ ứng dụng Google Authenticator vào ô <span className={styles.hightlightP2P}>Xác thực Google</span> và chọn <span className={styles.hightlightP2P}>Xác nhận</span>.</p>
                                    <div className={styles.displayFlexForStepDescription}>  
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder1}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder2}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder3}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>7. Sau khi xác minh thành công, nút Xác thực Google sẽ được bật <span className={styles.hightlightP2P}>mặc định</span>, giúp tăng cường hơn nữa tính bảo mật cho tài khoản của bạn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}