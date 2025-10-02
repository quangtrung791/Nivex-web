'use client'
import Link from 'next/link'
import styles from '../../public/assets/style/MenuListNew.module.css'
import { useEffect, useState } from "react";

export default function MenuListNew() {
  const [isMobile, setIsMobile] = useState(false);
  const menuItems = [
    {
      title: 'Khóa học',
      icon: 'https://learningchain.vn/wp-content/uploads/nivex/a1.png',
      href: '/#',
      description: 'Học crypto từ cơ bản đến nâng cao'
    },
    {
      title: 'AI Copy Trade',
      icon: 'https://learningchain.vn/wp-content/uploads/nivex/a2.png',
      href: '/ai-copy-trade',
      description: 'Giao dịch tự động với AI'
    },
    {
      title: 'Kiến thức tổng quan',
      icon: 'https://learningchain.vn/wp-content/uploads/nivex/a3.png',
      href: '/kien-thuc-tong-quan',
      description: 'Tổng hợp kiến thức crypto'
    },
    {
      title: 'Sự kiện',
      icon: 'https://learningchain.vn/wp-content/uploads/nivex/a4.png',
      href: '/su-kien',
      description: 'Tin tức và sự kiện mới nhất'
    },
    {
      title: 'Hướng dẫn sử dụng App Nivex',
      icon: 'https://learningchain.vn/wp-content/uploads/nivex/a5.png',
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
            <div className={`${styles.menuGrid} customed-menu-grid`}>
              {menuItems.map((item, index) => (
                <Link href={item.href} key={index} className={styles.menuCard}>
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
              ))}
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}