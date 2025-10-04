import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"
import { getVietnamTime, getCourseStatus } from '@/utils/timezone'

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    
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

    // Apply status filter based on Vietnam timezone
    if (filter !== 'all') {
      const vietnamTime = getVietnamTime()
      
      
      if (filter === 'online') { // Đang diễn ra
        sqlQuery += ` AND start_date <= $${paramIndex} AND (end_date IS NULL OR end_date >= $${paramIndex})`
        queryParams.push(vietnamTime.toISOString())
        paramIndex++
      } else if (filter === 'offline') { // Sắp diễn ra
        sqlQuery += ` AND start_date > $${paramIndex}`
        queryParams.push(vietnamTime.toISOString())
        paramIndex++
      } else if (filter === 'completed') { // Đã kết thúc
        sqlQuery += ` AND end_date < $${paramIndex}`
        queryParams.push(vietnamTime.toISOString())
        paramIndex++
      }
    }

  // Order by start date and limit to 30 records
  sqlQuery += ` ORDER BY start_date DESC LIMIT 30`
    const result = await query(sqlQuery, queryParams)

    // Process courses data với timezone utility
    const courses = result.map(course => {
      const startDate = new Date(course.start_date)
      // const endDate = course.end_date ? new Date(course.end_date) : null
      
      // Sử dụng utility function để xác định status
      const courseStatus = getCourseStatus(course.start_date, course.end_date)

      // Determine button text and class
      let buttonText = 'Xem ngay'
      let buttonClass = ''
      
      if (courseStatus === 'completed') {
        buttonText = 'Xem lại'
        buttonClass = 'replay'
      } else if (courseStatus === 'upcoming') {
        buttonText = 'Đăng ký ngay'
        buttonClass = 'upcoming'
      } else {
        buttonText = 'Xem ngay'
        buttonClass = 'active'
      }

      return {
        id: course.id,
        title: course.title,
        type: course.type,
        category: course.category || [],
        status: courseStatus,
        date: startDate.toLocaleDateString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
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

    return NextResponse.json({
      success: true,
      data: courses
    })

  } catch (error) {
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