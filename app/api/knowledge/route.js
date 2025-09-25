import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs'

// GET /api/knowledge - Lấy danh sách bài viết kiến thức
export async function GET(request) {
  try {
    
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic')
    const difficulty = searchParams.get('difficulty')  
    const search = searchParams.get('search')

    let sqlQuery = `
      SELECT 
        id, title, topic, difficulty, status, content, image_url, 
        created_at, updated_at
      FROM knowledge 
      WHERE status = 'active'
    `
    
    const queryParams = []
    let paramIndex = 1

    // Add filters
    if (topic) {
      sqlQuery += ` AND topic = $${paramIndex}`
      queryParams.push(topic)
      paramIndex++
    }

    if (difficulty) {
      sqlQuery += ` AND difficulty = $${paramIndex}`
      queryParams.push(difficulty)
      paramIndex++
    }

    if (search) {
      sqlQuery += ` AND (title ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }

    // Order by created_at DESC and limit to 30 records
    sqlQuery += ` ORDER BY created_at DESC LIMIT 30`

    const result = await query(sqlQuery, queryParams)

    // Transform data to match frontend format (result is already an array with neon)
    const articles = result.map(article => ({
      id: article.id,
      title: article.title,
      category: article.topic, // Map topic to category for frontend compatibility
      topic: article.topic,
      difficulty: article.difficulty,
      status: article.status,
      content: article.content,
      image: article.image_url || "https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp",
      image_url: article.image_url,
      description: getTopicDisplayName(article.topic),
      readTime: `${Math.max(3, Math.ceil(article.content?.length / 200) || 5)} phút đọc`,
      publishDate: formatDate(article.created_at),
      created_at: article.created_at,
      updated_at: article.updated_at
    }))


    return NextResponse.json({
      success: true,
      data: articles
    })

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải danh sách kiến thức',
        details: error.message
      },
      { status: 500 }
    )
  }
}

// Helper functions
function getTopicDisplayName(topic) {
  const topicMap = {
    blockchain: 'Blockchain',
    defi: 'DeFi', 
    copy_trade: 'Copy Trade',
    ai: 'AI'
  }
  return topicMap[topic] || topic
}

function formatDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0]
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}