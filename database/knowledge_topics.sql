-- Schema cho bảng knowledge_topics (Chủ đề kiến thức)
CREATE TABLE IF NOT EXISTS knowledge_topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
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


