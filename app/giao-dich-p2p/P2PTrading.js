'use client'
import { useState } from 'react'
import styles from './P2PTrading.module.css'



export default function P2PTrading() {
    const [openFaq, setOpenFaq] = useState({})

    const toggleFaq = (index) => {
        setOpenFaq(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
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
                             <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Hướng dẫn chi tiết giúp bạn rút tiền từ Nivex nhanh chóng,
                             an toàn và thuận tiện.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deposit Steps Section */}
            <section className={styles.depositSection}>
                <div className="container">
                    <h2 className={`${styles.depositSectionTitle}`}>
                            Giao dịch P2P là gì?
                    </h2>
                    {/* Step 1 */}
                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
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
                                    <h3 className={styles.stepTitle}>2. Truy cập mục “Tài sản” trên trang chủ</h3>
                                    <p className={styles.stepDescription}>
                                        Trên trang tài khoản của bạn, chọn <span className={styles.highlightGreen}>[Rút tiền]</span>.
                                    </p>
                                    <div className={styles.displayFlexForStepDescription}>
                                        <div className={styles.imagePlaceholder1}></div>
                                        <div className={styles.imagePlaceholder2}></div>
                                        <div className={styles.imagePlaceholder3}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>3. Chọn loại coin muốn rút</h3>
                                    <p className={styles.stepDescription}>
                                        Lựa chọn loại tiền mã hóa bạn muốn rút.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>4. Nhập địa chỉ Rút tiền</h3>
                                    <p className={styles.stepDescription}>
                                        Nhập địa chỉ ví của bạn. Vui lòng đảm bảo địa chỉ chính xác tuyệt đối.
                                    </p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>5. Xác nhận số tiền rút</h3>
                                    <p className={styles.stepDescription}>
                                        Nhập số tiền bạn muốn rút và xác nhận.
                                    </p>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>6. Thanh toán phí mạng lưới</h3>
                                    <p className={styles.stepDescription}>
                                        Tùy thuộc vào tình trạng mạng lưới, bạn có thể cần thanh toán một khoản phí mạng lưới nhất định.
                                    </p>
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>7. Gửi yêu cầu rút tiền</h3>
                                    <p className={styles.stepDescription}>
                                        Sau khi mạng lưới xác nhận giao dịch, tiền sẽ tự động hiển thị trong tài khoản Nivex của bạn.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>8.  Chờ xử lý</h3>
                                    <p className={styles.stepDescription}>
                                        Yêu cầu của bạn sẽ được Nivex xử lý trong thời gian sớm nhất.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>9.  Theo dõi giao dịch</h3>
                                    <p className={styles.stepDescription}>
                                        Bạn có thể theo dõi giao dịch trên Blockchain Explorer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.faqSection}>
                <div className="container">
                    <h2 className={styles.faqTitle}>Câu hỏi thường gặp</h2>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion} onClick={() => toggleFaq(0)}>
                                <span>Rút tiền mất bao lâu?</span>
                                <span className={`${styles.faqIcon} ${openFaq[0] ? styles.faqIconOpen : ''}`}></span>
                            </div>
                            <div className={`${styles.faqAnswer} ${openFaq[0] ? styles.faqAnswerOpen : ''}`}>
                                <p>Thời gian rút tiền phụ thuộc vào loại tiền tệ và phương thức rút. Rút tiền mã hóa thường nhanh hơn, trong khi rút tiền pháp định có thể cần thời gian xử lý lâu hơn.</p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                <span>Tôi có thể hủy lệnh rút tiền không?</span>
                                <span className={`${styles.faqIcon} ${openFaq[1] ? styles.faqIconOpen : ''}`}></span>
                            </div>
                            <div className={`${styles.faqAnswer} ${openFaq[1] ? styles.faqAnswerOpen : ''}`}>
                                <p>Một khi yêu cầu rút tiền đã được xử lý, thông thường sẽ không thể hủy. Nếu cần hỗ trợ, vui lòng liên hệ đội ngũ Hỗ trợ Khách hàng (CSKH) của chúng tôi ngay lập tức.</p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                <span>Phải làm gì khi rút tiền thất bại?</span>
                                <span className={`${styles.faqIcon} ${openFaq[2] ? styles.faqIconOpen : ''}`}></span>
                            </div>
                            <div className={`${styles.faqAnswer} ${openFaq[2] ? styles.faqAnswerOpen : ''}`}>
                                <p>Nếu rút tiền thất bại, nguyên nhân có thể do sai địa chỉ, sự cố mạng lưới hoặc vượt quá hạn mức. Vui lòng kiểm tra lại thông tin rút tiền và liên hệ CSKH.</p>
                            </div>
                        </div>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion} onClick={() => toggleFaq(3)}>
                                <span>Làm thế nào để đảm bảo an toàn khi rút tiền?</span>
                                <span className={`${styles.faqIcon} ${openFaq[3] ? styles.faqIconOpen : ''}`}></span>
                            </div>
                            <div className={`${styles.faqAnswer} ${openFaq[3] ? styles.faqAnswerOpen : ''}`}>
                                Hãy chắc chắn rằng bạn đang sử dụng đúng địa chỉ ví và ví của bạn được bảo mật. Không chia sẻ khóa riêng tư (private key) hoặc mật khẩu của bạn với bất kỳ ai.
                            </div>
                        </div>
                    </div>
                </div>
            </section>  

            <section className={styles.depositSection}>
                <div className="container">
                    <h2 className={`${styles.faqTitle}`} style={{marginBottom: '8px' }}>
                                Phí và hạn mức
                    </h2>
                    <p className={styles.subTitleFeeSection}>Giải thích về phí nạp và rút tiền</p>
                    {/* Step 1 */}
                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Nạp tiền mã hóa</h3>
                                    <p className={styles.stepDescription}>
                                        Hãy chắc chắn rằng bạn đang sử dụng đúng địa chỉ ví và ví của bạn được bảo mật. Không chia sẻ khóa riêng tư (private key) hoặc mật khẩu với bất kỳ ai.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Nạp tiền pháp định</h3>
                                    <p className={styles.stepDescription}>
                                       Nạp tiền pháp định có thể phát sinh phí, tùy thuộc vào phương thức nạp và tổ chức tài chính bạn sử dụng. Ví dụ, nạp tiền qua chuyển khoản ngân hàng hoặc dịch vụ thanh toán của bên thứ ba có thể mất một khoản phí nhất định.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Rút tiền mã hóa</h3>
                                    <p className={styles.stepDescription}>
                                        Khi rút tiền mã hóa, bạn cần thanh toán phí giao dịch mạng lưới. Đây là khoản phí do mạng lưới blockchain thu để xác nhận và xử lý giao dịch.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Rút tiền pháp định</h3>
                                    <p className={styles.stepDescription}>
                                        Rút tiền về tài khoản ngân hàng có thể phát sinh phí và có thể bị giới hạn bởi hạn mức rút hàng ngày hoặc hàng tháng.
                                    </p>
                                </div>
                            </div>

                         
                        </div>
                    </div>
                </div>
            </section> 

            <section className={styles.depositSection}>
                <div className="container">
                    <h2 className={`${styles.faqTitle}`} style={{marginBottom: '8px' }}>
                                Chi tiết hạn mức hàng ngày
                    </h2>
                    <p className={styles.subTitleFeeSection}>Hạn mức rút tiền mã hóa</p>
                    {/* Step 1 */}
                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Hạn mức rút hàng ngày có thể khác nhau tùy theo loại coin và điều kiện mạng lưới.</h3>
                                    <p className={styles.stepDescription}>
                                        Ví dụ: mạng lưới Bitcoin trong thời gian tắc nghẽn có thể yêu cầu phí giao dịch cao hơn để đảm bảo giao dịch được xác nhận.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Nạp tiền pháp định</h3>
                                    <p className={styles.stepDescription}>
                                       Nạp tiền pháp định có thể phát sinh phí, tùy thuộc vào phương thức nạp và tổ chức tài chính bạn sử dụng. Ví dụ, nạp tiền qua chuyển khoản ngân hàng hoặc dịch vụ thanh toán của bên thứ ba có thể mất một khoản phí nhất định.
                                    </p>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </div>
            </section> 


            <section className={styles.depositSection}>
                <div className="container">
                    <h2 className={`${styles.faqTitle}`} style={{marginBottom: '8px' }}>
                               Xử lý khi rút tiền chưa về tài khoản
                    </h2>
                    <p className={styles.subTitleFeeSection}>Nếu tiền rút của bạn chưa về tài khoản trong thời gian dự kiến, vui lòng kiểm tra các nguyên nhân sau:</p>
                    {/* Step 1 */}
                    <div className={`${styles.displayFlexContainer}`}>
                        <div className={`${styles.contentColumn}`}>
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Xác nhận địa chỉ chính xác</h3>
                                    <p className={styles.stepDescription}>
                                        Vui lòng kiểm tra kỹ và đảm bảo bạn đã dán đúng địa chỉ ví người nhận.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Nghẽn mạng lưới</h3>
                                    <p className={styles.stepDescription}>
                                       Trong thời gian mạng lưới tắc nghẽn, việc rút tiền có thể mất nhiều thời gian hơn để được xác nhận.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.stepContainer}>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>Vấn đề về hạn mức</h3>
                                    <p className={styles.stepDescription}>
                                       Kiểm tra xem bạn có vượt quá hạn mức rút tiền hàng ngày/hàng tháng không.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            
            <section className={styles.depositSection} style={{marginBottom: '70px' }}>
                <div className="container">
                    <h2 className={`${styles.faqTitle}`} style={{marginBottom: '8px' }}>
                               Hỗ trợ trực tuyến
                    </h2>
                    <p className={styles.subTitleFeeSection}>Truy cập trang web chính thức của Nivex, nhấp vào nút “Liên hệ chúng tôi” hoặc “Hỗ trợ trực tuyến” ở cuối trang.
Nivex cam kết mang đến cho bạn trải nghiệm giao dịch tài sản số an toàn, nhanh chóng và tiện lợi.</p>
                </div>
            </section> 
        </>
    )
}