'use client'
import Layout from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import styles from './knowledge.module.css'

export default function Knowledge() {
    useEffect(() => {
        document.title = "Kiến thức tổng quan"
    }, []);

    const [activeCategory, setActiveCategory] = useState('Blockchain')
    const [activeDifficulty, setActiveDifficulty] = useState('easy')
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [knowledgeArticles, setKnowledgeArticles] = useState([])
    const [newestArticles, setNewestArticles] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Pagination state
    const [viewedOffset, setViewedOffset] = useState(0)
    const [newestOffset, setNewestOffset] = useState(0)
    const [hasMoreViewed, setHasMoreViewed] = useState(false)
    const [hasMoreNewest, setHasMoreNewest] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const difficulties = [
        { id: 'easy', label: 'Người mới', color: 'blue' },
        { id: 'intermediate', label: 'Trung cấp', color: 'orange' },
        { id: 'advanced', label: 'Nâng cao', color: 'purple' }
    ]

    // Fetch categories from database
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories')
            const result = await response.json()
            if (result.success) {
                setCategories(result.data || [])
                // Set default category to first available category
                if (result.data && result.data.length > 0) {
                    setActiveCategory(result.data[0].id)
                }
            }
        } catch (error) {
            setCategories([
                { id: 'Blockchain', label: 'Blockchain' },
                { id: 'DeFi', label: 'DeFi' },
                { id: 'Copy Trade', label: 'Copy Trade' },
                { id: 'AI', label: 'AI' }
            ])
        }
    }

    // Fetch knowledge articles from API
    const fetchKnowledgeArticles = async (resetPagination = true) => {
        try {
            setLoading(true)
            setError(null)
            
            if (resetPagination) {
                setViewedOffset(0)
                setNewestOffset(0)
            }
            
            // Fetch filtered articles for current category and difficulty (for "Được xem nhiều")
            const filteredResponse = await fetch(
                `/api/knowledge?topic=${activeCategory}&difficulty=${activeDifficulty}&limit=6&offset=0`
            )
            const filteredData = await filteredResponse.json()
            
            // Fetch newest articles with same filters (for "Mới nhất")
            const newestResponse = await fetch(
                `/api/knowledge?topic=${activeCategory}&difficulty=${activeDifficulty}&limit=6&offset=0`
            )
            const newestData = await newestResponse.json()
            
            if (filteredData.success && newestData.success) {
                setKnowledgeArticles(filteredData.data || [])
                setNewestArticles(newestData.data || [])
                setHasMoreViewed(filteredData.pagination?.hasMore || false)
                setHasMoreNewest(newestData.pagination?.hasMore || false)
                setViewedOffset(6)
                setNewestOffset(6)
            } else {
                throw new Error('Failed to fetch articles')
            }
        } catch (error) {
            setError('Không thể tải dữ liệu. Vui lòng thử lại sau.')
            // Fallback to empty arrays
            setKnowledgeArticles([])
            setNewestArticles([])
            setHasMoreViewed(false)
            setHasMoreNewest(false)
        } finally {
            setLoading(false)
        }
    }

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories()
    }, [])

    // Fetch data when component mounts or filters change
    useEffect(() => {
        if (activeCategory) { // Only fetch when category is set
            fetchKnowledgeArticles()
        }
    }, [activeCategory, activeDifficulty])

    // Use filtered articles from API instead of local filtering
    const filteredArticles = knowledgeArticles
    const filteredArticlesNewest = newestArticles

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

    // Load more functions
    const loadMoreViewed = async () => {
        try {
            setLoadingMore(true)
            const response = await fetch(
                `/api/knowledge?topic=${activeCategory}&difficulty=${activeDifficulty}&limit=6&offset=${viewedOffset}`
            )
            const data = await response.json()
            
            if (data.success) {
                setKnowledgeArticles(prev => [...prev, ...(data.data || [])])
                setHasMoreViewed(data.pagination?.hasMore || false)
                setViewedOffset(prev => prev + 6)
            }
        } catch (error) {
            console.error('Error loading more articles:', error)
        } finally {
            setLoadingMore(false)
        }
    }

    const loadMoreNewest = async () => {
        try {
            setLoadingMore(true)
            const response = await fetch(
                `/api/knowledge?topic=${activeCategory}&difficulty=${activeDifficulty}&limit=6&offset=${newestOffset}`
            )
            const data = await response.json()
            
            if (data.success) {
                setNewestArticles(prev => [...prev, ...(data.data || [])])
                setHasMoreNewest(data.pagination?.hasMore || false)
                setNewestOffset(prev => prev + 6)
            }
        } catch (error) {
            console.error('Error loading more articles:', error)
        } finally {
            setLoadingMore(false)
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
                            <h1 className={`heading ${styles.pageTitleHeading}`}><span>Kiến thức</span> tổng quan
                            </h1>
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
                        
                        {loading && (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <p>Đang tải dữ liệu...</p>
                            </div>
                        )}
                        
                        {error && (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
                                <p>{error}</p>
                                <button onClick={fetchKnowledgeArticles} className="btn-cta-simple">
                                    Thử lại
                                </button>
                            </div>
                        )}
                        
                        {!loading && !error && (
                            <div className={styles.articlesGrid}>
                                {filteredArticles.length > 0 ? filteredArticles.map(article => (
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
                                            </div>
                                            <h4 className={styles.cardTitle}>{article.title}</h4>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                                        <p>Không có bài viết nào phù hợp với bộ lọc này.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {hasMoreViewed && (
                            <div className={styles.loadMoreSection}>
                                <button 
                                    className={`btn-cta-simple ${styles.loadMoreBtn}`} 
                                    id="loadMoreBtnViewed"
                                    onClick={loadMoreViewed}
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? 'Đang tải...' : 'Xem thêm'}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.contentSection} style={{marginTop: '70px'}}>
                        <h3 className={styles.sectionTitle}>MỚI NHẤT</h3>
                        
                        {!loading && !error && (
                            <div className={styles.articlesGrid}>
                                {filteredArticlesNewest.length > 0 ? filteredArticlesNewest.map(article => (
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
                                            </div>
                                            <h4 className={styles.cardTitle}>{article.title}</h4>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                                        <p>Không có bài viết mới nào.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {hasMoreNewest && (
                            <div className={styles.loadMoreSection}>
                                <button 
                                    className={`btn-cta-simple ${styles.loadMoreBtn}`} 
                                    id="loadMoreBtnNewest"
                                    onClick={loadMoreNewest}
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? 'Đang tải...' : 'Xem thêm'}
                                </button>
                            </div>
                        )}
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