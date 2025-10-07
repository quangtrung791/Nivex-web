-- Schema cho bảng news (tin tức)
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  -- category JSONB NOT NULL DEFAULT '[]',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  content TEXT,
  thumbnail_url VARCHAR(500),
  author VARCHAR(150) NOT NULL DEFAULT 'admin',
  time_upload TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  category_id SERIAL
);

-- Index cho tìm kiếm (cập nhật)
CREATE INDEX IF NOT EXISTS idx_news_title ON news(title);
CREATE INDEX IF NOT EXISTS idx_news_content ON news(content);

-- ###########################################
-- Schema cho category news (danh mục tin tức)
CREATE TABLE IF NOT EXISTS cate_news (
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho tìm kiếm (cập nhật)
CREATE INDEX IF NOT EXISTS idx_catenews_name ON cate_news(name);


DROP INDEX public.idx_news_content;
