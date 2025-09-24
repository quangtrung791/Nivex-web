'use client'
import { Admin, Resource } from 'react-admin'
import { dataProvider } from '@/lib/dataProvider'
import { CourseList, CourseCreate, CourseEdit, CourseShow } from '@/components/admin/CourseAdmin'
import { NewsList, NewsCreate, NewsEdit, NewsShow } from '@/components/admin/NewsAdmin'
import { CateNewsCreate, CateNewsEdit, CateNewsList, CateNewsShow } from '@/components/admin/CategoryNewsAdmin'
import AuthWrapper from '@/components/admin/AuthWrapper'

// Custom Admin Dashboard
const Dashboard = () => {
  
  const handleLogout = async () => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất không?')
    if (!isConfirmed) return

    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      // Clear cookies
      document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout failed:', error)
      window.location.href = '/admin/login'
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header với nút logout */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div>
          <h1 style={{ margin: 0, color: 'white' }}>🎯 Nivex Admin Dashboard</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
            👋 Xin chào, <strong>adminnivex</strong> • 🕐 {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          🚪 Đăng xuất
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px'
      }}>
        {/* Quản lý khóa học  */}
        <a href='/admin#/courses' style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          color: '#fff', 
          textDecoration: 'none',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📚 Quản lý Khóa học</h3>
          <p style={{ margin: '0 0 10px 0', opacity: 0.9 }}>Tạo, chỉnh sửa và quản lý các khóa học crypto</p>
          <small style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '4px 8px', 
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>Truy cập</small>
        </a>
      
      {/* Quản lý bài đăng tin tức */}
        <a href='/admin#/courses' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Quản lý Bài viết</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa bài viết kiến thức</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>


          {/* Quản lý danh mục bài đăng */}
        <a href='/admin#/category_news' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Xem danh mục</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa tên danh mục</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>
        {/* <div style={{ 
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          color: '#8b4513' 
        }}>
          
      </div> */}
    </div>
    
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      background: '#f8f9fa', 
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{ color: '#495057', marginBottom: '15px' }}>Hướng dẫn sử dụng</h3>
      <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
        <li><strong>Thêm khóa học:</strong> Click vào "Quản lý Khóa học" → "Tạo khóa học mới"</li>
        <li><strong>Chỉnh sửa:</strong> Click vào nút "Sửa" bên cạnh khóa học cần chỉnh sửa</li>
        <li><strong>Xem chi tiết:</strong> Click vào tên khóa học hoặc nút "Xem"</li>
        <li><strong>Tìm kiếm:</strong> Sử dụng ô tìm kiếm và các bộ lọc</li>
        <li><strong>Xóa:</strong> Click nút "Xóa" (cần xác nhận)</li>
      </ul>
    </div>
  </div>
  )
}

export default function AdminPage() {
  return (
    <AuthWrapper>
      <Admin 
        dataProvider={dataProvider}
        dashboard={Dashboard}
        title="🎯 Nivex Admin"
        theme={{
          palette: {
            mode: 'light',
            primary: {
              main: '#667eea',
            },
            secondary: {
              main: '#764ba2',
            },
          },
        }}
      >
        {/* Courses Management with full CRUD */}
        <Resource 
          name="courses" 
          list={CourseList}
          create={CourseCreate}
          edit={CourseEdit}
          show={CourseShow}
          options={{ label: '📚 Khóa học' }}
        />
        <Resource 
          name="news" 
          list={NewsList}
          create={NewsCreate}
          edit={NewsEdit}
          show={NewsShow}
          options={{ label: '📚 Tin tức' }}
        />
        <Resource 
          name="category_news" 
          list={CateNewsList}
          create={CateNewsCreate}
          edit={CateNewsEdit}
          show={CateNewsShow}
          options={{ label: 'Danh mục bài đăng' }}
        />
      </Admin>
    </AuthWrapper>
  )
}