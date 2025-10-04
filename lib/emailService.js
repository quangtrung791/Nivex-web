'use server'
import nodemailer from 'nodemailer'

// Environment variables
const SMTP_HOST = process.env.EMAIL_HOST
const SMTP_PORT = process.env.EMAIL_PORT
const SMTP_SECURE = process.env.EMAIL_SECURE
const SMTP_USER = process.env.EMAIL_USER
const SMTP_PASS = process.env.EMAIL_PASS
const SMTP_FROM = process.env.EMAIL_FROM
const SMTP_FROM_NAME = process.env.EMAIL_FROM_NAME

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT) || 465,
  secure: SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

// Email templates
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
                    <span class="info-label">Tên khóa học:</span>
                    <span class="info-value">${courseName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Ngày học:</span>
                    <span class="info-value">${courseDate}</span>
                </div>
                ${courseTime ? `
                <div class="info-row">
                    <span class="info-label">Thời gian:</span>
                    <span class="info-value">${courseTime}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="info-label">Mã đăng ký:</span>
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
            
            <p>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua email này hoặc hotline: <strong>1900-xxxx</strong></p>
            
            <p>Chúc bạn có trải nghiệm học tập tuyệt vời!</p>
            
            <p style="margin-top: 30px;">
                Trân trọng,<br>
                <strong>Đội ngũ Nivex</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>Email này được gửi tự động từ hệ thống Nivex</p>
            <p>© 2025 Nivex. Tất cả quyền được bảo lưu.</p>
            <p>
                <a href="mailto:support@nivex.com">support@nivex.com</a> | 
                <a href="https://nivex.com">nivex.com</a>
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

Nếu bạn có thắc mắc, xin vui lòng liên hệ với chúng tôi qua email support@nivex.com hoặc số hotline 1900-xxxx

Trân trọng,
Học viện Đào tạo Nivex
Website: https://nivex.com
  `

  return { html: htmlTemplate, text: textTemplate }
}

// Test email configuration
export async function testEmailConfiguration() {
  try {
    console.log('🧪 Testing email configuration...')
    
    // Check if we have required environment variables
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return {
        success: false,
        message: 'Missing required environment variables: ' + 
          (!SMTP_HOST ? 'EMAIL_HOST ' : '') +
          (!SMTP_USER ? 'EMAIL_USER ' : '') +
          (!SMTP_PASS ? 'EMAIL_PASS ' : '')
      }
    }
    
    // Test SMTP connection
    const isVerified = await transporter.verify()
    console.log('📧 SMTP verification result:', isVerified)
    
    return {
      success: isVerified,
      message: isVerified ? 'Email configuration is valid' : 'SMTP verification failed'
    }
  } catch (error) {
    console.error('❌ Email configuration test failed:', error)
    return {
      success: false,
      message: `Email configuration error: ${error.message}`
    }
  }
}

// Send test email with anti-spam optimization
export async function sendTestEmail(email) {
  try {
    const mailOptions = {
      from: `Nivex Education <${SMTP_FROM || SMTP_USER}>`,
      to: email,
      subject: 'Thông báo từ hệ thống Nivex - Kiểm tra kết nối email',
      text: `
Kính chào,

Đây là email kiểm tra từ hệ thống Nivex Education.

Nếu bạn nhận được email này, có nghĩa là hệ thống email đã hoạt động bình thường.

Trân trọng,
Đội ngũ kỹ thuật Nivex
Website: https://nivex.com
      `,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #4CAF50;">Kiểm tra hệ thống email</h2>
    <p>Kính chào,</p>
    <p>Đây là email kiểm tra từ hệ thống Nivex Education.</p>
    <p>Nếu bạn nhận được email này, có nghĩa là hệ thống email đã hoạt động bình thường.</p>
    <hr style="border: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 14px; color: #666;">
      Trân trọng,<br>
      Đội ngũ kỹ thuật Nivex<br>
      Website: <a href="https://nivex.com">nivex.com</a>
    </p>
  </div>
</body>
</html>
      `,
      replyTo: SMTP_FROM || SMTP_USER,
      headers: {
        'X-Mailer': 'Nivex Education System',
        'List-Unsubscribe': `<mailto:${SMTP_FROM || SMTP_USER}?subject=Unsubscribe>`,
      }
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Test email sent:', info.messageId)
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Test email sent successfully'
    }
    
  } catch (error) {
    console.error('❌ Failed to send test email:', error)
    return { 
      success: false, 
      message: 'Failed to send test email',
      error: error.message 
    }
  }
}

// Send course registration email
export async function sendCourseRegistrationEmail(email, registrationData) {
  try {
    console.log('📧 Sending course registration email to:', email)
    
    const { html, text } = generateCourseRegistrationEmail(registrationData)
    
    const mailOptions = {
      from: `${SMTP_FROM_NAME || 'Nivex Education'} <${SMTP_FROM || SMTP_USER}>`,
      to: email,
      subject: `Thông tin khóa học ${registrationData.courseName} - Nivex`,
      text,
      html,
      replyTo: SMTP_FROM || SMTP_USER,
      headers: {
        'X-Mailer': 'Nivex Education System',
        'List-Unsubscribe': `<mailto:${SMTP_FROM || SMTP_USER}?subject=Unsubscribe>`,
        'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN',
      }
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Registration email sent successfully:', info.messageId)
    
    return { 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully'
    }
    
  } catch (error) {
    console.error('❌ Failed to send registration email:', error)
    return { 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    }
  }
}
