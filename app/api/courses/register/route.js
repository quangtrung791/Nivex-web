import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"
import { sendCourseRegistrationEmail } from "@/lib/emailService"

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json()
    const { courseId, fullName, email, phone } = body

    // Validate required fields
    if (!courseId || !fullName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vui lòng điền đầy đủ thông tin bắt buộc'
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Địa chỉ email không hợp lệ'
        },
        { status: 400 }
      )
    }

    // Validate phone format (Vietnam phone numbers)
    const phoneRegex = /^(\+84|84|0)[3-9]\d{8}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Số điện thoại không hợp lệ'
        },
        { status: 400 }
      )
    }

    // Check if course exists and get full course details
    const courseCheck = await query(
      'SELECT id, title, start_date, end_date, link_zoom FROM public.courses WHERE id = $1 AND status = $2',
      [courseId, 'active']
    )

    if (courseCheck.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Khóa học không tồn tại hoặc đã bị vô hiệu hóa'
        },
        { status: 404 }
      )
    }

    // Check for duplicate registration
    const existingRegistration = await query(
      'SELECT id FROM public.course_registrations WHERE course_id = $1 AND email = $2',
      [courseId, email]
    )

    if (existingRegistration.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email này đã được đăng ký cho khóa học'
        },
        { status: 409 }
      )
    }

    // Insert registration
    const result = await query(
      `INSERT INTO public.course_registrations (course_id, full_name, email, phone, registered_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id, registered_at`,
      [courseId, fullName, email, phone]
    )

    // Prepare data for email
    const course = courseCheck[0]
    const startDate = course.start_date ? new Date(course.start_date) : null
    
    const emailData = {
      fullName,
      courseName: course.title,
      courseDate: startDate ? startDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) : 'Chưa xác định',
      courseTime: startDate ? startDate.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      }) : null,
      zoomLink: course.link_zoom,
      registrationId: result[0].id
    }

    // Send registration confirmation email (don't fail the registration if email fails)
    try {
      const emailResult = await sendCourseRegistrationEmail(email, emailData)
    } catch (emailError) {
      // Continue with successful registration response even if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Vui lòng kiểm tra email để xem thông tin chi tiết.',
      data: {
        registrationId: result[0].id,
        courseName: course.title,
        registeredAt: result[0].registered_at
      }
    })

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}