-- Script để fix quyền truy cập table courses
-- Chạy script này trong pgAdmin4 với user có quyền admin

-- 1. Kiểm tra user hiện tại và table owner
SELECT 
    current_user as current_user,
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename IN ('courses', 'test1');

-- 2. Xem user nào đang được Next.js sử dụng (từ connection string)
-- Thường là username trong DATABASE_URL

-- 3. Cấp quyền cho user Next.js (thay 'your_nextjs_user' bằng user thực tế)
-- GRANT ALL PRIVILEGES ON TABLE public.courses TO your_nextjs_user;

-- 4. Hoặc thay đổi owner của table courses
-- ALTER TABLE public.courses OWNER TO your_nextjs_user;

-- 5. Cấp quyền trên sequence (cho SERIAL)
-- GRANT USAGE, SELECT ON SEQUENCE courses_id_seq TO your_nextjs_user;

-- 6. Kiểm tra quyền sau khi cấp
SELECT 
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_schema = 'public' 
AND table_name = 'courses'
ORDER BY grantee, privilege_type;

-- 7. Nếu không biết user nào Next.js đang dùng, chạy này:
SELECT current_user;

-- 8. Alternative: Tạo lại table với user đúng
/*
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'online',
  category JSONB NOT NULL DEFAULT '[]',
  level VARCHAR(100),
  date VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'available',
  button_text VARCHAR(200),
  content TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm sample data
INSERT INTO courses (title, type, status, level, button_text, content) VALUES
('Khóa học Crypto cơ bản', 'online', 'active', 'Cơ bản', 'Đăng ký ngay', 'Tìm hiểu về tiền điện tử từ cơ bản'),
('Trading cho người mới', 'online', 'active', 'Trung cấp', 'Tham gia', 'Học cách giao dịch an toàn'),
('Blockchain nâng cao', 'online', 'active', 'Nâng cao', 'Khám phá', 'Hiểu sâu về công nghệ blockchain');
*/