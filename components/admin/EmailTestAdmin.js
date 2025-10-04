'use client'

import { useState, useEffect } from 'react'
import styles from './EmailTestAdmin.module.css'

export default function EmailTestAdmin() {
  const [testResults, setTestResults] = useState(null)
  const [testEmail, setTestEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [configStatus, setConfigStatus] = useState(null)

  // Check configuration status on load
  useEffect(() => {
    checkConfiguration()
  }, [])

  const checkConfiguration = async () => {
    try {
      const response = await fetch('/api/email/test')
      const data = await response.json()
      setConfigStatus(data)
    } catch (error) {
      console.error('Failed to check email configuration:', error)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) {
      alert('Vui lòng nhập địa chỉ email')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: testEmail })
      })

      const result = await response.json()
      setTestResults(result)
    } catch (error) {
      setTestResults({
        success: false,
        message: 'Network error: ' + error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.emailTestAdmin}>
      <div className={styles.section}>
        <h2>📧 Email Configuration Status</h2>
        {configStatus && (
          <div className={`${styles.statusCard} ${configStatus.configured ? styles.success : styles.warning}`}>
            <div className={styles.statusHeader}>
              <span className={styles.statusIcon}>
                {configStatus.configured ? '✅' : '⚠️'}
              </span>
              <span className={styles.statusText}>
                {configStatus.configured ? 'Email Configured' : 'Email Not Configured'}
              </span>
            </div>
            
            <div className={styles.configDetails}>
              <div className={styles.configItem}>
                <span>SMTP Host:</span>
                <span>{configStatus.environment?.host}</span>
              </div>
              <div className={styles.configItem}>
                <span>SMTP Port:</span>
                <span>{configStatus.environment?.port}</span>
              </div>
              <div className={styles.configItem}>
                <span>Email User:</span>
                <span>{configStatus.environment?.user}</span>
              </div>
            </div>
            
            {configStatus.message && (
              <div className={styles.statusMessage}>
                {configStatus.message}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2>🧪 Test Email Sending</h2>
        <div className={styles.testForm}>
          <div className={styles.inputGroup}>
            <label>Email Address:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Nhập email để test"
              className={styles.emailInput}
            />
          </div>
          
          <button
            onClick={sendTestEmail}
            disabled={isLoading || !configStatus?.configured}
            className={styles.testButton}
          >
            {isLoading ? 'Sending...' : 'Send Test Email'}
          </button>
        </div>

        {testResults && (
          <div className={`${styles.resultCard} ${testResults.success ? styles.success : styles.error}`}>
            <div className={styles.resultHeader}>
              <span className={styles.resultIcon}>
                {testResults.success ? '✅' : '❌'}
              </span>
              <span>
                {testResults.success ? 'Email Sent Successfully!' : 'Email Failed'}
              </span>
            </div>
            
            <div className={styles.resultMessage}>
              {testResults.message}
            </div>
            
            {testResults.messageId && (
              <div className={styles.messageId}>
                Message ID: {testResults.messageId}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2>⚙️ Configuration Guide</h2>
        <div className={styles.guideCard}>
          <h3>Cách cấu hình Email</h3>
          <ol>
            <li>Tạo file <code>.env.local</code> trong thư mục root project</li>
            <li>Thêm các biến môi trường sau:</li>
          </ol>
          
          <div className={styles.codeBlock}>
            <pre>{`# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Sender Information  
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Nivex Education`}</pre>
          </div>

          <div className={styles.note}>
            <h4>📝 Lưu ý:</h4>
            <ul>
              <li>Với Gmail: Sử dụng App Password thay vì mật khẩu thường</li>
              <li>Restart development server sau khi thêm environment variables</li>
              <li>Đảm bảo 2FA được bật cho Gmail account</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>📊 Email Templates Preview</h2>
        <div className={styles.templateInfo}>
          <p>Email templates được tạo tự động với thông tin:</p>
          <ul>
            <li>Tên người đăng ký</li>
            <li>Tên khóa học</li>
            <li>Ngày và giờ học</li>
            <li>Link Zoom meeting</li>
            <li>Mã đăng ký</li>
          </ul>
        </div>
      </div>
    </div>
  )
}