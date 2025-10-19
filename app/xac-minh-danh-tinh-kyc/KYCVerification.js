'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './KYCVerification.module.css'

export default function KYCVerification() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleKYC}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>
                                Xác minh <span className={styles.highlightGreen}>danh tính</span> (KYC) 
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={styles.pageHeaderSubtitle}>
                                Nivex yêu cầu xác minh Danh tính (KYC) để bảo vệ tài sản của bạn, tuân thủ quy định bảo mật và mở khóa các tính năng giao dịch cơ bản.
                            </p>
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
                        <span className={styles.current}>Xác minh danh tính KYC</span>
                    </nav>
                </div>
            </section>

            {/* KYC Steps Section */}
            <section className={styles.kycSection}>
                <div className="container">
                    
                    {/* Step 1 */}
                    <div className={styles.stepContainer}>
                        <div className={styles.displayFlexContainer}>
                            <div className={`col-lg-6 ${styles.contentColumn}`}>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepHeader}>
                                        <h2 className={styles.stepTitle}>
                                            <span>BƯỚC</span> <span>01</span>
                                        </h2>
                                    </div>
                                    <p className={styles.stepDescription}>
                                        Mở ứng dụng <span className={styles.highlightGreen} style={{textDecoration: 'underline'}}>Nivex</span> trên điện thoại thông minh của bạn để bắt đầu quá trình xác minh KYC.
                                    </p>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.imageColumn}`}>
                                <div className={styles.phoneContainer}>
                                    <div className={styles.phoneFrame}>
                                        <img src="https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483938_2x.webp" alt="Step 1 - Mở ứng dụng" className={styles.phoneImage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={styles.stepContainer}>
                        <div className={styles.displayFlexContainer}>
                            <div className={`col-lg-6 ${styles.contentColumn}`}>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepHeader}>
                                        <h2 className={styles.stepTitle}>
                                            <span>BƯỚC</span> <span>02</span>
                                        </h2>
                                    </div>
                                    <p className={styles.stepDescription}>
                                        Chọn mục <span className={styles.highlightGreen}>[Xác minh danh tính]</span>, nhấp <span className={styles.highlightGreen}>[Bắt đầu xác thực]</span>.
                                    </p>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.imageColumn}`}>
                                <div className={styles.phoneContainer}>
                                    <div className={styles.phoneFrame}>
                                        <img src="https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483938.webp" alt="Step 1 - Mở ứng dụng" className={styles.phoneImage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={styles.stepContainer}>
                        <div className={styles.displayFlexContainer}>
                            <div className={`col-lg-6 ${styles.contentColumn}`}>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepHeader}>
                                        <h2 className={styles.stepTitle}>
                                            <span>BƯỚC</span> <span>03</span>
                                        </h2>
                                    </div>
                                    <p className={styles.stepDescription}>
                                        Vào trang chi tiết của <span className={styles.highlightGreen}>[Xác minh danh tính]</span>. Chuẩn bị giấy tờ và điền thông tin. Bạn cần cung cấp các thông tin sau kèm giấy tờ tùy chọn:
                                    </p>
                                    <ul className={styles.stepList}>
                                        <li>• Họ tên.</li>
                                        <li>• Quốc gia cư trú</li>
                                        <li>• Loại giấy tờ (CCCD, Hộ chiếu)</li>
                                        <li>• Số giấy tờ</li>
                                        <li>• Ảnh chụp rõ nét 2 mặt giấy tờ.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.imageColumn}`}>
                                <div className={styles.phoneContainer}>
                                    <div className={styles.phoneFrame}>
                                        <img src="https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483938_333.webp" alt="Step 1 - Mở ứng dụng" className={styles.phoneImage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Step 4 */}
                     <div className={styles.stepContainer}>
                        <div className={styles.displayFlexContainer}>
                            <div className={`${styles.contentColumn}`}>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepHeader}>
                                        <h2 className={styles.stepTitle}>
                                            <span>BƯỚC</span> <span>04</span>
                                        </h2>
                                    </div>
                                    <p className={styles.stepDescription}>
                                        Gửi thông tin.
                                    </p>
                                    <p className={styles.stepDescription}>
                                        Sau khi kiểm tra lại toàn bộ thông tin, nhấn nút <span className={styles.highlightGreen}>[Tải lên]</span> để hoàn tất.
                                    </p>
                                    <p className={styles.stepDescription}>
                                        <span className={styles.highlightRed}>Lưu ý:</span> trong quá trình Tải lên, đường truyền mạng cần ổn định, tránh tình trạng mạng yếu hoặc không ổn định gây ảnh hưởng KYC. 
                                        Nếu bị từ chối, người dùng <span className={styles.highlightRed}>BẮT BUỘC</span> điền chính xác thông tin cá nhân của mình.
                                    </p>
                                </div>
                            </div>
                          
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className={styles.stepContainer}>
                        <div className={styles.displayFlexContainer}>
                            <div className={`${styles.contentColumn}`}>
                                <div className={styles.stepContent}>
                                    <div className={styles.stepHeader}>
                                        <h2 className={styles.stepTitle}>
                                            <span>BƯỚC</span> <span>05</span>
                                        </h2>
                                    </div>
                                    <p className={styles.stepDescription}>
                                        Chờ xét duyệt.
                                    </p>
                                    <p className={styles.stepDescriptionNote}>
                                        Sau khi tải lên thông tin, hệ thống sẽ kiểm tra và xử lý hồ sơ của bạn. Thời gian xét duyệt thường trong vòng 24h.
                                    </p>
                                    <p className={styles.stepDescriptionNote}>
                                        Bạn sẽ nhận được thông báo sau khi duyệt xong.
                                    </p>
                                    <p className={styles.stepDescriptionNote} style={{ marginBottom: '20px' }}>
                                        Sau khi KYC thành công, bạn có thể sử dụng toàn bộ tính năng và dịch vụ trên Nivex.
                                    </p>
                                    <p className={styles.stepDescription} style={{ width: '100%' }}>
                                        Nếu hồ sơ <span className={styles.highlightRed}>Bị từ chối</span>, bạn cần thực hiện lại các bước xác minh theo yêu cầu được đưa ra trong thông báo.
                                    </p>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className={styles.finalNoteSection}>
                    <p className={styles.finalNote}>
                        Chúc bạn xác minh thành công ngay lần đầu và bắt đầu hành trình đầu tư thông minh cùng Nivex!
                    </p>
                    <p className={styles.finalNote}>
                        Nivex chúc bạn giao dịch thành công!
                    </p>
                </div>
            </section>


        </>
    )
}