'use client'
import { useState } from 'react'
import styles from './LandingPagePopUp.module.css'

export default function LandingPagePopUp({ isOpen, onClose, course }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/landing-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Reset form after successful submission
        setFormData({ fullName: '', email: '', phone: '' })
      } else {
        setError(result.error || 'Có lỗi xảy ra, vui lòng thử lại')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ fullName: '', email: '', phone: '' })
    setError('')
    setSuccess(false)
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Đăng ký</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Đăng ký thành công!</h3>
          </div>
        ) : (
          <>
            <div className={styles.courseInfo}>
              <h3 className={styles.courseName}>Nivex Hub</h3>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName" className={styles.label}>
                  Họ và tên <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Nhập họ và tên của bạn"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="example@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Số điện thoại <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="0901234567"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={`btn-cta-simple ${styles.submitButton}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký ngay'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}