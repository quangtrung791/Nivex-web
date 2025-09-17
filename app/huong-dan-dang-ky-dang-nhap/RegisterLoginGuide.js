'use client'
import { useState } from 'react'
import styles from './RegisterLoginGuide.module.css'

export default function RegisterLoginGuide() {
    return (
        <>
            <section className={`page-title ${styles.pageTitleKnowLedge}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h3 className={`heading ${styles.pageTitleHeading}`}>Hướng dẫn <span>đăng ký & đăng nhập</span> Nivex
                            </h3>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Nivex hướng dẫn bạn chi tiết từ đăng ký, xác minh cho đến xử lý sự cố đăng nhập, 
                                kèm theo lưu ý bảo mật để đảm bảo tài khoản của bạn luôn an toàn và thuận tiện.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.guideSection}>
            <div className={`container ${styles.displayFlexContainer}`}>
                {/* <div className="row"> */}
                    <div className={`col-lg-8 ${styles.contentColumn}`}>
                        <div className={styles.guideContent}>
                            
                            {/* Step 1 */}
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>
                                    1. Tạo tài khoản Nivex
                                </h2>
                                <p className={styles.stepSubtitle}>
                                    Chi tiết vài bước đơn giản:
                                </p>
                                <ul className={styles.stepList}>
                                    <li>• Truy cập trang web chính thức của <span className={styles.highlightGreen}>Nivex</span>.</li>
                                    <li>• Nhấp nút <span className={styles.highlightGreen}>ĐĂNG KÝ</span> ở góc trên phải.</li>
                                    <li>• Điền đầy đủ thông tin cần thiết (email, mật khẩu, các thông tin cá nhân cơ bản).</li>
                                    <li>• Đọc và đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.</li>
                                </ul>
                                <p className={styles.stepNote}>
                                    Nhấp <span className={styles.highlightGreen}>TẠO TÀI KHOẢN</span> để hoàn tất.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>
                                    2. Xác minh tài khoản
                                </h2>
                                <p className={styles.stepSubtitle}>
                                    Để đảm bảo an toàn, bạn cần hoàn thành các bước xác minh:
                                </p>
                                <ul className={styles.stepList}>
                                    <li>• Kiểm tra email và nhấp mã xác minh được gửi.</li>
                                    <li>• Xác minh số điện thoại hoặc các bước bổ sung mà hệ thống yêu cầu.</li>
                                </ul>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.step}>
                                <h2 className={styles.stepTitle}>
                                    3. Khi gặp sự cố đăng nhập
                                </h2>
                                <p className={styles.stepSubtitle}>
                                    Nếu <span className={styles.highlightRed}>KHÔNG THỂ ĐĂNG NHẬP</span>, hãy thử:
                                </p>
                                <ul className={styles.stepList}>
                                    <li>• Kiểm tra lại <span className={styles.highlightRed}>tên đăng nhập</span> và <span className={styles.highlightRed}>mật khẩu</span> đã đăng ký.</li>
                                    <li>• Đảm bảo rằng <span className={styles.highlightRed}>Caps Lock</span> đã đặt lại.</li>
                                    <li>• Kiểm tra kết nối mạng.</li>
                                    <li>• Xóa cache, cookies rồi thử lại.</li>
                                    <li>• Nếu tài khoản bị khóa do nhập sai nhiều lần, vui lòng chờ và thử lại sau hoặc liên hệ hỗ trợ.</li>
                                </ul>
                            </div>

                            {/* Support Section */}
                            <div className={styles.supportSection}>
                                <h3 className={styles.supportTitle}>Liên hệ hỗ trợ</h3>
                                <p className={styles.supportText}>
                                    Nếu cần, hãy truy cập trang chính thức của <span className={styles.highlight}>Nivex</span> và chọn{' '}
                                    <span className={styles.highlightGreen}>liên hệ chúng tôi</span> hoặc{' '}
                                    <span className={styles.highlightGreen}>hỗ trợ trực tuyến</span> để được trợ giúp{' '}
                                    <span className={styles.highlight247}>24/7</span>.
                                </p>
                            </div>

                            {/* Security Section */}
                            <div className={styles.securitySection}>
                                <h3 className={styles.securityTitle}>Lưu ý bảo mật</h3>
                                <ul className={styles.securityList}>
                                    <li>• Luôn <span className={styles.highlightGreen}>đăng xuất</span> khi không truy cập vào tài khoản.</li>
                                    <li>• Không chia sẻ thông tin tài khoản, bao gồm mật khẩu.</li>
                                    <li>• Thay đổi mật khẩu định kỳ để tăng cường bảo mật.</li>
                                </ul>
                                
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className={`col-lg-4 ${styles.illustrationColumn}`}>
                        <div className={styles.illustrationWrapper}>
                        </div>
                    </div>
                {/* </div> */}
            </div>
            
            {/* Final Note - Full Width */}
            <div className={styles.finalNoteSection}>
                <p className={styles.finalNote}>
                    Nivex cam kết mang đến cho bạn trải nghiệm giao dịch an toàn, bảo mật và thuận tiện.
                </p>
            </div>
        </section>
        </>
    )
}