import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/news called");
    
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const search = searchParams.get('search') || ''

    let sqlQuery = `
      SELECT 
        id,
        title,
        status,
        thumbnail_url,
        time_upload,
        created_at,
        updated_at,
        category_id
      FROM public.news
      WHERE public.news.status = 'active'
      `

    const queryParams = []
    let paramIndex = 1

    // Apply search filter
    if (search.trim()) {
      sqlQuery += ` AND (title ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }


  // Order by start date and limit to 50 records
  sqlQuery += ` ORDER BY time_upload DESC LIMIT 50`

    console.log("Executing query:", { sqlQuery, queryParams });
    const result = await query(sqlQuery, queryParams)

    // Process courses data
    const news = result.map(n => {
      const now = new Date()
      const startDate = new Date(n.start_date)
      const timeUpload = n.time_upload

      return {
        id: n.id,
        title: n.title,
        category_id: n.category_id,
        status: n.status,
        time_upload: n.time_upload,
        // content: n.content,
        thumbnail_url: n.thumbnail_url
      }
    })

    console.log("Returning news:", news.length);

    return NextResponse.json({
      success: true,
      data: news
    })

  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải danh sách tin tức',
        details: error.message
      },
      { status: 500 }
    )
  }
}