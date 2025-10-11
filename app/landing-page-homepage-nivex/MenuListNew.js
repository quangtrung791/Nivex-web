'use client'
import Link from 'next/link'
import styles from '../../public/assets/style/MenuListNew.module.css'
import { useEffect, useState } from "react";

export default function MenuListNew() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const menuItems = [
    {
      title: 'Khóa học',
      icon: 'assets/images/icon-list-menu-homepage/khoahoc_homepage_hover.png',
      href: '/khoa-hoc',
      description: 'Học crypto từ cơ bản đến nâng cao'
    },
    {
      title: 'AI Copy Trade',
      icon: 'assets/images/icon-list-menu-homepage/aicopytrade_homepage_hover.png',
      href: '/ai-copy-trade',
      description: 'Giao dịch tự động với AI'
    },
    {
      title: 'Kiến thức tổng quan',
      icon: 'assets/images/icon-list-menu-homepage/khienthuctongquan_homepage_hover.png',
      href: '/kien-thuc-tong-quan',
      description: 'Tổng hợp kiến thức crypto'
    },
    {
      title: 'Sự kiện',
      icon: 'assets/images/icon-list-menu-homepage/sukien_homepage_hover.png',
      href: '/su-kien',
      description: 'Tin tức và sự kiện mới nhất'
    },
    {
      title: 'Hướng dẫn sử dụng App Nivex',
      icon: 'assets/images/icon-list-menu-homepage/huongdansudungappnivex_hover.png',
      href: '/huong-dan-su-dung-app-nivex',
      description: 'Hướng dẫn chi tiết sử dụng app'
    }
  ]

  useEffect(() => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    }
  }, []);

  return (
    <section className={styles.menuListSection} data-aos={!isMobile ? "fade-up" : ""} data-aos-duration={!isMobile ? "1000" : ""}>
      <div className={`container ${styles.containerCustom}`}>
        {/* <div className="row"> */}
          {/* <div className="col-md-12"> */}
            <div className={`${styles.menuGrid}`}>
              {menuItems.map((item, index) => {
                return (
                <Link 
                  href={item.href} 
                  key={index} 
                  className={styles.menuCard}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={styles.iconContainer}>
                    <img 
                      src={item.icon} 
                      alt={item.title}
                      className={styles.menuIcon}
                    />
                  </div>
                  <div className={styles.menuContent}>
                    <h3 className={styles.menuTitle}>{item.title}</h3>
                  </div>
                </Link>
              )})}
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}