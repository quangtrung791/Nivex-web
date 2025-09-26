-- Migration: Update knowledge table to use topic_id instead of topic string
-- Step 1: Add new topic_id column
ALTER TABLE knowledge ADD COLUMN IF NOT EXISTS topic_id INTEGER;

-- Step 2: Create mapping from old topic strings to new topic_ids
UPDATE knowledge SET topic_id = (
  CASE 
    WHEN topic = 'blockchain' THEN (SELECT id FROM knowledge_topics WHERE name = 'Blockchain')
    WHEN topic = 'defi' THEN (SELECT id FROM knowledge_topics WHERE name = 'DeFi') 
    WHEN topic = 'copy_trade' THEN (SELECT id FROM knowledge_topics WHERE name = 'Copy Trade')
    WHEN topic = 'ai' THEN (SELECT id FROM knowledge_topics WHERE name = 'AI')
    WHEN topic = 'nft' THEN (SELECT id FROM knowledge_topics WHERE name = 'NFT')
    WHEN topic = 'trading' THEN (SELECT id FROM knowledge_topics WHERE name = 'Trading')
    ELSE (SELECT id FROM knowledge_topics WHERE name = 'Blockchain') -- Default fallback
  END
) WHERE topic_id IS NULL;

-- Step 3: Add foreign key constraint
ALTER TABLE knowledge 
ADD CONSTRAINT fk_knowledge_topic 
FOREIGN KEY (topic_id) REFERENCES knowledge_topics(id) ON DELETE SET NULL;

-- Step 4: Make topic_id NOT NULL (after data migration)
ALTER TABLE knowledge ALTER COLUMN topic_id SET NOT NULL;

-- Step 5: Create index for performance
CREATE INDEX IF NOT EXISTS idx_knowledge_topic_id ON knowledge(topic_id);

-- Step 6: (Optional) Drop old topic column after confirming migration works
-- ALTER TABLE knowledge DROP COLUMN IF EXISTS topic;

-- Note: Keep old column temporarily for rollback safety
-- You can manually drop it later: ALTER TABLE knowledge DROP COLUMN topic;