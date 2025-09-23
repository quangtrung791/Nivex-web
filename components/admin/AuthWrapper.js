'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Đơn giản hóa: chỉ kiểm tra có cookie không, không verify JWT ở client
    const checkAuth = () => {
      try {
        // Kiểm tra có admin-auth cookie không (không phải HTTPOnly)
        const cookies = document.cookie.split(';')
        const adminCookie = cookies.find(cookie => 
          cookie.trim().startsWith('admin-auth=')
        )
        
        console.log('🔍 All cookies:', document.cookie)
        console.log('🔍 Admin auth cookie found:', adminCookie ? 'Yes' : 'No')
        
        if (adminCookie && adminCookie.includes('admin-auth=true')) {
          console.log('✅ Authentication successful')
          setIsAuthenticated(true)
          setUser({ username: 'adminnivex', role: 'admin' })
        } else {
          console.log('❌ No valid admin auth, redirecting to login')
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất không?')
    if (!isConfirmed) return

    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST'
      })
      // Clear client-side cookies
      document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
      // Force redirect anyway
      document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      router.push('/admin/login')
    }
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '20px',
            animation: 'spin 2s linear infinite' 
          }}>⚙️</div>
          <div>Đang kiểm tra đăng nhập...</div>
          <style jsx>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Middleware sẽ redirect về login
  }

  return (
    <div>
      {/* Header với thông tin user và logout */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div>
          <span>👋 Xin chào, <strong>{user?.username}</strong></span>
          <span style={{ marginLeft: '15px', opacity: 0.8 }}>
            🕐 {new Date().toLocaleDateString('vi-VN')}
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)'
          }}
        >
          🚪 Đăng xuất
        </button>
      </div>
      
      {/* Admin content */}
      {children}
    </div>
  )
}