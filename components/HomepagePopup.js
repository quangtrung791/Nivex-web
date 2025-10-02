'use client'
import { useState, useEffect } from 'react'
import styles from './HomepagePopup.module.css'

const HomepagePopup = () => {
  const [isVisible, setIsVisible] = useState(true) // Show immediately
  const [isClosing, setIsClosing] = useState(false) // Track closing animation

  const handleClose = (e) => {
    e.preventDefault() // Prevent link navigation
    e.stopPropagation() // Stop event bubbling to parent <a> tag
    setIsClosing(true)
    // Delay actual removal to allow fade-out animation
    setTimeout(() => {
      setIsVisible(false)
    }, 900) // Match animation duration
  }

  const handleOverlayClick = (e) => {
    // Only close if clicking directly on the overlay (not the modal)
    if (e.target === e.currentTarget) {
      setIsClosing(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 900) // Match animation duration
    }
  }

  if (!isVisible) return null

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleOverlayClick}>
      <a className={`${styles.modal} ${isClosing ? styles.fadeOut : ''}`} href="https://learningchain.vn/cuoc-thi-rise-to-riches-season3-seeding/" target="_blank" rel="noopener noreferrer">
        <button className={styles.closeButton} onClick={handleClose}>
          <img 
            src="https://learningchain.vn/wp-content/uploads/nivex/arrow-right-nivex.svg" 
            alt="Close"
            className={styles.closeIcon}
          />
        </button>
          
          <button className={styles.joinButton}>
            THAM GIA NGAY
          </button>
      </a>
    </div>
  )
}

export default HomepagePopup