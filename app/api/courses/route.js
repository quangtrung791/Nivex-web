import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/courses called");
    
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const search = searchParams.get('search') || ''

    let sqlQuery = `
      SELECT 
        id,
        title,
        type,
        category,
        status,
        start_date,
        end_date,
        link_zoom,
        content,
        image_url,
        created_at,
        updated_at
      FROM public.courses
      WHERE public.courses.status = 'active'
    `

    const queryParams = []
    let paramIndex = 1

    // Apply search filter
    if (search.trim()) {
      sqlQuery += ` AND (title ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`
      queryParams.push(`%${search}%`)
      paramIndex++
    }

    // Apply status filter based on current date and course dates
    if (filter !== 'all') {
      const now = new Date()
      
      if (filter === 'online') { // Đang diễn ra
        sqlQuery += ` AND start_date <= $${paramIndex} AND (end_date IS NULL OR end_date >= $${paramIndex})`
        queryParams.push(now.toISOString())
        paramIndex++
      } else if (filter === 'offline') { // Sắp diễn ra
        sqlQuery += ` AND start_date > $${paramIndex}`
        queryParams.push(now.toISOString())
        paramIndex++
      } else if (filter === 'completed') { // Đã kết thúc
        sqlQuery += ` AND end_date < $${paramIndex}`
        queryParams.push(now.toISOString())
        paramIndex++
      }
    }

  // Order by start date and limit to 20 records
  sqlQuery += ` ORDER BY start_date DESC LIMIT 20`

    console.log("Executing query:", { sqlQuery, queryParams });
    const result = await query(sqlQuery, queryParams)

    // Process courses data
    const courses = result.map(course => {
      const now = new Date()
      const startDate = new Date(course.start_date)
      const endDate = course.end_date ? new Date(course.end_date) : null

      // Determine course status
      let courseStatus = 'available'
      let buttonText = 'Xem ngay'
      let buttonClass = ''
      
      if (endDate && endDate < now) {
        courseStatus = 'completed'
        buttonText = 'Xem lại'
        buttonClass = 'replay'
      } else if (startDate > now) {
        courseStatus = 'upcoming'
        buttonText = 'Xem ngay'
        buttonClass = ''
      } else {
        courseStatus = 'ongoing'
        buttonText = 'Xem ngay'
        buttonClass = ''
      }

      return {
        id: course.id,
        title: course.title,
        type: course.type,
        category: course.category || [],
        status: courseStatus,
        date: startDate.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
        start_date: course.start_date,
        end_date: course.end_date,
        link_zoom: course.link_zoom,
        content: course.content,
        image: course.image_url || '/assets/images/background/course_image_test1.png',
        buttonText: buttonText,
        buttonClass: buttonClass
      }
    })

    console.log("Returning courses:", courses.length);

    return NextResponse.json({
      success: true,
      data: courses
    })

  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải danh sách khóa học',
        details: error.message
      },
      { status: 500 }
    )
  }
}