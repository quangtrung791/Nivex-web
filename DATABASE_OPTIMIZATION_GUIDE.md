# 🚀 Database Performance Optimization Guide

## 📊 **So sánh hiệu suất:**

### ❌ **Code cũ (chậm):**
```javascript
// Mỗi query tạo connection mới
const client = await createDbClient()
await client.connect()
const result = await client.query(sql)
await client.end() // Đóng connection
```
**Thời gian:** 200-500ms mỗi query

### ✅ **Code mới (nhanh):**
```javascript
// Sử dụng connection pool
const pool = getPool()
const result = await pool.query(sql)
```
**Thời gian:** 5-50ms mỗi query

## 🔧 **Cách sử dụng các phiên bản:**

### 1. **Phiên bản cơ bản (neon.js):**
```javascript
import { query } from '@/app/lib/neon'

// Sử dụng như bình thường
const users = await query('SELECT * FROM users WHERE id = $1', [userId])
```

### 2. **Phiên bản với caching (neon-ultra-optimized.js):**
```javascript
import { queryCached, queryWrite } from '@/app/lib/neon-ultra-optimized'

// Cho read operations (có cache)
const users = await queryCached('SELECT * FROM users WHERE status = $1', ['active'])

// Cho write operations (không cache)
await queryWrite('INSERT INTO users (name) VALUES ($1)', ['John'])
```

## ⚡ **Tối ưu hóa thêm:**

### 1. **Sử dụng indexes:**
```sql
-- Tạo index cho các cột thường xuyên query
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_knowledge_topic ON knowledge(topic_id);
CREATE INDEX idx_knowledge_status ON knowledge(status);
```

### 2. **Optimize queries:**
```javascript
// ❌ Chậm - N+1 queries
for (const user of users) {
  const posts = await query('SELECT * FROM posts WHERE user_id = $1', [user.id])
}

// ✅ Nhanh - Single query với JOIN
const usersWithPosts = await query(`
  SELECT u.*, p.title as post_title 
  FROM users u 
  LEFT JOIN posts p ON u.id = p.user_id
`)
```

### 3. **Sử dụng pagination:**
```javascript
// ❌ Chậm - Load tất cả
const allUsers = await query('SELECT * FROM users')

// ✅ Nhanh - Pagination
const users = await query(`
  SELECT * FROM users 
  ORDER BY created_at DESC 
  LIMIT $1 OFFSET $2
`, [limit, offset])
```

## 📈 **Monitoring hiệu suất:**

### 1. **Health check:**
```javascript
import { healthCheck } from '@/app/lib/neon'

// Kiểm tra trạng thái database
const health = await healthCheck()
console.log('Database health:', health)
```

### 2. **Cache stats:**
```javascript
import { getCacheStats } from '@/app/lib/neon-ultra-optimized'

// Xem thống kê cache
const stats = getCacheStats()
console.log('Cache stats:', stats)
```

## 🎯 **Kết quả mong đợi:**

- **Tốc độ query:** Tăng 5-10 lần
- **Memory usage:** Giảm 30-50%
- **Concurrent requests:** Tăng 3-5 lần
- **Database connections:** Giảm từ 100+ xuống 2-20

## 🔍 **Debugging:**

### 1. **Slow query detection:**
```javascript
// Tự động log queries chậm > 1s
🐌 Slow query detected (1250ms): SELECT * FROM knowledge WHERE...
```

### 2. **Connection pool monitoring:**
```javascript
const health = await healthCheck()
console.log('Pool stats:', health.poolStats)
// Output: { totalCount: 5, idleCount: 3, waitingCount: 0 }
```

## 🚨 **Lưu ý quan trọng:**

1. **Không sử dụng cache cho write operations**
2. **Monitor memory usage** với cache
3. **Set appropriate pool size** dựa trên traffic
4. **Use prepared statements** cho queries lặp lại
5. **Close pool gracefully** khi shutdown app
