'use client'
import Layout from '@/components/layout/Layout'
import styles from './UserGuideNivexApp.module.css'
import { useMemo, useState, useEffect } from 'react'

export default function UserGuideForNivexApp() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  // Static data to render structure; replace text as needed
  const popularCategories = useMemo(() => ([
    { title: 'Đăng ký & Đăng nhập', icon: '/assets/images/icon/b1.svg', href:'/huong-dan-dang-ky-dang-nhap' },
    { title: 'Xác minh KYC', icon: '/assets/images/icon/b2.svg', href:'/xac-minh-danh-tinh-kyc' },
    { title: 'Hướng dẫn nạp tiền', icon: '/assets/images/icon/b3.svg', href:'/huong-dan-nap-tien' },
    { title: 'Hướng dẫn rút tiền', icon: '/assets/images/icon/b4.svg' },
    { title: 'Giao dịch P2P', icon: '/assets/images/icon/b5.svg' },
    { title: 'Giao dịch hợp đồng', icon: '/assets/images/icon/b6.svg' },
    { title: 'Chiến lược AI', icon: '/assets/images/icon/b7.svg' },
    { title: 'Mua coin bản địa', icon: '/assets/images/icon/b8.svg' },
  ]), [])
  // const popularCategories = useMemo(() => ([
  //   { title: 'Đăng ký & Đăng nhập', icon: '/assets/images/icon/user_guide_icon_1.png', href:'/huong-dan-dang-ky-dang-nhap' },
  //   { title: 'Xác minh KYC', icon: '/assets/images/icon/user_guide_icon_2.png', href:'/xac-minh-danh-tinh-kyc' },
  //   { title: 'Hướng dẫn nạp tiền', icon: '/assets/images/icon/user_guide_icon_3.png', href:'/huong-dan-nap-tien' },
  //   { title: 'Hướng dẫn rút tiền', icon: '/assets/images/icon/user_guide_icon_4.png' },
  //   { title: 'Giao dịch P2P', icon: '/assets/images/icon/user_guide_icon_5.png' },
  //   { title: 'Giao dịch hợp đồng', icon: '/assets/images/icon/user_guide_icon_6.png' },
  //   { title: 'Chiến lược AI', icon: '/assets/images/icon/user_guide_icon_7.png' },
  //   { title: 'Mua coin bản địa', icon: '/assets/images/icon/user_guide_icon_8.png' },
  // ]), [])

  const accountSecurity = useMemo(() => ([
    { text: 'Liên kết Google'},
    { text: 'Tài khoản Gmail'},
    { text: 'Chuyển tiền nội bộ'},
    { text: 'Thêm địa chỉ rút tiền vào Whitelist'},
  ]), [])

  const copyTradeAdvanced = useMemo(() => ([
    { text: 'Cơ chế Copy Trade'},
    { text: 'Nguyên lý Copy Trade'},
    { text: 'Lợi ích AI T-Order'},
    { text: 'Rủi ro Copy Trade AI'},
  ]), [])

  const inviteFriendsAndRewards = useMemo(() => ([
    { text: 'Tạo hoặc gửi tiền thưởng Nivex'},
    { text: 'Tạo link giới thiệu bạn bè'},
  ]), [])

  const communityDevelopment = useMemo(() => ([
    { text: 'Tạo link ref & phần trăm hoa hồng'},
    { text: 'Cách nâng phần trăm hoàn phí'},
    { text: 'Kiểm tra UID của khách hàng'},
    { text: 'Kiểm tra link khách hàng & phần trăm hoàn phí'},
    { text: 'Minh hoạ cách để hoàn hoa hồng'},
    { text: 'Lấy banner QR chia sẻ'},
  ]), [])

  // Tổng hợp tất cả items để search
  const allItems = useMemo(() => [
    ...popularCategories.map(item => ({ ...item, type: 'category', section: 'Danh mục phổ biến' })),
    ...accountSecurity.map(item => ({ ...item, type: 'chip', section: 'Tài khoản & Bảo mật', title: item.text })),
    ...copyTradeAdvanced.map(item => ({ ...item, type: 'chip', section: 'Copy Trade & AI nâng cao', title: item.text })),
    ...inviteFriendsAndRewards.map(item => ({ ...item, type: 'chip', section: 'Mời bạn bè & Phần thưởng', title: item.text })),
    ...communityDevelopment.map(item => ({ ...item, type: 'chip', section: 'Chương trình giới thiệu/đại lý & phát triển cộng đồng', title: item.text }))
  ], [popularCategories, accountSecurity, copyTradeAdvanced, inviteFriendsAndRewards, communityDevelopment])

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
    console.log('Searching for:', elementText)
    
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
          
          console.log('Found element:', element, 'with selector:', selector)
          break
        }
      }
      if (targetElement) break
    }
    
    if (targetElement && parentCard) {
      console.log('Scrolling to element:', targetElement)
      
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
    } else {
      console.log('Element not found for:', elementText)
    }
    
    setSearchTerm('')
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <Layout headerStyle={1} footerStyle={2}>
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
            <h2 className={styles.pageTitle}>DANH MỤC <span>PHỔ BIẾN</span> </h2>
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
            {popularCategories.map((item, idx) => (
              <a href={item.href} key={idx} className={styles.categoryCard}>
                <div className={styles.cardIcon} aria-hidden>
                  <img src={item.icon} alt={`${item.title} icon`} className={styles.iconImage} />
                </div>
                <div className={styles.cardTitle}>{item.title}</div>
              </a>
            ))}
          </div>

          {/* Account & Security section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tài khoản & Bảo mật</h3>
            <div className={styles.chipsRow}>
              {accountSecurity.map((item, i) => (
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


          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Chương trình giới thiệu/đại lý & phát triển cộng đồng</h3>
            <div className={styles.chipsRow}>
              {communityDevelopment.map((item, i) => (
                <a key={i} href='#' className={styles.chip}>
                  <span className={styles.chipText}>{item.text}</span>
                  <span className={styles.chipArrow} aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div>   
        </div>
      </section>
    </Layout>
  )
}
