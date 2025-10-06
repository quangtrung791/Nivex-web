-- Schema cho bảng dictionary (từ điển thuật ngữ)
CREATE TABLE IF NOT EXISTS subscribe (
  id SERIAL PRIMARY KEY,
  email VARCHAR(500) NOT NULL,

  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
