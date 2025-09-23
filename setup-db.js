import sql from './lib/db.js';

(async () => {
  try {
    // Create courses table
    await sql`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        type VARCHAR(50) DEFAULT 'online',
        category JSONB DEFAULT '[]'::jsonb,
        level VARCHAR(100) DEFAULT '',
        date VARCHAR(20) DEFAULT '',
        status VARCHAR(50) DEFAULT 'available',
        button_text VARCHAR(100) DEFAULT 'Đăng ký ngay',
        content TEXT DEFAULT '',
        image_url VARCHAR(500) DEFAULT '',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Courses table created successfully!');
    
    // Insert sample data
    await sql`
      INSERT INTO courses (title, type, category, level, date, status, button_text, content, image_url)
      VALUES 
        ('Điều khiển lãi sóng tăng trưởng mới - Đóng bộ với các cơ chức tài chính toàn cầu', 'online', '["Hợp đồng", "Spot", "Copy Trade"]', 'Hạn chế', '01/09/2025', 'available', 'Đăng ký ngay', 'Những nhà đầu tư khôn ngoan không chờ thị trường ổn định mới hành động, mà họ đa dạng hóa danh mục ngay từ bây giờ để vừa bảo vệ vốn, vừa săn tìm lợi nhuận.', ''),
        ('Bí mật giúp tài khoản tăng trưởng ổn định 12-17% hàng tháng', 'offline', '["Hợp đồng", "Spot", "Copy Trade"]', 'Hạn chế', '01/09/2025', 'full', 'Hết hạn đăng ký', 'Khóa học chuyên sâu về quản lý rủi ro và tối ưu hóa lợi nhuận trong giao dịch crypto.', ''),
        ('Khóa học giao dịch crypto nâng cao - Phân tích kỹ thuật chuyên sâu', 'online', '["Futures", "Copy Trade"]', 'Nâng cao', '15/09/2025', 'available', 'Đăng ký ngay', 'Học cách đọc biểu đồ, phân tích xu hướng và đưa ra quyết định giao dịch chính xác.', '')
      ON CONFLICT (id) DO NOTHING
    `;
    
    console.log('✅ Sample courses inserted successfully!');
    
    // Check data
    const courses = await sql`SELECT * FROM courses`;
    console.log('📊 Current courses in database:', courses.length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup error:', error);
    process.exit(1);
  }
})();