import { NextResponse } from 'next/server'
import { sendEmail } from "@/lib/emailService"


const WP_BASE_URL = process.env.WP_BASE_URL || 'https://nivexhub.learningchain.vn/'
const WP_AUTH = process.env.WP_APP_PASS_B64 || ''
export const runtime = 'nodejs';

// Generate course registration email template (Local to course registration)
const generateCourseRegistrationEmail = (registrationData) => {
  const { fullName, courseName, courseDate, courseTime, zoomLink, registrationId } = registrationData

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận đăng ký khóa học</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #BCFE08, #86F969);
            color: #000;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .course-info {
            background: #f8f9fa;
            border-left: 4px solid #BCFE08;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .course-info h3 {
            margin-top: 0;
            color: #333;
            font-size: 20px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #666;
        }
        .info-value {
            color: #333;
        }
        .zoom-button {
            display: inline-block;
            background: linear-gradient(135deg, #BCFE08, #86F969);
            color: #000;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #BCFE08;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 4px;
            }
            .header, .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Chào mừng bạn đến với Nivex!</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Thông tin khóa học của bạn</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Chào <strong>${fullName}</strong>,
            </div>
            
            <p>Cảm ơn bạn đã đăng ký khóa học tại <strong>Nivex</strong>! Chúng tôi rất vui khi có bạn tham gia.</p>
            
            <div class="course-info">
                <h3>📚 Thông tin khóa học</h3>
                <div class="info-row">
                    <span class="info-label">Tên khóa học: </span>
                    <span class="info-value">${courseName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Ngày học: </span>
                    <span class="info-value">${courseDate}</span>
                </div>
                ${courseTime ? `
                <div class="info-row">
                    <span class="info-label">Thời gian: </span>
                    <span class="info-value">${courseTime}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="info-label">Mã đăng ký: </span>
                    <span class="info-value">#${registrationId}</span>
                </div>
            </div>
            
            ${zoomLink ? `
            <div style="text-align: center;">
                <a href="${zoomLink}" class="zoom-button" target="_blank">
                    🎥 Tham gia Zoom Meeting
                </a>
                <p style="color: #666; font-size: 14px;">
                    <strong>Lưu ý:</strong> Vui lòng tham gia đúng giờ để không bỏ lỡ nội dung quan trọng.
                </p>
            </div>
            ` : `
            <div style="text-align: center; padding: 20px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffeeba;">
                <p style="color: #856404; margin: 0;">
                    <strong>📞 Link Zoom sẽ được gửi trước buổi học 24 giờ.</strong><br>
                    Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
                </p>
            </div>
            `}
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 6px; border-left: 4px solid #007bff;">
                <h4 style="margin-top: 0; color: #007bff;">🎯 Chuẩn bị cho buổi học:</h4>
                <ul style="margin-bottom: 0;">
                    <li>Chuẩn bị máy tính/điện thoại có kết nối internet ổn định</li>
                    <li>Kiểm tra âm thanh và video trước khi vào lớp</li>
                    <li>Chuẩn bị sẵn câu hỏi nếu có</li>
                </ul>
            </div>
            
            <p>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua email này hoặc hotline: <strong>0974 743 849</strong></p>
            
            <p>Chúc bạn có trải nghiệm học tập tuyệt vời!</p>
            
            <p style="margin-top: 30px;">
                Trân trọng,<br>
                <strong>Đội ngũ Nivex</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>Email này được gửi tự động từ hệ thống Nivex</p>
            <p>© 2025 Nivex. All rights reserved.</p>
            <p>
                <a href="mailto:nivexvietnam@gmail.com">nivexvietnam@gmail.com</a> | 
                <a href="https://nivex.info">nivex.info</a>
            </p>
        </div>
    </div>
</body>
</html>
  `

  const textTemplate = `
    Kính chào ${fullName},

    Cảm ơn bạn đã đăng ký khóa học tại Học viện Nivex. Chúng tôi xin gửi thông tin chi tiết về khóa học mà bạn đã đăng ký.

    THÔNG TIN KHÓA HỌC:
    Tên khóa học: ${courseName}
    Ngày bắt đầu: ${courseDate}
    ${courseTime ? `Thời gian: ${courseTime}` : ''}
    Mã số đăng ký: ${registrationId}

    ${zoomLink ? `
    THÔNG TIN THAM GIA:
    Link tham gia: ${zoomLink}

    Lưu ý: Vui lòng tham gia đúng thời gian để không bỏ lỡ nội dung học tập quan trọng.
    ` : `
    THÔNG TIN LIÊN HỆ:
    Link tham gia lớp học sẽ được gửi đến bạn trước 24 giờ.
    Bộ phận hỗ trợ sẽ liên hệ với bạn trong thời gian sớm nhất.
    `}

    HƯỚNG DẪN CHUẨN BỊ:
    - Chuẩn bị thiết bị máy tính hoặc điện thoại có kết nối internet ổn định
    - Kiểm tra chức năng âm thanh và video trước khi tham gia
    - Chuẩn bị sẵn các câu hỏi để trao đổi trong buổi học

    Nếu bạn có thắc mắc, xin vui lòng liên hệ với chúng tôi qua email support@nivex.info hoặc số hotline 1900-xxxx

    Trân trọng,
    Học viện Đào tạo Nivex
    Website: https://nivex.info
  `

  return { html: htmlTemplate, text: textTemplate }
}

// Gửi email xác nhận (không làm fail đăng ký nếu email lỗi)
async function sendCourseRegistrationEmailRouter(email, registrationData) {
  try {
    const { html, text } = generateCourseRegistrationEmail(registrationData)
    const subject = `Thông tin khóa học${registrationData.courseName ? ` ${registrationData.courseName}` : ''} - nivex.info`
    return await sendEmail(email, subject, html, text)
  } catch (error) {
    return { success: false, message: 'Failed to send email', error: error.message }
  }
}

// Helpers validate
const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '')
const isValidVNPhone = (s) => /^(?:\+84|84|0)[3-9]\d{8}$/.test(String(s || '').replace(/\s/g, ''))

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      courseId,             // bắt buộc để lưu WP
      fullName,
      email,
      phone,
      courseName,
      courseDate,
      courseTime,
      zoomLink, 
    } = body || {}

    // Validate tối thiểu
    if (!courseId || !fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      )
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ email không hợp lệ' },
        { status: 400 }
      )
    }
    if (!isValidVNPhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      )
    }

    // Gọi WordPress REST để lưu đăng ký
    if (!WP_BASE_URL) {
      return NextResponse.json(
        { success: false, error: 'Thiếu cấu hình WP_BASE_URL' },
        { status: 500 }
      )
    }

    const wpRes = await fetch(`${WP_BASE_URL}/wp-json/nivex/v1/course-registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(WP_AUTH ? { Authorization: `Basic ${WP_AUTH}` } : {}),
      },
      body: JSON.stringify({
        course_id: courseId,
        full_name: fullName,
        email,
        phone,
      }),
      cache: 'no-store',
    })

    const wpJson = await wpRes.json().catch(() => ({}))

    if (!wpRes.ok || !wpJson?.success) {
      const status = wpRes.status || 500
      const message = wpJson?.error || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.'
      return NextResponse.json({ success: false, error: message }, { status })
    }

    // Gửi email xác nhận (không block request nếu lỗi)
    const registrationId = wpJson?.data?.id
    sendCourseRegistrationEmailRouter(email, {
      fullName,
      courseName,
      courseDate,
      courseTime,
      zoomLink,
      registrationId,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Vui lòng kiểm tra email để xem thông tin chi tiết.',
      data: {
        registrationId,
        courseName: courseName || null,
        registeredAt: wpJson?.data?.registered_at || null,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      },
      { status: 500 }
    )
  }
}