-- Schema cho bảng knowledge_topics (Chủ đề kiến thức)
CREATE TABLE IF NOT EXISTS knowledge_topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Migration: Update knowledge table to use topic_id instead of topic string
-- Step 1: Add new topic_id column


-- Index cho tìm kiếm
CREATE INDEX IF NOT EXISTS idx_knowledge_topics_name ON knowledge_topics(name);
CREATE INDEX IF NOT EXISTS idx_knowledge_topics_status ON knowledge_topics(status);

-- Insert default topics
INSERT INTO knowledge_topics (name, description, status) VALUES 
('Blockchain', 'Công nghệ chuỗi khối và các khái niệm cơ bản', 'active'),
('DeFi', 'Tài chính phi tập trung (Decentralized Finance)', 'active'),
('Copy Trade', 'Chiến lược đầu tư copy trade và mirror trading', 'active'),
('AI', 'Trí tuệ nhân tạo trong crypto và trading', 'active')
ON CONFLICT (name) DO NOTHING;

-- Thêm trigger tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_knowledge_topics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_knowledge_topics_updated_at
  BEFORE UPDATE ON knowledge_topics
  FOR EACH ROW
  EXECUTE FUNCTION update_knowledge_topics_updated_at();