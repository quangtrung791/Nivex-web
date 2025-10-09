-- Schema cho bảng event Nivex đã tham dự 
CREATE TABLE IF NOT EXISTS joined_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  tag1 VARCHAR(50) NOT NULL,
  tag2 VARCHAR(50) NOT NULL,
  tag3 VARCHAR(50) NOT NULL,
  type VARCHAR(25) NOT NULL,
  short_desc TEXT,
  content TEXT,
  thumbnail_url VARCHAR(500),
  time_event TIMESTAMP NOT NULL, -- ngày diễn ra
  time_from_and_to VARCHAR (50) NOT NULL, -- thời gian Từ 12:00 - 14:00

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX IF NOT EXISTS idx_joined_events_title ON joined_events(title);
CREATE INDEX IF NOT EXISTS idx_joined_events_short_desc ON joined_events(short_desc);