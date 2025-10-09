'use client'
import { useState } from 'react'
import styles from './InternalTransfer.module.css'



export default function InternalTransfer() {
    return (
        <>
            {/* Page Title Section */}
            <section className={`page-title ${styles.pageTitleDeposit}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-8">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>
                                Giao dịch <span>P2P</span>
                            </h1>
                        </div>
                        <div className={`col-md-4 ${styles.col4mdCenter}`}>
                             <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Tính năng chuyển khoản nội bộ giúp bạn gửi tiền mã hóa đến người dùng Nivex khác tức thì và hoàn toàn miễn phí.</p>
                        </div>
                    </div>
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
                                    <p className={styles.stepTitle}>1. Từ màn hình chính, vào Tài sản → chọn Rút tiền</p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder1}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder2}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>2. Chọn người bán:</p>
                                    <p className={styles.stepDescription}>
                                    Nhấn <span className={styles.hightlightP2P}>Mua vào</span> để xem danh sách. Bạn cần kiểm tra kỹ giá, phương thức thanh toán, số lượng và giới hạn giao dịch.<br />
                                        (Lưu ý: Giao dịch nhanh tiện lợi nhưng giá có thể không tốt nhất)
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>3. Tạo đơn hàng:</p>
                                    <p className={styles.stepDescription}>
                                    Chọn người bán ưng ý và nhấn <span className={styles.hightlightP2P}>Mua</span>. Sau đó nhập số tiền hoặc số lượng muốn mua. (Dùng nút [↔] để chuyển đổi cách nhập).<br />
                                    Chọn <span className={styles.hightlightP2P}>Phương thức thanh toán</span> → <span className={styles.hightlightP2P}>Xác nhận mua</span>.
                                    </p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder3}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder4}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>4. Nhận Thông Tin:</p>
                                    <p className={styles.stepDescription}>
                                        Hệ thống gửi đơn hàng, người bán sẽ cung cấp thông tin tài khoản nhận tiền.
                                    </p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>5. Thanh Toán:</p>
                                    <p className={styles.stepDescription}>
                                        Bạn dùng ứng dụng ngân hàng hoặc nền tảng khác để chuyển tiền vào tài khoản của người bán.<br />
                                        <span className={styles.hightlightP2P}>Quan trọng: Phải chụp lại ảnh màn hình biên lai thanh toán để làm bằng chứng.</span> 
                                    </p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder5}></div>
                                        <div className={styles.imagePlaceholder + ' ' + styles.imagePlaceholder6}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>6. Xác Nhận Thanh Toán:</p>
                                    <p className={styles.stepDescription}>
                                        Quay lại ứng dụng Nivex, nhấn <span className={styles.hightlightP2P}>Tôi đã thanh toán</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>7. Tải Ảnh Lên:</p>
                                    <p className={styles.stepDescription}>
                                        Tải lên ảnh chụp màn hình biên lai thanh toán vừa lưu → <span className={styles.hightlightP2P}>Xác nhận tải lên</span> → <span className={styles.hightlightP2P}>Xác nhận</span>.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>8. Chờ Giải Phóng Coin:</p>
                                    <p className={styles.stepDescription}>
                                        Gửi ảnh chụp màn hình thanh toán cho người bán qua giao diện trò chuyện nếu cần, sau đó chờ họ kiểm tra và giải phóng coin.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <p className={styles.stepTitle}>9. Kiểm Tra:</p>
                                    <p className={styles.stepDescription}>
                                    Sau khi người bán hoàn tất, USDT sẽ vào tài khoản của bạn. Quay lại trang chủ để kiểm tra Tổng tài sản. Nếu số dư thay đổi, giao dịch đã thành công!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}