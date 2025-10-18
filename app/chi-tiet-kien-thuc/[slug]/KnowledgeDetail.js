'use client'
import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import styles from './knowledgeDetail.module.css'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'

// helper client (phòng khi muốn dùng mô tả tạm thời)
const summarizeHtml = (html, wordLimit = 100) => {
  if (!html) return ''
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.split(/\s+/).slice(0, wordLimit).join(' ')
}

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
        if (params.slug) {
            fetchArticleDetail()
            fetchLatestNews()
            fetchPopularArticles()
            fetchAllKnowledgeArticles()
        }
    }, [params.slug])

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
            // Fetch article by slug
            const response = await fetch(`/api/knowledge/${params.slug}`)
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
                    .filter(article => article.slug !== params.slug)
                    .slice(0, 5)
                
                if (filteredArticles.length > 0) {
                    const transformedNews = filteredArticles.map(article => ({
                        id: article.id,
                        slug: article.slug,
                        title: article.title,
                        image: article.image_url || article.image || "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
                        date: formatNewsDate(article.created_at)
                    }))
                    setLatestNews(transformedNews)
                }
            }
        } catch (error) {
            // console.error('Error fetching latest knowledge articles:', error)
        }
    }

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
            setPopularArticles([])
        }
    }

    // Generate schema for the article
    const canonical = useMemo(
        () => `${BASE_URL}/chi-tiet-kien-thuc/${article?.slug || ''}`,
        [article?.slug]
    )
    
    const metaDescription = useMemo(
        () =>
          article?.description ||
          summarizeHtml(article?.content || '', 100) ||
          article?.title ||
          '',
        [article]
    )
    
      // JSON-LD object
    const jsonLd = useMemo(() => {
        if (!article) return null
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: metaDescription,
          image: article.image || '/assets/images/logo/Nivex_icon_bg.png',
          author: { '@type': 'Organization', name: 'Nivex Hub', url: 'https://nivex.vn' },
          publisher: {
            '@type': 'Organization',
            name: 'Nivex Hub',
            url: 'https://nivex.vn',
            logo: {
              '@type': 'ImageObject',
              url: 'https://nivex.vn/assets/images/logo/Nivex_icon_bg.png',
              width: 1200,
              height: 630
            }
          },
          datePublished: article.created_at,
          dateModified: article.updated_at || article.created_at,
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          url: canonical,
          articleSection: 'Kiến thức',
          keywords: article.topic ? [article.topic] : ['kiến thức', 'crypto', 'blockchain'],
          inLanguage: 'vi-VN',
          isAccessibleForFree: true
        }
      }, [article, metaDescription, canonical])

    if (loading) {
        return (
            <>
                <div className={styles.loadingContainer}>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </>
        )
    }

    if (error || !article) {
        return (
            <>
                <div className={styles.errorContainer}>
                    <p>{error || 'Không tìm thấy bài viết'}</p>
                    <Link href="/kien-thuc-tong-quan" className="btn-cta-simple">
                        Quay lại
                    </Link>
                </div>
            </>
        )
    }
    
    


    return (
        <>

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
                                                        href={`/chi-tiet-kien-thuc/${result.slug || result.id}`}
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
                                        <Link href={`/chi-tiet-kien-thuc/${news.slug || news.id}`} key={news.id} className={styles.newsItem}>
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
                                        <Link href={`/chi-tiet-kien-thuc/${item.slug || item.id}`} key={item.id} className={styles.popularCard}>
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
        {jsonLd && (
            <script
                type="application/ld+json"
                // Quan trọng: stringify sạch sẽ, không chèn biến không hiển thị
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        )}
        </>
    )
}