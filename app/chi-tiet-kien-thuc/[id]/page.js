'use client'
import Layout from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import styles from './knowledgeDetail.module.css'

export default function KnowledgeDetail() {
    const params = useParams()
    const [article, setArticle] = useState(null)
    const [latestNews, setLatestNews] = useState([])
    const [popularArticles, setPopularArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [allKnowledgeArticles, setAllKnowledgeArticles] = useState([])

    useEffect(() => {
        if (params.id) {
            fetchArticleDetail()
            fetchLatestNews()
            fetchPopularArticles()
            fetchAllKnowledgeArticles()
        }
    }, [params.id])

    // Fetch all knowledge articles for search
    const fetchAllKnowledgeArticles = async () => {
        try {
            const response = await fetch('/api/knowledge?limit=100')
            const data = await response.json()
            
            if (data.success && data.data) {
                setAllKnowledgeArticles(data.data)
            }
        } catch (error) {
            // console.error('Error fetching all knowledge articles:', error)
        }
    }

    // Search function
    const handleSearch = (term) => {
        setSearchTerm(term)
        if (term.trim() === '') {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        const t = term.toLowerCase()
        const results = allKnowledgeArticles.filter(article =>
            article.title.toLowerCase().includes(t) ||
            (article.topic && article.topic.toLowerCase().includes(t)) ||
            (article.description && article.description.toLowerCase().includes(t))
        )
        setSearchResults(results)
    }

    const fetchArticleDetail = async () => {
        try {
            setLoading(true)
            // Replace with your actual API endpoint
            const response = await fetch(`/api/knowledge/${params.id}`)
            const data = await response.json()
            
            if (data.success) {
                setArticle(data.data)
                document.title = data.data.title || "Chi tiết kiến thức"
            } else {
                throw new Error('Failed to fetch article')
            }
        } catch (error) {
            // console.error('Error fetching article:', error)
            setError('Không thể tải bài viết. Vui lòng thử lại sau.')
            // Fallback data for demo
            setArticle({
                id: params.id,
                title: "Lorem ipsum dolor sit amet consectetur. Nisi semper condimentum varius et.",
                image: "/assets/images/layout/knowledge-detail-hero.jpg",
                content: `Lorem ipsum dolor sit amet consectetur. Sollicitudin ac porttitor eget vitae ipsum vitae ultrices ullamcorper nulla. Fames donec eu dui enim urna amet at. Nullam ornare nisl vitae. Lorem ipsum dolor tris fringilla gravida amet elit ut aliquam. Accumsan vel aliquam tempus diam eget pulvinar montes vulputate. Morbi volutpat semper tincidunt ornare ornare elit arcu mi ultrices. Vulputate nunc hendrerit odio pellentesque fusce aliquam fermentum at. Blandit cursus egestas viverra viverra vitae consequat accumsan leo ultricies. Sapien vulputate ornare enim non in amet faucibus ut.

Facilisis ac morbi in sem rhoncus sit magna odio. Urna non euismod tortor sed. Sagittis id viverra amet eu elementum orci. Vestibulum enim in platea nulla ornare interdum. Id neque leo tempor erat sed. Arcu sed nisl egestas nibh pharetra faucibus ut. Tempus interdum quesque ac senean duis morci. Erat ac rhoncus rhoncus praesent. Tempus vitae nec senectus faucibus non. Tincidunt sed ullamcorper donec justo faucibus sit vestibulum. Laoreet eu leo sem interdum orci ultrices vulputate interdum in. Et iaculis diam ut id mauris id enim. Sit tristique ultricies aliquam egestas dolor placerat et tincidunt.`,
                difficulty: 'easy',
                topic: 'Blockchain',
                description: 'Blockchain cơ bản',
                created_at: new Date().toISOString()
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchLatestNews = async () => {
        try {
            // Fetch latest knowledge articles, excluding current article
            const response = await fetch('/api/knowledge?limit=10')
            const data = await response.json()
            
            if (data.success && data.data && data.data.length > 0) {
                // Filter out current article and take only first 5
                const filteredArticles = data.data
                    .filter(article => article.id !== parseInt(params.id))
                    .slice(0, 5)
                
                if (filteredArticles.length > 0) {
                    const transformedNews = filteredArticles.map(article => ({
                        id: article.id,
                        title: article.title,
                        image: article.image_url || article.image || "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
                        date: formatNewsDate(article.created_at)
                    }))
                    setLatestNews(transformedNews)
                } else {
                    // setFallbackNews()
                }
            } else {
                // No data from API, use fallback
                // setFallbackNews()
            }
        } catch (error) {
            // console.error('Error fetching latest knowledge articles:', error)
            // API error, use fallback
            // setFallbackNews()
        }
    }

    // const setFallbackNews = () => {
    //     setLatestNews([
    //         {
    //             id: 2,
    //             title: "Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao",
    //             image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
    //             date: "1 ngày trước"
    //         },
    //         {
    //             id: 3,
    //             title: "Hướng dẫn sử dụng MetaMask: Ví crypto an toàn cho người mới",
    //             image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
    //             date: "2 ngày trước"
    //         },
    //         {
    //             id: 4,
    //             title: "DeFi là gì? Tài chính phi tập trung và cơ hội đầu tư",
    //             image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
    //             date: "3 ngày trước"
    //         },
    //         {
    //             id: 5,
    //             title: "Copy Trade: Chiến lược đầu tư thông minh cho người mới",
    //             image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
    //             date: "4 ngày trước"
    //         },
    //         {
    //             id: 6,
    //             title: "AI trong Crypto: Ứng dụng trí tuệ nhân tạo trong giao dịch",
    //             image: "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
    //             date: "5 ngày trước"
    //         }
    //     ])
    // }

    const formatNewsDate = (dateString) => {
        if (!dateString) return 'Vừa xong'
        
        const date = new Date(dateString)
        const now = new Date()
        const diffInMs = now - date
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        
        if (diffInHours < 1) return 'Vừa xong'
        if (diffInHours < 24) return `${diffInHours} giờ trước`
        if (diffInDays < 7) return `${diffInDays} ngày trước`
        
        return date.toLocaleDateString('vi-VN')
    }

    const fetchPopularArticles = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/knowledge?limit=3&sort=views')
            const data = await response.json()
            
            if (data.success) {
                setPopularArticles(data.data || [])
            }
        } catch (error) {
            // Fallback data
            setPopularArticles([
                {
                    id: 1,
                    title: "Lorem ipsum dolor sit amet consectetur. Dui et convallis hac...",
                    image: "/assets/images/layout/knowledge-card.jpg"
                },
                {
                    id: 2,
                    title: "Lorem ipsum dolor sit amet consectetur. Dui et convallis hac...",
                    image: "/assets/images/layout/knowledge-card.jpg"
                },
                {
                    id: 3,
                    title: "Lorem ipsum dolor sit amet consectetur. Dui et convallis hac...",
                    image: "/assets/images/layout/knowledge-card.jpg"
                }
            ])
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

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'blue'
            case 'intermediate': return 'orange'
            case 'advanced': return 'purple'
            default: return 'blue'
        }
    }

    if (loading) {
        return (
            <Layout headerStyle={1} footerStyle={2}>
                <div className={styles.loadingContainer}>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </Layout>
        )
    }

    if (error || !article) {
        return (
            <Layout headerStyle={1} footerStyle={2}>
                <div className={styles.errorContainer}>
                    <p>{error || 'Không tìm thấy bài viết'}</p>
                    <Link href="/kien-thuc-tong-quan" className="btn-cta-simple">
                        Quay lại
                    </Link>
                </div>
            </Layout>
        )
    }

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
                            {/* Search box chi tiet kien thuc */}
                            <div className={styles.searchBox}>
                                <input 
                                    className={styles.searchInput} 
                                    type='text' 
                                    placeholder='Tìm kiếm bài viết' 
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    aria-label='Tìm kiếm bài viết kiến thức' 
                                />
                                <button className={styles.searchBtn} aria-label='Tìm kiếm'>
                                    <img src="https://learningchain.vn/wp-content/uploads/2025/10/icon_search_nivex.svg" alt="Search"/>
                                </button>
                                
                                {/* Search Results Dropdown */}
                                {isSearching && (
                                    <div className={styles.searchResults}>
                                        {searchResults.length > 0 ? (
                                            <>
                                                <div className={styles.searchResultsHeader}>
                                                    Kết quả tìm kiếm ({searchResults.length})
                                                </div>
                                                {searchResults.map((result) => (
                                                    <Link
                                                        href={`/chi-tiet-kien-thuc/${result.id}`}
                                                        key={result.id} 
                                                        className={styles.searchResultItem}
                                                        onClick={() => {
                                                            setSearchTerm('')
                                                            setSearchResults([])
                                                            setIsSearching(false)
                                                        }}
                                                    >
                                                        <div className={styles.searchResultTitle}>{result.title}</div>
                                                        <div className={styles.searchResultMeta}>
                                                            {result.description || result.topic}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </>
                                        ) : (
                                            <div className={styles.noResults}>
                                                Không tìm thấy bài viết cho "{searchTerm}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb */}
            <section className={styles.breadcrumbSection}>
                <div className="container">
                    <nav className={styles.breadcrumb}>
                        <Link href="/kien-thuc-tong-quan">Kiến thức tổng quan</Link>
                        <span className={styles.separator}>&gt;</span>
                        <span className={styles.current}>{article.title}</span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.mainSection}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        {/* Article Content */}
                        <div className={styles.articleContent}>
                            

                            <div className={styles.featuredImage}>
                                <img src={article.image} alt={article.title} />
                            </div>
                            
                            <div className={styles.articleHeader}>
                                <h1 className={styles.articleTitle}>{article.title}</h1>
                            </div>
                                
                            <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: article.content }}>
                            </div>

                            
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarWidget}>
                                <h3 className={styles.sidebarTitle}>Kiến thức mới nhất</h3>
                                <div className={styles.newsList}>
                                    {latestNews.map((news) => (
                                        <Link href={`/chi-tiet-kien-thuc/${news.id}`} key={news.id} className={styles.newsItem}>
                                            <span className={styles.newsDate}>{news.date}</span>
                                            <div className={styles.newsImageWrapper}>
                                                <div className={styles.newsImage}>
                                                    <img src={news.image} alt={news.title} />
                                                </div>
                                                <div className={styles.newsContent}>
                                                    
                                                    <h4 className={styles.newsTitle}>{news.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                    <div className={styles.articleFooter}>
                                <h3 className={styles.sectionTitle}>Được xem nhiều</h3>
                                <div className={styles.popularGrid}>
                                    {popularArticles.map((item, index) => (
                                        <Link href={`/chi-tiet-kien-thuc/${item.id}`} key={item.id} className={styles.popularCard}>
                                            <div className={styles.popularCardImage}>
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <div className={styles.popularCardContent}>
                                                <h4 className={styles.popularCardTitle}>{item.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className={styles.viewMoreSection}>
                                    <Link href="/kien-thuc-tong-quan" className={`btn-cta-simple ${styles.viewMoreBtn}`}>
                                        Xem thêm
                                    </Link>
                                </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

