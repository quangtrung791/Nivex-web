'use client'
import { useState } from 'react'
import styles from './KYCVerification.module.css'

export default function KYCVerification() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleKYC}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h3 className={`heading ${styles.pageTitleHeading}`}>
                                Hướng dẫn <span>xác minh danh tính (KYC)</span> trên Nivex
                            </h3>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={styles.pageHeaderSubtitle}>
                                Để bảo vệ tài sản của bạn và tuân thủ các quy định bảo mật, Nivex yêu cầu người dùng hoàn tất xác minh Danh tính (KYC). Việc này giúp bạn hoàn thành toàn bộ tính năng và dịch vụ trên nền tảng.
                            </p>
                        </div>
                    </div>
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
                                        Mở ứng dụng <span className={styles.highlightGreen}>Nivex</span> trên điện thoại thông minh của bạn để bắt đầu quá trình xác minh KYC.
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
                                        <li>• Truy cập trang web chính thức của <span className={styles.highlightGreen}>Nivex</span>.</li>
                                        <li>• Nhấp nút <span className={styles.highlightGreen}>ĐĂNG KÝ</span> ở góc trên phải.</li>
                                        <li>• Điền đầy đủ thông tin cần thiết (email, mật khẩu, các thông tin cá nhân cơ bản).</li>
                                        <li>• Đọc và đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.</li>
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
                                    <p style={{ fontSize: '14px', marginBottom: '2px', fontWeight: '300' }}>
                                        Sau khi tải lên thông tin, hệ thống sẽ kiểm tra và xử lý hồ sơ của bạn. Thời gian xét duyệt thường trong vòng 24h.
                                    </p>
                                    <p style={{ fontSize: '14px', marginBottom: '2px', fontWeight: '300' }}>
                                        Bạn sẽ nhận được thông báo sau khi duyệt xong.
                                    </p>
                                    <p style={{ fontSize: '14px', marginBottom: '21px', fontWeight: '300' }}>
                                        Sau khi KYC thành công, bạn có thể sử dụng toàn bộ tính năng và dịch vụ trên Nivex.
                                    </p>
                                    <p className={styles.stepDescription}>
                                        <span className={styles.highlightRed}>Lưu ý:</span> trong quá trình Tải lên, đường truyền mạng cần ổn định, tránh tình trạng mạng yếu hoặc không ổn định gây ảnh hưởng KYC. 
                                        Nếu bị từ chối, người dùng <span className={styles.highlightRed}>BẮT BUỘC</span> điền chính xác thông tin cá nhân của mình.
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