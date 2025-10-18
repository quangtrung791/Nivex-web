-- Schema cho bảng news (tin tức)
CREATE TABLE IF NOT EXISTS wpun_news (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(500) NOT NULL,
  -- category JSONB NOT NULL DEFAULT '[]',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  content TEXT,
  thumbnail_url VARCHAR(500),
  author VARCHAR(150) NOT NULL DEFAULT 'admin',
  time_upload TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  category_id INT(20),
  shadow_id INT(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Index cho tìm kiếm (cập nhật)
CREATE INDEX IF NOT EXISTS idx_news_title ON wpun_news(title);

-- ###########################################
-- Schema cho category news (danh mục tin tức)
CREATE TABLE IF NOT EXISTS wpun_cate_news (
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Index cho tìm kiếm (cập nhật)
CREATE INDEX IF NOT EXISTS idx_catenews_name ON wpun_cate_news(name);

