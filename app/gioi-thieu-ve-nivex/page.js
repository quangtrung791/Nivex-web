'use client'
import { useEffect } from 'react'
import styles from './aboutNivex.module.css'
import Layout from "@/components/layout/Layout"

export default function AboutNivex() {
    useEffect(() => {
        document.title = "Giới thiệu về Nivex"
        document.body.classList.add('show')
    }, [])

    return (
        <Layout headerStyle={1} footerStyle={2}>
            <section className={`page-title ${styles.pageTitleKnowLedge}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h3 className={`heading ${styles.pageTitleHeading}`}>Giới thiệu về <span>Nivex</span>
                            </h3>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Tận dụng công nghệ AI để tự động sao chép chiến lược, tối ưu hóa lợi nhuận và quản lý rủi ro trong thời gian thực.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className={styles.displayFlexHeroContent}>
                        <div className={`col-lg-8 ${styles.heroContentColumn1}`}>
                            <div className={styles.heroContent}>
                                
                                <div className={styles.heroDescription}>
                                    <h2 className={styles.mainHeading}>
                                        <span className={styles.highlight}>SÀN GIAO DỊCH SINH LỜI</span> ĐƯỢC HỖ TRỢ BỞI AI HÀNG ĐẦU THẾ GIỚI
                                    </h2>
                                    <p className={styles.description}>
                                        Sàn giao dịch thông minh và giao ngay tạo lời nhanh được hỗ trợ bởi AI hàng đầu thế giới.
                                        Mở khóa giao dịch tiền điện tử thông minh, tự động thu lợi nhuận lớn trong thị trường.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`col-lg-4 ${styles.heroContentColumn2}`}>
                            <div className={styles.heroImage}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className={styles.visionMissionSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.visionCard}>
                                <h3 className={styles.cardTitle}>TẦM NHÌN</h3>
                                <p className={styles.cardDescription}>
                                    Chúng tôi tận dụng tầm ảnh hưởng toàn cầu và ngành an toàn hàng đầu để trở thành 
                                    đối tác đáng tin cậy với công nghệ trường quốc tế, thúc đẩy 
                                    việc ứng dụng công nghệ blockchain vào thực tiễn.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.missionCard}>
                                <h3 className={styles.cardTitle}>SỨ MỆNH</h3>
                                <p className={styles.cardDescription}>
                                    Chúng tôi cung cấp các giải pháp giao dịch tiền điện tử cho người dùng 
                                    toàn cầu, hỗ trợ tạo ra môi trường phát triển thị trường tiền mã hóa và đem lại 
                                    năng suất lợi nhuận hàng năm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Discovery Section */}
            <section className={styles.productSection}>
                <div className="container">
                    <div className={styles.productHeader}>
                        <h2 className={styles.productTitle}>
                            KHÁM PHÁ <span className={styles.highlight}>SẢN PHẨM NỔI BẬT</span> CỦA NIVEX
                        </h2>
                    </div>
                    
                    <div className={styles.aiStrategySection}>
                        <h3 className={styles.strategyTitle}>AI + CHIẾN LƯỢC</h3>
                        <p className={styles.strategySubtitle}>Quản lý tài sản tối ưu hiện nay</p>
                        
                        <div className={styles.displayFlexHeroContent}>
                            <div className="col-lg-6">
                                <div className={styles.productIcons}>
                                        <div className={styles.productIcon}>
                                            <div />
                                        </div>
                                        <div className={styles.productIcon}>
                                            <div  />
                                        </div>
                                        <div className={styles.productIcon}>
                                            <div />
                                        </div>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.displayFlexPropductStats}`}>
                                <div className={styles.productStats}>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>85-95%</div>
                                        <div className={styles.statLabel}>Tỷ lệ thành công của chiến lược</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>100 triệu - 10 tỷ USD</div>
                                        <div className={styles.statLabel}>Quy mô vốn hiện tại</div>
                                    </div>
                                    <div className={styles.statItem}>
                                        <div className={styles.statValue}>60%-3500%</div>
                                        <div className={styles.statLabel}>Tỷ suất lợi nhuận hàng năm</div>
                                    </div>
                                    
                                </div>
                                <div className={styles.ctaButton}>
                                        <a href="/ai-copy-trade"className={`btn-cta-simple ${styles.learnMoreBtn}`}>Tìm hiểu ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.COFounderSectionContainer}>
                <div className="container">
                    <div className={styles.productHeader}>
                        <h2 className={`${styles.productTitle} ${styles.COFounderSection}`}>
                            <span className={styles.highlight}>Người sáng lập</span> của chúng tôi
                        </h2>
                    </div>
                    
                    <div className={styles.aiStrategySection}>
                        
                        <div className={styles.displayFlexHeroContent}>
                            <div className="col-lg-6">
                                <div className={styles.COFounderImage}>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.displayFlexPropductStats}`}>
                                <div className={`${styles.firstFounderStats}`}>
                                    <div className={styles.statItem}>
                                        <div className={`${styles.statValue} ${styles.COFounderName}`}>SIMON HARDY</div>
                                        <div className={`${styles.COFounderSubtitle}`}>CEO & CO-FOUNDER</div>
                                        <div className={`${styles.statLabel} ${styles.COFounderDescription}`}>Ông tập trung vào việc xây dựng một sàn giao dịch tiền mã hóa thế hệ mới dựa trên trí tuệ nhân tạo (Al), nhằm mang lại cho người dùng toàn cầu trải nghiệm giao dịch thông minh và hiệu quả hơn. Ông không chỉ là người xây dựng trong lĩnh vực Web3, mà còn là nguồn động lực thúc đẩy sự đổi mới cho toàn ngành.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.aiStrategySection + ' ' + styles.secondFounderSection}>
                        
                        <div className={styles.displayFlexHeroContent}>
                            <div className="col-lg-6">
                                <div className={styles.secondFounderImage}>
                                </div>
                            </div>
                            <div className={`col-lg-6 ${styles.displayFlexPropductStats}`}>
                                <div className={styles.secondFounderStats}>
                                    <div className={styles.statItem}>
                                        <div className={`${styles.statValue} ${styles.COFounderName}`}>BECKY</div>
                                        <div className={`${styles.COFounderSubtitle}`}>CMO & CO-FOUNDER</div>
                                        <div className={`${styles.statLabel} ${styles.COFounderDescription}`}>Becky tập trung vào việc nghiên cứu, phát triển và quảng bá các chiến lược giao dịch bằng Al. Bà cam kết tạo ra trải nghiệm giao dịch tài sản kỹ thuật số thông minh hơn, hiệu quả hơn và tự động hơn, thúc đẩy ứng dụng thực tiễn của công nghệ Al trong các kịch bản giao dịch, mang đến cho người dùng các giải pháp giao dịch mang tính tiên phong và bền vững hơn.</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}