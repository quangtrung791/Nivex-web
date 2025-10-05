'use client'
import { Admin, Resource } from 'react-admin'
import { dataProvider } from '@/lib/dataProvider'
import { CourseList, CourseCreate, CourseEdit, CourseShow } from '@/components/admin/CourseAdmin'
import { KnowledgeTopicsList, KnowledgeTopicsCreate, KnowledgeTopicsEdit, KnowledgeTopicsShow } from '@/components/admin/KnowledgeTopicsAdmin'
import { NewsList, NewsCreate, NewsEdit, NewsShow } from '@/components/admin/NewsAdmin'
import { CateNewsCreate, CateNewsEdit, CateNewsList, CateNewsShow } from '@/components/admin/CategoryNewsAdmin'
import { KnowledgeList, KnowledgeCreate, KnowledgeEdit, KnowledgeShow } from '@/components/admin/KnowledgeAdmin'
import { EventList, EventCreate, EventEdit, EventShow } from '@/components/admin/EventAdmin'
import { JoinedEventList, JoinedEventCreate, JoinedEventEdit, JoinedEventShow } from '@/components/admin/JoinedEventAdmin'
import { DictionaryCreate, DictionaryEdit, DictionaryShow, DictionaryList } from '@/components/admin/DictionaryAdmin';
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
      
        {/* Quản lý kiến thức */}
        <a href='/admin#/knowledge' style={{ 
          background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          color: '#fff', 
          textDecoration: 'none',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>🧠 Quản lý Kiến thức</h3>
          <p style={{ margin: '0 0 10px 0', opacity: 0.9 }}>Tạo và quản lý bài viết kiến thức chuyên sâu</p>
          <small style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '4px 8px', 
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>Truy cập</small>
        </a>

        {/* Quản lý chủ đề kiến thức */}
        <a href='/admin#/knowledge_topics' style={{ 
          background: 'linear-gradient(135deg, #8e24aa 0%, #7b1fa2 100%)', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          color: '#fff', 
          textDecoration: 'none',
          transition: 'transform 0.2s'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📂 Chủ đề Kiến thức</h3>
          <p style={{ margin: '0 0 10px 0', opacity: 0.9 }}>Quản lý danh mục và chủ đề bài viết kiến thức</p>
          <small style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '4px 8px', 
            borderRadius: '12px',
            fontSize: '0.8em'
          }}>Truy cập</small>
        </a>

      {/* Quản lý bài đăng tin tức */}
        <a href='/admin#/news' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Quản lý Bài tin tức</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa bài viết tin tức</p>
            <small style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>
          </a>


          {/* Quản lý Danh mục tin tức */}
        <a href='/admin#/category_news' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Danh mục tin tức</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa tên danh mục tin tức</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>


          {/* Quản lý sự kiện */}
        <a href='/admin#/events' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Quản lý Sự kiện</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa Sự kiện</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>

          {/* Quản lý sự kiện Nivex tham gia */}
        <a href='/admin#/joined_events' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Quản lý Sự kiện Nivex tham gia</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa Sự kiện</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>


          {/* Quản lý từ khóa thuật ngữ  */}
        <a href='/admin#/dictionary' style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            color: '#fff', 
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4em' }}>📝 Xem thuật ngữ</h3>
            <p style={{ margin: '0 0 10px 0', opacity: 0.8 }}>Tạo và chỉnh sửa thuật ngữ</p>
            <small style={{ 
              background: 'rgba(139,69,19,0.2)', 
              padding: '4px 8px', 
              borderRadius: '12px',
              fontSize: '0.8em'
            }}>Truy cập</small>

          </a>
    </div>
    
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      background: '#f8f9fa', 
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{ color: '#495057', marginBottom: '15px' }}>Hướng dẫn sử dụng NivexHub Admin Panel</h3>
      <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
        <li><strong>Thêm khóa học:</strong> Click vào một module cần quản lý (Ví dụ: "Quản lý Khóa học" → "Tạo khóa học mới" để tạo khóa học hoàn toàn mới)</li>
        <li><strong>Chỉnh sửa:</strong> Click vào nút "Sửa" bên cạnh khóa học cần chỉnh sửa</li>
        <li><strong>Xem chi tiết:</strong> Click vào tên khóa học hoặc nút "Xem"</li>
        <li><strong>Tìm kiếm:</strong> Sử dụng ô tìm kiếm và các bộ lọc</li>
        <li><strong>Xóa:</strong> Click nút "Xóa" (cần xác nhận bởi admin)</li>
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
        
        {/* Knowledge Management with full CRUD */}
        <Resource 
          name="knowledge" 
          list={KnowledgeList}
          create={KnowledgeCreate}
          edit={KnowledgeEdit}
          show={KnowledgeShow}
          options={{ label: '🧠 Kiến thức' }}
        />
        
        {/* Knowledge Topics Management */}
        <Resource 
          name="knowledge_topics" 
          list={KnowledgeTopicsList}
          create={KnowledgeTopicsCreate}
          edit={KnowledgeTopicsEdit}
          show={KnowledgeTopicsShow}
          options={{ label: '📂 Chủ đề Kiến thức' }}
        />
        
        <Resource 
          name="news" 
          list={NewsList}
          create={NewsCreate}
          edit={NewsEdit}
          show={NewsShow}
          options={{ label: '� Tin tức' }}
        />
        <Resource 
          name="category_news" 
          list={CateNewsList}
          create={CateNewsCreate}
          edit={CateNewsEdit}
          show={CateNewsShow}
          options={{ label: '📂 Danh mục tin tức' }}
        />
        <Resource 
          name="events" 
          list={EventList}
          create={EventCreate}
          edit={EventEdit}
          show={EventShow}
          options={{ label: 'Sự kiện tại Nivex' }}
        />
        <Resource 
          name="joined_events" 
          list={JoinedEventList}
          create={JoinedEventCreate}
          edit={JoinedEventEdit}
          show={JoinedEventShow}
          options={{ label: 'Sự kiện Nivex đã tham dự' }}
        />
        <Resource 
          name="dictionary" 
          list={DictionaryList}
          create={DictionaryCreate}
          edit={DictionaryEdit}
          show={DictionaryShow}
          options={{ label: 'Quản lý Thuật ngữ' }}
        />
      </Admin>
    </AuthWrapper>
  )
}