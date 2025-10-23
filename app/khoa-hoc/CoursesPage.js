'use client'
import styles from './courses.module.css'
import { useState, useEffect, useMemo } from 'react'
import CourseRegistrationModal from '@/components/CourseRegistrationModal'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nivex.vn'
const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Fetch courses from API
  const fetchCourses = async (filter = 'all', search = '') => {
    try {
      setLoading(true);
  
      const wp = new URL(`${WP_BASE}/courses`);
      wp.searchParams.set('filter', filter);
      if (search.trim()) wp.searchParams.set('search', search.trim());
      wp.searchParams.set('page', '1');
      wp.searchParams.set('per_page', '30');
  
      const res = await fetch(wp.toString(), { cache: 'no-store' });
      const json = await res.json();
  
      if (res.ok && json?.success && Array.isArray(json.data)) {
        const mapped = json.data.map(course => ({
          id: course.id,
          title: course.title,
          type: course.type, // 'online' | 'offline' | 'completed'
          category: course.category || '',
          status: course.status,
          date: course.date,
          start_date: course.start_date,
          end_date: course.end_date,
          link_zoom: course.link_zoom,
          content: course.content || '',
          image: course.image || '/assets/images/background/course_image_test1.png',
          buttonText: course.buttonText || (course.type === 'online' ? 'Tham gia' : 'Đăng ký ngay'),
        }));
        setCourses(mapped);
      } else {
        setCourses([]);
      }
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Load courses on component mount
  useEffect(() => {
    fetchCourses(activeFilter, searchTerm)
  }, [activeFilter, searchTerm])

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'online', label: 'Đang diễn ra' },
    { id: 'offline', label: 'Sắp diễn ra' },
    { id: 'completed', label: 'Đã kết thúc' }
  ]

  // Filtered courses (now handled by API)
  const filteredCourses = courses

  // Search function - now triggers API call
  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    // Search results will be updated via useEffect -> fetchCourses
    const t = term.toLowerCase()
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(t) ||
      (Array.isArray(course.category) && course.category.some(cat => cat.toLowerCase().includes(t))) ||
      (course.category && typeof course.category === 'string' && course.category.toLowerCase().includes(t))
    )
    setSearchResults(results)
  }

  // Handle course button click
  const handleCourseClick = (course) => {
    if (course.buttonText === 'Đăng ký ngay') {
      setSelectedCourse(course)
      setShowRegistrationModal(true)
    } else if (course.link_zoom) {
      window.open(course.link_zoom, '_blank')
    }
  }

  // Handle close registration modal
  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false)
    setSelectedCourse(null)
  }

  // bỏ tag HTML + cắt ngắn
  const toPlain = (html = '', limit = 100) =>
    (html || '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, limit)

  // Chuẩn ISO nếu parse được
  const toISO = (val) => {
    const d = new Date(val)
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
  }

    // canonical của trang tổng hợp
  const canonical = `https://nivex.vn/khoa-hoc/`

  // ItemList (danh sách khóa học)
  const itemListJsonLd = useMemo(() => {
    if (!Array.isArray(courses) || !courses.length) return null

    const itemListElement = courses.map((c, idx) => {
      const url = `${canonical}#course-${c.id}` // nếu bạn có slug riêng thì thay bằng link chi tiết
      const course = {
        '@type': 'Course',
        name: c.title,
        description: toPlain(c.content, 100),
        ...(c.image && { image: c.image }),
        provider: { '@type': 'Organization', name: 'Nivex Hub', url: SITE_URL },
        ...(c.type && { courseMode: c.type }), // 'online' | 'offline' | 'completed' (tùy data)
        ...(c.date && {
          hasCourseInstance: {
            '@type': 'CourseInstance',
            startDate: toISO(c.date),
            ...(c.link_zoom && {
              location: { '@type': 'VirtualLocation', url: c.link_zoom },
            }),
          },
        }),
        // Bạn có giá/ưu đãi? => thêm offers:
        // offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND', availability: 'https://schema.org/InStock' }
      }

      return {
        '@type': 'ListItem',
        position: idx + 1,
        url,
        item: course,
      }
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      url: canonical,
      itemListElement,
    }
  }, [courses])

  // BreadcrumbList cho trang tổng hợp
  const breadcrumbJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Khóa học', item: canonical },
    ],
  }), [])

  // (tuỳ chọn) Thông tin trang tổng hợp (CollectionPage)
  const collectionPageJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Khóa học | Nivex Hub',
    description: 'Giới thiệu khóa học tại Nivex',
    url: canonical,
    inLanguage: 'vi-VN',
    isPartOf: { '@type': 'WebSite', name: 'Nivex', url: SITE_URL },
  }), [])

  return (
    <>
     <section className={`page-title ${styles.pageTitleCourse}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}><span>Khóa học</span> tại Nivex
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            {/* Search box khoa hoc */}
                            <div className={styles.searchBox}>
                                <input 
                                    className={styles.searchInput} 
                                    type='text' 
                                    placeholder='Tìm kiếm' 
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    aria-label='Tìm kiếm khóa học' 
                                />
                                <button className={styles.searchBtn} aria-label='Tìm kiếm'>
                                    <img src="https://learningchain.vn/wp-content/uploads/2025/10/icon_search_nivex.svg"/>
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
                                            <div 
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
                                                  {(Array.isArray(result.category) ? result.category.join(', ') : result.category)}
                                                </div>
                                            </div>
                                        ))}
                                        </>
                                    ) : (
                                        <div className={styles.noResults}>
                                        Không tìm thấy khóa học cho "{searchTerm}"
                                        </div>
                                    )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
      </section>
      <section className={styles.coursesWrapper}>
        <div className="container">

          {/* Filter Tabs */}
          <div className={styles.filterSection}>
            {/* Desktop Tabs */}
            <div className={`${styles.filterTabs} ${styles.desktopTabs}`}>
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.filterTab} ${activeFilter === tab.id ? styles.active : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className={styles.mobileDropdown}>
              <div 
                  className={styles.mobileDropdownInnerFlex}
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              >
                <button 
                  className={styles.dropdownToggle}
                  
                >
                    {filterTabs.find(tab => tab.id === activeFilter)?.label || 'Tất cả'}
                    
                </button>
                <span className={`${styles.dropdownIcon} ${isFilterDropdownOpen ? styles.open : ''}`}></span>
              </div>
              <div className={`${styles.dropdownMenu} ${isFilterDropdownOpen ? styles.open : ''}`}>
                {filterTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`${styles.filterMenuItem} ${activeFilter === tab.id ? styles.active : ''}`}
                    onClick={() => {
                      setActiveFilter(tab.id)
                      setIsFilterDropdownOpen(false)
                    }}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Loading state */}
        {loading && (
          <div className={styles.loadingContainer}>
            <p >Đang tải khóa học...</p>
          </div>
        )}

        {/* Courses Section */}
        {!loading && (
          <div className={styles.coursesSection}>
            {activeFilter === 'all' && (
              <h2 className={styles.sectionTitle}>Buổi học trực tuyến hàng tuần</h2>
            )}
            
            <div className={styles.coursesGrid}>
              {filteredCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseImage}>
                    <img src={course.image} alt={course.title} />
                    
                  </div>
                  
                  <div className={styles.courseContent}>
                    <div className={styles.courseMeta}>
                      <div className={styles.courseBadge}>
                            <span className={`${styles.badgeType} ${styles[course.type]}`}>{course.type}</span>
                      </div>
                      <div className={styles.courseDate}><span className={styles.iconCourseDateTime}></span> {course.date}</div>
                    </div>
                    
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <div className={styles.courseCardContent}>{course.content}</div>

                    <div className={styles.courseCardLastChild}>
                        <div className={styles.courseDetails}>
                            {/* <div className={styles.courseCategory}>
                                  {Array.isArray(course.category) && course.category.length > 0 ? (
                                    course.category.map((cat, idx) => (
                                      <span key={idx} className={styles.categoryValue}>{cat}</span>
                                    ))
                                  ) : (
                                    course.category && <span className={styles.categoryValue}>{course.category}</span>
                                  )}
                            </div> */}
                        </div>
                        
                        <button 
                            className={`${styles.courseButton}`}
                            onClick={() => handleCourseClick(course)}
                            >
                            {course.buttonText}
                        </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && !loading && (
              <div className={styles.noCoursesMessage}>
                Hiện tại chưa có khóa học nào.
              </div>
            )}

          </div>
        )}
        </div>

      </section>
      
      {/* Registration Modal */}
      <CourseRegistrationModal 
        isOpen={showRegistrationModal}
        onClose={handleCloseRegistrationModal}
        course={selectedCourse}
      />

        {/* ...phần JSX hiện tại của bạn... */}

      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {collectionPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
        />
      )}

      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

    </>
  )
}
