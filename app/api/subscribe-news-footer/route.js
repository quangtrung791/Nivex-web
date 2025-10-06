import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { sendEmail } from '@/lib/emailService'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

// 📨 Hàm tạo nội dung email xác nhận đăng ký nhận tin tức
const generateFooterSubscribeEmail = (email) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đăng ký nhận bản tin Nivex</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #fff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header {
              background: linear-gradient(135deg, #BCFE08, #86F969);
              color: #000;
              text-align: center;
              padding: 30px;
          }
          .content {
              padding: 30px;
              color: #333;
          }
          .footer {
              background: #333;
              color: #fff;
              text-align: center;
              padding: 20px;
              font-size: 14px;
          }
          .footer a {
              color: #BCFE08;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Cảm ơn bạn đã đăng ký!</h1>
          </div>
          <div class="content">
              <p>Xin chào <strong>${email}</strong>,</p>
              <p>Bạn đã đăng ký nhận bản tin và thông báo mới nhất từ <strong>Nivex.vn</strong>.</p>
              <p>Hãy thường xuyên kiểm tra hộp thư để không bỏ lỡ các khóa học và tin tức hấp dẫn nhé!</p>
          </div>
          <div class="footer">
              <p>© 2025 Nivex. Tất cả quyền được bảo lưu.</p>
              <p>
                  <a href="mailto:nivexvietnam@gmail.com">nivexvietnam@gmail.com</a> |
                  <a href="https://nivex.vn">nivex.vn</a>
              </p>
          </div>
      </div>
  </body>
  </html>
  `

  const textTemplate = `
Xin chào ${email},

Cảm ơn bạn đã đăng ký nhận bản tin từ Nivex.vn.
Hãy thường xuyên kiểm tra hộp thư để cập nhật tin tức mới nhất!

Trân trọng,
Đội ngũ Nivex
  `

  return { html: htmlTemplate, text: textTemplate }
}

// 🧠 Xử lý POST request
export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body

    // 🔹 Kiểm tra dữ liệu bắt buộc
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập địa chỉ email.' },
        { status: 400 }
      )
    }

    // 🔹 Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ email không hợp lệ.' },
        { status: 400 }
      )
    }

    // 🔹 Kiểm tra trùng email
    const existing = await query('SELECT id FROM public.subscribe WHERE email = $1', [email])
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email này đã được đăng ký trước đó.' },
        { status: 409 }
      )
    }

    // 🔹 Thêm mới vào cơ sở dữ liệu
    // const id = randomUUID()
    // const result = await query(
    //   `INSERT INTO public.subscribe (id, email, registered_at)
    //    VALUES ($1, $2, NOW())
    //    RETURNING id, email, registered_at`,
    //   [id, email]
    // )
    const result = await query(
      `INSERT INTO public.subscribe (email, registered_at)
      VALUES ($1, NOW())
      RETURNING id, email, registered_at`,
      [email]
    )

    const data = Array.isArray(result) ? result[0] : result.rows?.[0] || null

    // 🔹 Gửi email xác nhận (không chặn request nếu lỗi)
    const { html, text } = generateFooterSubscribeEmail(email)
    sendEmail(
      email,
      'Cảm ơn bạn đã đăng ký nhận bản tin Nivex.vn!',
      html,
      text
    ).catch(console.error)

    // 🔹 Trả kết quả về client
    return NextResponse.json({
      success: true,
      message: 'Đăng ký nhận tin thành công! Vui lòng kiểm tra email của bạn.',
      // data: result.rows[0]
      data
    })
  } catch (error) {
    console.error('Subscribe Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi xử lý yêu cầu.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
