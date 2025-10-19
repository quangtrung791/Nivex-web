-- Schema cho bảng event (sự kiện)
CREATE TABLE IF NOT EXISTS wpun_event (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(500) NOT NULL,
  short_desc VARCHAR(500),
  content TEXT,
  thumbnail_url VARCHAR(500),
  time_event TIMESTAMP NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Index cho tìm kiếm
CREATE INDEX IF NOT EXISTS idx_event_title ON event(title);

-- Sau này nên có thêm 1 bảng chứa dữ liệu của người tham gia cho từng sự kiện, với khóa ngoại liên kết là id của event (event_id)