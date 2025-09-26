import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/category_news called");
    
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    let sqlQuery = `
      SELECT 
        id,
        name,
        created_at,
        updated_at
      FROM public.cate_news
      WHERE 1=1
    `

    const queryParams = []
    let paramIndex = 1

    // Apply search filter
    if (search.trim()) {
      sqlQuery += ` AND (name ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }

    sqlQuery += ` ORDER BY created_at DESC LIMIT 20`

    console.log("Executing query:", { sqlQuery, queryParams });
    const result = await query(sqlQuery, queryParams)

    // Trả về đúng dữ liệu category
    const categories = result.map(c => ({
      id: c.id,
      name: c.name,
      created_at: c.created_at,
      updated_at: c.updated_at
    }))

    return NextResponse.json({
      success: true,
      data: categories
    })

  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải danh sách danh mục',
        details: error.message
      },
      { status: 500 }
    )
  }
}