'use client'
import { useState } from 'react'
import styles from './HomepagePopup.module.css'

const HomepagePopup = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 900) // khớp với animation
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 900)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayFadeOut : ''}`}
      onClick={handleOverlayClick}
    >
      <a
        className={`${styles.modal} ${isClosing ? styles.fadeOut : ''}`}
        href="https://learningchain.vn/cuoc-thi-rise-to-riches-mua3/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <img
            src="https://learningchain.vn/wp-content/uploads/nivex/arrow-right-nivex.svg"
            alt="Close"
            className={styles.closeIcon}
          />
        </button>

        <button className={styles.joinButton}>THAM GIA NGAY</button>
      </a>
    </div>
  )
}

export default HomepagePopup
