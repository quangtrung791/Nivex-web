'use client'
import Layout from '@/components/layout/Layout'
import styles from './courses.module.css'
import { useState, useEffect, useMemo } from 'react'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch courses from API
  const fetchCourses = async (filter = 'all', search = '') => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('filter', filter)
      if (search.trim()) params.append('search', search)
      
      const response = await fetch(`/api/courses?${params}`)
      const result = await response.json()
      
      if (result.success) {
        setCourses(result.data)
      } else {
        setCourses([])
      }
    } catch (error) {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

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
    if (course.link_zoom) {
      window.open(course.link_zoom, '_blank')
    }
  }

  return (
    <Layout headerStyle={1} footerStyle={2}>
     <section className={`page-title ${styles.pageTitleCourse}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>Khóa học <span>tại Nivex</span>
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
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
                                    <img src="/assets/images/icon/icon_search_user_guide_app.png"/>
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
            <div className={styles.loading}>Đang tải khóa học...</div>
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
                            className={`btn-cta-simple ${styles.courseButton} ${course.buttonClass ? styles[course.buttonClass] : ''}`}
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
    </Layout>
  )
}