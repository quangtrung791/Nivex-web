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

  // Dữ liệu khóa học mẫu
  const courses = useMemo(() => [
    {
      id: 1,
      title: 'Điều khiển lãi sóng tăng trưởng mới - Đóng bộ với các cơ chức tài chính toàn cầu',
      type: 'online',
      category: ['Hợp đồng', 'Spot', 'Copy Trade'],
      level: 'Hạn chế',
      date: '01/09/2025',
      status: 'available',
      image: '/assets/images/background/course_image_test1.png',
      buttonText: 'Đăng ký ngay',
      content: 'Những nhà đầu tư “khôn ngoan” không chờ thị trường ổn định mới hành động, mà họ đa dạng hóa danh mục ngay từ bây giờ để vừa bảo vệ vốn, vừa săn tìm lợi nhuận.',
    },
    {
      id: 2,
      title: 'Bí mật giúp tài khoản tăng trưởng ổn định 12-17% hàng tháng',
      type: 'offline',
      category: ['Hợp đồng', 'Spot', 'Copy Trade'],
      level: 'Hạn chế',
      date: '01/09/2025',
      status: 'full',
      image: '/assets/images/background/course_image_test2.png',
      buttonText: 'Hết hạn đăng ký',
      content: 'Những nhà đầu tư “khôn ngoan” không chờ thị trường ổn định mới hành động, mà họ đa dạng hóa danh mục ngay từ bây giờ để vừa bảo vệ vốn, vừa săn tìm lợi nhuận.',
    },
    {
      id: 3,
      title: 'Khóa học giao dịch crypto nâng cao - Phân tích kỹ thuật chuyên sâu',
      type: 'online',
      category: ['Futures', 'Copy Trade'],
      level: 'Nâng cao',
      date: '15/09/2025',
      status: 'available',
      image: '/assets/images/background/course_image_test1.png',
      buttonText: 'Đăng ký ngay',
      content: 'Những nhà đầu tư “khôn ngoan” không chờ thị trường ổn định mới hành động, mà họ đa dạng hóa danh mục ngay từ bây giờ để vừa bảo vệ vốn, vừa săn tìm lợi nhuận.',
    }
  ], [])

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'online', label: 'Đang diễn ra' },
    { id: 'offline', label: 'Sắp diễn ra' },
    { id: 'completed', label: 'Đã kết thúc' }
  ]

  // Filtered courses
  const filteredCourses = useMemo(() => {
    let filtered = courses

    if (activeFilter !== 'all') {
      if (activeFilter === 'online') {
        filtered = courses.filter(course => course.status === 'available')
      } else if (activeFilter === 'offline') {
        filtered = courses.filter(course => course.type === 'offline')
      } else if (activeFilter === 'completed') {
        filtered = courses.filter(course => course.status === 'full')
      }
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(term) ||
        (Array.isArray(course.category) && course.category.some(cat => cat.toLowerCase().includes(term))) ||
        (course.category && typeof course.category === 'string' && course.category.toLowerCase().includes(term))
      )
    }

    return filtered
  }, [courses, activeFilter, searchTerm])

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
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(t) ||
      (Array.isArray(course.category) && course.category.some(cat => cat.toLowerCase().includes(t))) ||
      (course.category && typeof course.category === 'string' && course.category.toLowerCase().includes(t))
    )
    setSearchResults(results)
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

        {/* Courses Section */}
        <div className={styles.coursesSection}>
            <h2 className={styles.sectionTitle}>Nhiều lượt quan tâm</h2>
            
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
                    <p className={styles.courseCardContent}>{course.content}</p>

                    <div className={styles.courseCardLastChild}>
                        <div className={styles.courseDetails}>
                            <div className={styles.courseCategory}>
                                  {Array.isArray(course.category) ? (
                                    course.category.map((cat, idx) => (
                                      <span key={idx} className={styles.categoryValue}>{cat}</span>
                                    ))
                                  ) : (
                                    <span className={styles.categoryValue}>{course.category}</span>
                                  )}
                            </div>
                            {/* instructor removed */}
                        </div>
                        
                        <button 
                            className={`${styles.courseButton} ${course.status === 'full' ? styles.disabled : ''}`}
                            disabled={course.status === 'full'}
                            >
                            {course.buttonText}
                        </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitleWeek}>Buổi học trực tuyến hàng tuần</h2>
            
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
                    <p className={styles.courseCardContent}>{course.content}</p>

                    <div className={styles.courseCardLastChild}>
                        <div className={styles.courseDetails}>
                            <div className={styles.courseCategory}>
                                  {Array.isArray(course.category) ? (
                                    course.category.map((cat, idx) => (
                                      <span key={idx} className={styles.categoryValue}>{cat}</span>
                                    ))
                                  ) : (
                                    <span className={styles.categoryValue}>{course.category}</span>
                                  )}
                            </div>
                            {/* instructor removed */}
                        </div>
                        
                        <button 
                            className={`${styles.courseButton} ${course.status === 'full' ? styles.disabled : ''}`}
                            disabled={course.status === 'full'}
                            >
                            {course.buttonText}
                        </button>
                    </div>

                  </div>
                </div>
              ))}
            </div> 

          </div>
        </div>

      </section>
    </Layout>
  )
}