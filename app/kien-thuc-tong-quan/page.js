'use client'
import Layout from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import styles from './knowledge.module.css'

export default function Knowledge() {
    useEffect(() => {
        document.title = "Kiến thức tổng quan"
    }, []);

    const [activeCategory, setActiveCategory] = useState('blockchain')
    const [activeDifficulty, setActiveDifficulty] = useState('easy')
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

    const categories = [
        { id: 'blockchain', label: 'Blockchain' },
        { id: 'defi', label: 'DeFi' },
        { id: 'copytrade', label: 'Copy Trade' },
        { id: 'ai', label: 'AI' }
    ]

    const difficulties = [
        { id: 'easy', label: 'Người mới', color: 'blue' },
        { id: 'intermediate', label: 'Trung cấp', color: 'orange' },
        { id: 'advanced', label: 'Nâng cao', color: 'purple' }
    ]

    const knowledgeArticles = [
        {
            id: 1,
            title: "Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "5 phút đọc",
            publishDate: "2025-09-10"
        },
        {
            id: 25,
            title: "Xu hướng DeFi 2025: Những điều cần biết về tài chính phi tập trung",
            category: "defi",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "5 phút đọc",
            publishDate: "2025-09-16"
        },
        {
            id: 26,
            title: "AI Copy Trading: Cách trí tuệ nhân tạo thay đổi giao dịch crypto",
            category: "ai",
            difficulty: "intermediate",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "AI Trading",
            readTime: "8 phút đọc",
            publishDate: "2025-09-15"
        },
        {
            id: 27,
            title: "Hướng dẫn sử dụng MetaMask: Ví crypto an toàn cho người mới",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "6 phút đọc",
            publishDate: "2025-09-14"
        },
        {
            id: 28,
            title: "Staking ETH 2.0: Cơ hội đầu tư với lợi nhuận ổn định",
            category: "defi",
            difficulty: "intermediate",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "10 phút đọc",
            publishDate: "2025-09-13"
        },
        {
            id: 2,
            title: "Cách thức hoạt động của Smart Contract trên Ethereum",
            category: "blockchain",
            difficulty: "intermediate",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "8 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 3,
            title: "Consensus Algorithm: Proof of Work vs Proof of Stake",
            category: "blockchain",
            difficulty: "advanced",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "12 phút đọc",
            publishDate: "2025-09-05"
        },
        {
            id: 4,
            title: "Tìm hiểu về Bitcoin và cơ chế hoạt động",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "6 phút đọc",
            publishDate: "2025-09-03"
        },
        {
            id: 5,
            title: "Ethereum 2.0 và tương lai của blockchain",
            category: "blockchain",
            difficulty: "intermediate",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "10 phút đọc",
            publishDate: "2025-09-01"
        },
        {
            id: 6,
            title: "Phân tích Layer 2 Solutions cho Ethereum",
            category: "blockchain",
            difficulty: "advanced",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "15 phút đọc",
            publishDate: "2025-08-28"
        },
        {
            id: 7,
            title: "DeFi là gì? Tài chính phi tập trung và cơ hội đầu tư",
            category: "defi",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "6 phút đọc",
            publishDate: "2025-09-01"
        },
        {
            id: 8,
            title: "Yield Farming và Liquidity Mining: Hướng dẫn chi tiết",
            category: "defi",
            difficulty: "intermediate",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "10 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 9,
            title: "Automated Market Makers (AMM) hoạt động như thế nào?",
            category: "defi",
            difficulty: "advanced",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "12 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 10,
            title: "Lending và Borrowing trong DeFi",
            category: "defi",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "DeFi",
            readTime: "7 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 11,
            title: "Staking rewards và cách tối ưu hóa lợi nhuận",
            category: "defi",
            difficulty: "intermediate",
            image: "/assets/images/background/Alpha10.webp",
            description: "DeFi",
            readTime: "9 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 12,
            title: "Rủi ro Impermanent Loss trong Liquidity Providing",
            category: "defi",
            difficulty: "advanced",
            image: "/assets/images/background/astrabit-Pica.webp",
            description: "DeFi",
            readTime: "14 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 13,
            title: "Copy Trading: Sao chép giao dịch từ trader chuyên nghiệp",
            category: "copytrade",
            difficulty: "easy",
            image: "/assets/images/blog/blog-01.jpg",
            description: "Copy Trade",
            readTime: "7 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 14,
            title: "Phân tích rủi ro khi tham gia Copy Trading",
            category: "copytrade",
            difficulty: "intermediate",
            image: "/assets/images/blog/blog-02.jpg",
            description: "Copy Trade",
            readTime: "9 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 15,
            title: "Cách chọn trader phù hợp để copy",
            category: "copytrade",
            difficulty: "easy",
            image: "/assets/images/blog/blog-03.jpg",
            description: "Copy Trade",
            readTime: "8 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 16,
            title: "Quản lý vốn hiệu quả trong Copy Trading",
            category: "copytrade",
            difficulty: "intermediate",
            image: "/assets/images/background/AI_Trade.webp",
            description: "Copy Trade",
            readTime: "11 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 17,
            title: "Social Trading và cộng đồng trader",
            category: "copytrade",
            difficulty: "easy",
            image: "/assets/images/background/Alpha10.webp",
            description: "Copy Trade",
            readTime: "6 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 18,
            title: "Phân tích performance của các trader hàng đầu",
            category: "copytrade",
            difficulty: "advanced",
            image: "/assets/images/background/astrabit-Pica.webp",
            description: "Copy Trade",
            readTime: "13 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 19,
            title: "AI trong Trading: Ứng dụng trí tuệ nhân tạo vào giao dịch",
            category: "ai",
            difficulty: "intermediate",
            image: "/assets/images/blog/blog-01.jpg",
            description: "AI Trading",
            readTime: "11 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 20,
            title: "Machine Learning cho dự đoán giá cryptocurrency",
            category: "ai",
            difficulty: "advanced",
            image: "/assets/images/blog/blog-02.jpg",
            description: "AI Trading",
            readTime: "15 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 21,
            title: "Trading Bot và tự động hóa giao dịch",
            category: "ai",
            difficulty: "easy",
            image: "/assets/images/blog/blog-03.jpg",
            description: "AI Trading",
            readTime: "8 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 22,
            title: "Sentiment Analysis trong crypto trading",
            category: "ai",
            difficulty: "intermediate",
            image: "/assets/images/background/AI_Trade.webp",
            description: "AI Trading",
            readTime: "12 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 23,
            title: "Neural Networks ứng dụng trong phân tích kỹ thuật",
            category: "ai",
            difficulty: "advanced",
            image: "/assets/images/background/Alpha10.webp",
            description: "AI Trading",
            readTime: "16 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 24,
            title: "Algorithmic Trading strategies với AI",
            category: "ai",
            difficulty: "advanced",
            image: "/assets/images/background/astrabit-Pica.webp",
            description: "AI Trading",
            readTime: "14 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 29,
            title: "Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "14 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 30,
            title: "Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "14 phút đọc",
            publishDate: "2025-09-08"
        },
        {
            id: 31,
            title: "Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao",
            category: "blockchain",
            difficulty: "easy",
            image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
            description: "Blockchain",
            readTime: "14 phút đọc",
            publishDate: "2025-09-08"
        }
    ]

    const filteredArticles = knowledgeArticles.filter(article => {
        const categoryMatch = article.category === activeCategory
        const difficultyMatch = article.difficulty === activeDifficulty
        return categoryMatch && difficultyMatch
    }).slice(0, 6)

    const filteredArticlesNewest = knowledgeArticles
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)) // Sắp xếp theo ngày mới nhất
        .slice(0, 3) // Lấy 3 bài mới nhất

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'blue'
            case 'intermediate': return 'orange'
            case 'advanced': return 'purple'
            default: return 'blue'
        }
    }

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'Người mới'
            case 'intermediate': return 'Trung cấp'
            case 'advanced': return 'Nâng cao'
            default: return 'Người mới'
        }
    }
    // const [thumbsSwiper, setThumbsSwiper] = useState(null)

    // // Swiper options for the main slider
    // const mainSwiperOptions = {
    //     spaceBetween: 10,
    //     thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
    //     modules: [FreeMode, Navigation, Thumbs],
    // }

    // // Swiper options for the thumbnail slider
    // const thumbnailSwiperOptions = {
    //     modules: [FreeMode, Navigation, Thumbs],
    //     spaceBetween: 10,
    //     slidesPerView: 3,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    // }
    return (
        <Layout headerStyle={1} footerStyle={2}>
            <section className={`page-title ${styles.pageTitleKnowLedge}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h3 className={`heading ${styles.pageTitleHeading}`}><span>KIẾN THỨC</span> TỔNG QUAN
                            </h3>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Trang bị nền tảng cơ bản để tự tin bước vào thế giới blockchain và tài sản số</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.knowledgeSection}>
                <div className="container">
                    {/* Header */}

                    {/* Category Filters */}
                    <div className={styles.filterSection}>
                        <div className={styles.categoryFilter}>
                            <span className={styles.filterLabel}>Chủ đề</span>
                            
                            {/* Mobile dropdown */}
                            <div className={styles.mobileDropdown}>
                                <div 
                                    className={styles.mobileDropdownInnerFlex}
                                    onClick={() => setIsCategoryDropdownOpen((v) => !v)}
                                >
                                    <button
                                        type="button"
                                        className={styles.dropdownToggle}
                                        aria-expanded={isCategoryDropdownOpen}
                                        aria-haspopup="listbox"
                                    >
                                        {categories.find((c) => c.id === activeCategory)?.label || 'Chủ đề'}
                                    </button>
                                    <span className={`${styles.dropdownIcon} ${isCategoryDropdownOpen ? styles.open : ''}`}>
                                    </span>
                                </div>
                                <ul className={`${styles.dropdownMenu} ${isCategoryDropdownOpen ? styles.open : ''}`} role="listbox">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            role="option"
                                            aria-selected={activeCategory === category.id}
                                            className={`${styles.categoryMenuItem} ${activeCategory === category.id ? styles.active : ''}`}
                                            onClick={() => {
                                                setActiveCategory(category.id)
                                                setIsCategoryDropdownOpen(false)
                                            }}
                                        >
                                            {category.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Desktop tabs */}
                            <div className={`${styles.categoryTabs} ${styles.desktopTabs}`}>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.difficultyFilter}>
                            <span className={styles.filterLabel}>Độ khó</span>
                            <div className={styles.difficultyTabs}>
                                {difficulties.map(difficulty => (
                                    <button
                                        key={difficulty.id}
                                        className={`${styles.difficultyTab} ${styles[difficulty.color]} ${activeDifficulty === difficulty.id ? styles.active : ''}`}
                                        onClick={() => setActiveDifficulty(difficulty.id)}
                                    >
                                        {difficulty.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={styles.contentSection}>
                        <h3 className={styles.sectionTitle}>Được xem nhiều</h3>
                        
                        <div className={styles.articlesGrid}>
                            {filteredArticles.map(article => (
                                <div key={article.id} className={styles.articleCard}>
                                    <div className={styles.cardImage}>
                                        <img src={article.image} alt={article.title} />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardMeta}>
                                            <span className={`${styles.badge} ${styles[getDifficultyColor(article.difficulty)]}`}>
                                                {getDifficultyLabel(article.difficulty)}
                                            </span>
                                            <span className={styles.cardCategory}>{article.description}</span>

                                            {/* <span className={styles.readTime}>{article.readTime}</span> */}
                                        </div>
                                        <h4 className={styles.cardTitle}>{article.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.loadMoreSection}>
                            <button className={styles.loadMoreBtn}>
                                Xem thêm
                            </button>
                        </div>
                    </div>

                    <div className={styles.contentSection} style={{marginTop: '70px'}}>
                        <h3 className={styles.sectionTitle}>MỚI NHẤT</h3>
                        
                        <div className={styles.articlesGrid}>
                            {filteredArticlesNewest.map(article => (
                                <div key={article.id} className={styles.articleCard}>
                                    <div className={styles.cardImage}>
                                        <img src={article.image} alt={article.title} />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardMeta}>
                                            <span className={`${styles.badge} ${styles[getDifficultyColor(article.difficulty)]}`}>
                                                {getDifficultyLabel(article.difficulty)}
                                            </span>
                                            <span className={styles.cardCategory}>{article.description}</span>

                                            {/* <span className={styles.readTime}>{article.readTime}</span> */}
                                        </div>
                                        <h4 className={styles.cardTitle}>{article.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.loadMoreSection}>
                            <button className={styles.loadMoreBtn}>
                                Xem thêm
                            </button>
                        </div>
                    </div>

                </div>

                
            </section>
             <section className="crypto-learning-section propose-section">
                <div className="container">
                    <div className="row">
                            <div className="crypto-content propose">
                                <h2 className='title-propose'>Thuật ngữ đề xuất</h2>
                                
                                <div className="crypto-cards">
                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button"> */}
                                            {/* </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4 className='title-propose-card'>ZL-SNARKS</h4>
                                                <p className='text-propose-card'>ZK-SNARKS (viết tắt của Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) là một dạng chứng minh mật mã. Đó là một dạng chứng minh mật mã cho phép một bên truy cập thông tin mà không tiết lộ cách hoặc loại thông tin đã được truy cập.
ZK-SNARKS được thực hiện bằng cách tạo ra một khóa riêng tư hoặc bí mật trước khi một giao dịch mật mã diễn ra. Giao thức mật mã Z-cash sử dụng loại chứng minh mật mã này. Loại chứng minh mật mã này đã được giới thiệu lần đầu trong những năm 1980 như một phương pháp mã hóa.</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose" >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date"  >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button">
                                            </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4  className='title-propose-card'>Demo Trading</h4>
                                                <p className='text-propose-card'>Giao dịch thử nghiệm là gì?Giao dịch thử nghiệm (demo trading) đề cập đến một hình thức giao dịch mô phỏng cho phép bạn thử giao dịch tiền mã hóa bằng</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose" >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date"  >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="crypto-card crypto-card-propose">
                                        <div className="card-content">
                                            {/* <div className="play-button">
                                            </div> */}
                                            <div className="card-info card-info-propose">
                                                <div className="quotation-mark-propose"></div>
                                                <h4 className='title-propose-card'>Token</h4>
                                                <p className='text-propose-card'>Trong ngữ cảnh giao dịch, một token là một đơn vị giá trị đại diện cho một tài sản hoặc tiện ích cụ thể. Các token thường được tạo và quản lý bằng công nghệ blockchain, một hệ thống sổ cái kỹ thuật số phi tập trung và an toàn.</p>
                                                <div className="card-meta card-meta-propose">
                                                    <a className="author card-button-propose"  >Định nghĩa đầy đủ<i className="icon-button-propose"></i></a>
                                                    {/* <span className="date" >7/9/2025</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-crypto-card-learning btn-action">Xem thêm</button>
                            </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}