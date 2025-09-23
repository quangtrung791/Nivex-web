'use client'
import './adminlayout.css'

export default function AdminLayout({ children }) {
  return (
    <>
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif' 
    }}>
      {children}
    </div>
    </>
  )
}