import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/joined_events called");
    
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const search = searchParams.get('search') || ''

    let sqlQuery = `
      SELECT 
        id,
        title,
        content,
        short_desc,
        thumbnail_url,
        time_event,
        created_at,
        updated_at
      FROM public.joined_events
    `
    
    const queryParams = []
    let paramIndex = 1

    // Apply search filter
    if (search.trim()) {
      sqlQuery += ` AND (title ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }


  // Order by start date and limit to 20 records
  sqlQuery += ` ORDER BY time_event DESC LIMIT 20`

    console.log("Executing query:", { sqlQuery, queryParams });
    const result = await query(sqlQuery, queryParams)

    // Process courses data
    const events = result.map(n => {
    const now = new Date()
    const timeUpload = n.time_event

    return {
        id: n.id,
        title: n.title,
        time_event: n.time_event,
        content: n.content,
        short_desc: n.short_desc,
        thumbnail_url: n.thumbnail_url
      }
    })

    console.log("Returning data:", events.length);

    return NextResponse.json({
      success: true,
      data: events
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