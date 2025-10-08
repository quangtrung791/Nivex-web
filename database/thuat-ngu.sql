-- Schema cho bảng dictionary (từ điển thuật ngữ)
CREATE TABLE IF NOT EXISTS dictionary (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL,
  keyword VARCHAR(500) NOT NULL,
  short_desc VARCHAR(500) NOT NULL,
  description TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho tìm kiếm
CREATE INDEX IF NOT EXISTS idx_dictionary_keyword ON dictionary(keyword);