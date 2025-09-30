-- Schema cho bảng event Nivex đã tham dự 
CREATE TABLE IF NOT EXISTS joined_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  short_desc TEXT,
  content TEXT,
  thumbnail_url VARCHAR(500),
  time_event TIMESTAMP NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
