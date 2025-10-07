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
    const offset = parseInt(searchParams.get('offset') || '0')
    const limit = parseInt(searchParams.get('limit') || '6')

    // Base WHERE condition
    let baseWhere = `WHERE k.status = 'active' AND (kt.status = 'active' OR kt.status IS NULL)`
    
    const queryParams = []
    let paramIndex = 1

    // Build filter conditions
    let additionalFilters = ''
    if (topic) {
      additionalFilters += ` AND kt.name = $${paramIndex}`
      queryParams.push(topic)
      paramIndex++
    }

    if (difficulty) {
      additionalFilters += ` AND k.difficulty = $${paramIndex}`
      queryParams.push(difficulty)
      paramIndex++
    }

    if (search) {
      additionalFilters += ` AND (k.title ILIKE $${paramIndex} OR k.content ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }

    const fullWhere = baseWhere + additionalFilters

    // First, get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM knowledge k
      LEFT JOIN knowledge_topics kt ON k.topic_id = kt.id
      ${fullWhere}
    `
    const countResult = await query(countQuery, queryParams)
    const totalCount = parseInt(countResult[0]?.total || 0)

    // Then get paginated results
    let sqlQuery = `
      SELECT 
        k.id, k.title, k.difficulty, k.status, k.content, k.image_url, 
        k.created_at, k.updated_at,
        kt.name as topic
      FROM knowledge k
      LEFT JOIN knowledge_topics kt ON k.topic_id = kt.id
      ${fullWhere}
      ORDER BY k.created_at DESC 
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    
    queryParams.push(limit, offset)
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
      description: article.topic,
      readTime: `${Math.max(3, Math.ceil(article.content?.length / 200) || 5)} phút đọc`,
      publishDate: formatDate(article.created_at),
      created_at: article.created_at,
      updated_at: article.updated_at
    }))


    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        total: totalCount,
        offset: offset,
        limit: limit,
        hasMore: offset + limit < totalCount
      }
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

function formatDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0]
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}