-- Schema cho bảng knowledge articles
CREATE TABLE IF NOT EXISTS knowledge (
  id SERIAL PRIMARY KEY,
  title VARCHAR(350) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  difficulty VARCHAR(50) NOT NULL DEFAULT 'easy',
  content TEXT,
  image_url VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho tìm kiếm và filter
CREATE INDEX IF NOT EXISTS idx_knowledge_title ON knowledge(title);
CREATE INDEX IF NOT EXISTS idx_knowledge_status ON knowledge(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_difficulty ON knowledge(difficulty);

-- Step 1: Add new topic_id column
ALTER TABLE knowledge ADD COLUMN IF NOT EXISTS topic_id INTEGER;

-- Step 5: Create index for performance
CREATE INDEX IF NOT EXISTS idx_knowledge_topic_id ON knowledge(topic_id);