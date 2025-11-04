import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { sendEmail } from '@/lib/emailService'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const WP_BASE_URL = process.env.WP_BASE_URL || 'https://nivexhub.learningchain.vn/'
const WP_AUTH = process.env.WP_APP_PASS_B64 || ''

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
              <p>Bạn đã đăng ký nhận bản tin và thông báo mới nhất từ <strong>nivex.info</strong>.</p>
              <p>Hãy thường xuyên kiểm tra hộp thư để không bỏ lỡ các khóa học và tin tức hấp dẫn nhé!</p>
          </div>
          <div class="footer">
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
Xin chào ${email},

Cảm ơn bạn đã đăng ký nhận bản tin từ nivex.info.
Hãy thường xuyên kiểm tra hộp thư để cập nhật tin tức mới nhất!

Trân trọng,
Đội ngũ Nivex
  `

  return { html: htmlTemplate, text: textTemplate }
}

const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '')

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body || {}

    // Validate
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập địa chỉ email.' },
        { status: 400 }
      )
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Địa chỉ email không hợp lệ.' },
        { status: 400 }
      )
    }
    if (!WP_BASE_URL) {
      return NextResponse.json(
        { success: false, error: 'Thiếu cấu hình WP_BASE_URL' },
        { status: 500 }
      )
    }

    // Gọi WP REST để tạo subscribe
    const endpoint = `${WP_BASE_URL}/wp-json/nivex/v1/subscribe`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(WP_AUTH ? { Authorization: `Basic ${WP_AUTH}` } : {}),
      },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok || !json?.success) {
      // map lỗi phổ biến
      if (res.status === 409) {
        return NextResponse.json(
          { success: false, error: 'Email này đã đăng ký trước đó.' },
          { status: 409 }
        )
      }
      const msg = json?.error || 'Không thể đăng ký'
      return NextResponse.json({ success: false, error: msg }, { status: res.status || 500 })
    }

    // Gửi email cảm ơn (không block nếu fail)
    const { html, text } = generateFooterSubscribeEmail(email)
    sendEmail(
      email,
      'Cảm ơn bạn đã đăng ký nhận bản tin nivex.info!',
      html,
      text
    ).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'Đăng ký nhận tin thành công! Vui lòng kiểm tra email của bạn.',
      data: json.data || null,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi xử lý yêu cầu.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}