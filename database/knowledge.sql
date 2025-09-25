-- Schema cho bảng knowledge articles
CREATE TABLE IF NOT EXISTS knowledge (
  id SERIAL PRIMARY KEY,
  title VARCHAR(350) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  topic VARCHAR(50) NOT NULL DEFAULT 'blockchain',
  difficulty VARCHAR(50) NOT NULL DEFAULT 'easy',
  content TEXT,
  image_url VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho tìm kiếm và filter
CREATE INDEX IF NOT EXISTS idx_knowledge_title ON knowledge(title);
CREATE INDEX IF NOT EXISTS idx_knowledge_status ON knowledge(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_topic ON knowledge(topic);
CREATE INDEX IF NOT EXISTS idx_knowledge_difficulty ON knowledge(difficulty);

-- Insert sample data
INSERT INTO knowledge (title, topic, difficulty, content, status) VALUES 
(
  'Blockchain là gì? Tìm hiểu công nghệ chuỗi khối từ cơ bản đến nâng cao',
  'blockchain',
  'easy',
  'Blockchain là một công nghệ lưu trữ dữ liệu theo chuỗi khối, mỗi khối chứa thông tin về các giao dịch và được liên kết với nhau bằng mã hóa.',
  'active'
),
(
  'Hướng dẫn sử dụng MetaMask: Ví crypto an toàn cho người mới',
  'blockchain', 
  'easy',
  'MetaMask là ví crypto phổ biến nhất hiện tại, giúp bạn lưu trữ và giao dịch các loại cryptocurrency một cách an toàn.',
  'active'
),
(
  'DeFi là gì? Tài chính phi tập trung và cơ hội đầu tư',
  'defi',
  'intermediate',
  'DeFi (Decentralized Finance) là hệ thống tài chính phi tập trung được xây dựng trên blockchain, không cần thông qua ngân hàng truyền thống.',
  'active'
),
(
  'Copy Trade: Chiến lược đầu tư thông minh cho người mới',
  'copy_trade',
  'easy', 
  'Copy Trade là phương pháp đầu tư bằng cách sao chép các lệnh giao dịch của những trader có kinh nghiệm.',
  'active'
),
(
  'AI trong Crypto: Ứng dụng trí tuệ nhân tạo trong giao dịch',
  'ai',
  'advanced',
  'Trí tuệ nhân tạo đang được ứng dụng rộng rãi trong việc phân tích thị trường và tự động hóa giao dịch crypto.',
  'active'
);