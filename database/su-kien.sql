-- Schema cho bảng event (sự kiện)
CREATE TABLE IF NOT EXISTS event (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(500) NOT NULL,
  short_desc TEXT,
  content TEXT,
  thumbnail_url VARCHAR(500),
  time_event TIMESTAMP NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho tìm kiếm
CREATE INDEX IF NOT EXISTS idx_event_title ON event(title);

-- Sau này nên có thêm 1 bảng chứa dữ liệu của người tham gia cho từng sự kiện, với khóa ngoại liên kết là id của event (event_id)