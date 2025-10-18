-- Schema cho bảng knowledge articles
CREATE TABLE IF NOT EXISTS wpun_knowledge (
  id SERIAL PRIMARY KEY,
  title VARCHAR(350) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  difficulty VARCHAR(50) NOT NULL DEFAULT 'easy',
  content TEXT,
  image_url VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  topic_id TINYINT,
  slug VARCHAR(500) UNIQUE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
-- -- Step 1: Add new topic_id column
-- ALTER TABLE wpun_knowledge ADD COLUMN IF NOT EXISTS topic_id TINYINT;
-- ALTER TABLE wpun_knowledge ADD COLUMN IF NOT EXISTS slug VARCHAR(500) UNIQUE;



-- Step 2: Create index for performance
-- Index cho tìm kiếm và filter
CREATE INDEX IF NOT EXISTS idx_knowledge_title ON wpun_knowledge(title);
CREATE INDEX IF NOT EXISTS idx_knowledge_status ON wpun_knowledge(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_difficulty ON wpun_knowledge(difficulty);
CREATE INDEX IF NOT EXISTS idx_knowledge_topic_id ON wpun_knowledge(topic_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_slug ON wpun_knowledge(slug);





-- Run this script to update existing database

-- Add slug column if not exists
-- ALTER TABLE knowledge ADD COLUMN IF NOT EXISTS slug VARCHAR(500);

-- Create unique index for slug
-- CREATE UNIQUE INDEX IF NOT EXISTS idx_knowledge_slug_unique ON knowledge(slug);

-- Create regular index for performance
