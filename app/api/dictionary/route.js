import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/dictionary called");
    
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const search = searchParams.get('search') || ''

    let sqlQuery = `
      SELECT 
        id,
        keyword,
        short_desc,
        description,
        created_at,
        updated_at
      FROM public.dictionary`
    
    const queryParams = []
    let paramIndex = 1

    // Apply search filter
    if (search.trim()) {
      sqlQuery += ` AND (keyword ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }


  // Order by start date and limit to 20 records
  sqlQuery += ` ORDER BY created_at DESC LIMIT 20`

    console.log("Executing query:", { sqlQuery, queryParams });
    const result = await query(sqlQuery, queryParams)

    // Process courses data
    const dictionary = result.map(n => {
    // const now = new Date()
    // const timeUpload = n.time_event

    return {
        id: n.id,
        keyword: n.keyword,
        // time_event: n.time_event,
        short_desc: n.short_desc,
        description: n.description
        // 
        // thumbnail_url: n.thumbnail_url
      }
    })

    console.log("Returning data:", dictionary.length);

    return NextResponse.json({
      success: true,
      data: dictionary
    })

  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải danh sách sự kiện',
        details: error.message
      },
      { status: 500 }
    )
  }
}