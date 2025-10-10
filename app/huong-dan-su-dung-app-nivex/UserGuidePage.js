'use client'
import styles from './UserGuideNivexApp.module.css'
import { useMemo, useState } from 'react'

export default function UserGuidePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null)
  // Static data to render structure; replace text as needed
  const popularCategories = useMemo(() => ([
    { title: 'Đăng ký & Đăng nhập', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/dangky_dangnhap_guide_nivex.webp', href:'/huong-dan-dang-ky-dang-nhap' },
    { title: 'Xác minh KYC', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/xacminhKYC_guide_nivex.webp', href:'/xac-minh-danh-tinh-kyc' },
    { title: 'Hướng dẫn nạp tiền', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/guidenaptien_guide_nivex.webp', href:'/huong-dan-nap-tien' },
    { title: 'Hướng dẫn rút tiền', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/guideruttien_guide_nivex.webp', href:'/huong-dan-rut-tien' },
    { title: 'Giao dịch P2P', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/giaodichp2p_guide_nivex.webp', href:'/giao-dich-p2p' },
    { title: 'Giao dịch hợp đồng', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/giaodichhopdong_guide_nivex.webp' },
    { title: 'AI Copy Trade', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/aicoptrade_guide_nivex.webp' },
    { title: 'Chuyển tiền nội bộ', icon: 'https://learningchain.vn/wp-content/uploads/2025/10/chuyentiennoibo_guide_nivex.webp' },
  ]), [])

  const linkOperation = useMemo(() => ([
    { text: 'Xác thực 2 lớp (2FA)'},
    { text: 'Tạo tài khoản Gmail'},
  ]), [])

  const copyTradeAdvanced = useMemo(() => ([
    { text: 'Nguyên lý Copy Trade'},
    { text: 'Năng lực cạnh tranh Copy Trade'},
    { text: 'Tìm hiểu tiềm năng lợi nhuận'},
  ]), [])

  const inviteFriendsAndRewards = useMemo(() => ([
    { text: 'Lì xì Nivex'},
    { text: 'Tạo liên kết giới thiệu bạn bè'},
  ]), [])

  // Tổng hợp tất cả items để search
  const allItems = useMemo(() => [
    ...popularCategories.map(item => ({ ...item, type: 'category', section: 'Danh mục phổ biến' })),
    ...linkOperation.map(item => ({ ...item, type: 'chip', section: 'Thao tác liên kết', title: item.text })),
    ...copyTradeAdvanced.map(item => ({ ...item, type: 'chip', section: 'Copy Trade & AI nâng cao', title: item.text })),
    ...inviteFriendsAndRewards.map(item => ({ ...item, type: 'chip', section: 'Mời bạn bè & Phần thưởng', title: item.text }))
  ], [popularCategories, linkOperation, copyTradeAdvanced, inviteFriendsAndRewards])

  // Search function
  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const results = allItems.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.section.toLowerCase().includes(term.toLowerCase())
    )
    setSearchResults(results)
  }

  // Scroll to element function
  const scrollToElement = (elementText) => {
    
    // Tìm kiếm theo các selector cụ thể
    const selectors = [
      `.${styles.cardTitle}`,     // Cho popular categories
      `.${styles.chipText}`,      // Cho chip items
      `.${styles.sectionTitle}`,  // Cho section titles
    ]
    
    let targetElement = null
    let parentCard = null
    
    // Tìm theo từng selector
    for (let selector of selectors) {
      const elements = document.querySelectorAll(selector)
      for (let element of elements) {
        if (element.textContent && 
            element.textContent.trim() === elementText.trim() && 
            element.offsetParent !== null) {
          targetElement = element
          
          // Tìm parent element để apply hover effect
          if (selector === `.${styles.cardTitle}`) {
            parentCard = element.closest(`.${styles.categoryCard}`)
          } else if (selector === `.${styles.chipText}`) {
            parentCard = element.closest(`.${styles.chip}`)
          } else if (selector === `.${styles.sectionTitle}`) {
            parentCard = element // Section title tự nó là target
          }
          
          break
        }
      }
      if (targetElement) break
    }
    
    if (targetElement && parentCard) {
      
      // Scroll to element
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
      
      // Apply hover effect to parent card/chip
      const originalBackground = parentCard.style.background
      const originalBorder = parentCard.style.border
      const originalColor = parentCard.style.color
      const originalTransition = parentCard.style.transition
      
      // Apply hover styles (matching CSS hover effects)
      parentCard.style.background = '#242529'
      parentCard.style.border = 'none'
      parentCard.style.color = 'white'
      parentCard.style.transition = 'all 0.3s ease'
      
      // Add extra highlight for visibility
      parentCard.style.border = '1px solid #BCCF08'
      parentCard.style.transform = 'scale(1.02)'
      
      // Reset after 3 seconds
      setTimeout(() => {
        parentCard.style.background = originalBackground
        parentCard.style.border = originalBorder
        parentCard.style.color = originalColor
        parentCard.style.transition = originalTransition
        parentCard.style.boxShadow = ''
        parentCard.style.transform = ''
      }, 3000)
    }
    
    setSearchTerm('')
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <>
      <section className={`page-title ${styles.pageTitleKnowLedge}`}>
                <div className="container">
                    <div className={styles.displayFlexForHeader}>
                        <div className="col-md-6">
                            <h1 className={`heading ${styles.pageTitleHeading}`}>Hướng dẫn sử dụng <span>app Nivex</span>
                            </h1>
                        </div>
                        <div className={`col-md-6 ${styles.col6mdCenter}`}>
                            <p className={`${styles.pageHeaderKnowledgeSubtitle}`}>Tổng hợp các bước cài đặt, thao tác và giải pháp nhanh để sử dụng Nivex hiệu quả.</p>
                        </div>
                    </div>
                </div>
      </section>
      <section className={styles.wrapper}>
        <div className='container'>

          {/* Header row: title + search */}
          <div className={styles.headerRow}>
            <h2 className={styles.pageTitle}>THAO TÁC <span>PHỔ BIẾN</span> </h2>
            <div className={styles.searchBox}>
              <input 
                className={styles.searchInput} 
                type='text' 
                placeholder='Tìm kiếm' 
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label='Tìm kiếm hướng dẫn' 
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
                      {searchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className={styles.searchResultItem}
                          onClick={() => scrollToElement(result.title)}
                        >
                          <div className={styles.searchResultTitle}>{result.title}</div>
                          <div className={styles.searchResultSection}>{result.section}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className={styles.noResults}>
                      Không tìm thấy kết quả cho "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Popular category grid */}
          <div className={styles.categoryGrid}>
            {popularCategories.map((item, idx) => {
              const hoverIcon = item.icon.replace(/(\.[a-zA-Z0-9]+)$/, '_hover$1');
              const isHovered = hoveredCategoryIndex === idx;
              return (
                <a 
                  href={item.href} 
                  key={idx} 
                  className={styles.categoryCard}
                  onMouseEnter={() => setHoveredCategoryIndex(idx)}
                  onMouseLeave={() => setHoveredCategoryIndex(null)}
                >
                  <div className={styles.cardIcon} aria-hidden>
                    <img 
                      src={isHovered ? hoverIcon : item.icon} 
                      alt={`${item.title} icon`} 
                      className={styles.iconImage} 
                    />
                  </div>
                  <div className={styles.cardTitle}>{item.title}</div>
                </a>
              );
            })}
          </div>

          {/* Account & Security section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Thao tác liên kết</h3>
            <div className={styles.chipsRow}>
              {linkOperation.map((item, i) => (
                <a key={i} href='#' className={styles.chip}>
                  <span className={styles.chipText}>{item.text}</span>
                  <span className={styles.chipArrow} aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copy Trade & AI advanced */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Copy Trade & AI nâng cao</h3>
            <div className={styles.chipsRow}>
              {copyTradeAdvanced.map((item, i) => (
                <a key={i} href='#' className={styles.chip}>
                  <span className={styles.chipText}>{item.text}</span>
                  <span className={styles.chipArrow} aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Mời bạn bè & Phần thưởng</h3>
            <div className={`${styles.chipsRow}`}>
              {inviteFriendsAndRewards.map((item, i) => (
                <a key={i} href='#' className={styles.chip}>
                  <span className={styles.chipText}>{item.text}</span>
                  <span className={styles.chipArrow} aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div> 


          <div className={styles.section} style={{ display: 'flex', flexDirection: 'column'}}>
            <h3 className={styles.sectionTitle}>Chương trình giới thiệu/đại lý & phát triển cộng đồng</h3>
            <p className={styles.sectionDescription}>Chương trình Đại lý & Phát triển Cộng đồng Nivex là cơ hội để bạn hợp tác cùng Nivex trong việc mở rộng hệ sinh thái người dùng, chia sẻ lợi ích và cùng nhau phát triển bền vững.</p>
            <p className={styles.sectionDescription}>Để nhận thông tin chi tiết về Chính sách Đại lý & Phát triển Cộng đồng Nivex, vui lòng liên hệ trực tiếp bộ phận <span style={{ fontWeight: 800 }} >Chăm sóc Khách hàng (CSKH)</span> để được hỗ trợ đầy đủ nhất.</p>
            <a href="https://zalo.me/g/xhcwjb384" target="_blank" className={`btn-cta-simple ${styles.contactButton}`}>Liên hệ ngay</a>
          </div>   
        </div>
      </section>
    </>
  )
}
