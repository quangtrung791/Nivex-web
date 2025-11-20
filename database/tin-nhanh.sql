-- Schema cho bảng news (tin tức)
CREATE TABLE IF NOT EXISTS wpun_news_flash (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(500) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  content TEXT,
  thumbnail_url VARCHAR(500),
  time_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_hot TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Index cho tìm kiếm (cập nhật)
CREATE INDEX IF NOT EXISTS idx_news_flash_title ON wpun_news_flash(title);
CREATE INDEX IF NOT EXISTS idx_news_flash_status ON wpun_news_flash(status);
CREATE INDEX IF NOT EXISTS idx_news_flash_slug ON wpun_news_flash(slug);