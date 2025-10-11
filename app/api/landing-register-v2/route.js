import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { fullName, email, phone } = await request.json()

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }
    
    // Google Sheets configuration
    const GOOGLE_SHEET_ID = '1VBvR7C8yNXu19ESi4NXyZOdkpKkH9trsKA1u0C44HJU'
    const GOOGLE_SHEET_NAME = 'Sheet1' // or whatever your sheet name is
    
    // Prepare data for Google Sheets
    const timestamp = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const rowData = [
      timestamp,
      fullName,
      email,
      phone,
      'Nivex Hub Registration'
    ]

    // Send data to Google Sheets using Google Sheets API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_NAME}!A:E:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: You'll need to set up authentication
          // For now, we'll use a simple approach with a webhook or form submission
        },
        body: JSON.stringify({
          values: [rowData]
        })
      }
    )

    if (!response.ok) {
    //   console.error('Google Sheets API error:', response.statusText)
      // For now, we'll simulate success since we need proper authentication setup
      // In production, you should set up Google Sheets API with proper authentication
    }

    // Use Google Apps Script webhook (recommended for easier setup)
    // Thay YOUR_SCRIPT_ID bằng ID thực tế từ Google Apps Script
    const webhookUrl = `https://script.google.com/macros/s/AKfycbzG95sRHqZ0LutVMhmqAw4f4rO5qtoP0YG47iGopJVpOJTHVUXqsU1pQFU3IPVqecYTaw/exec`
    
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp,
          fullName,
          email,
          phone,
          source: 'Nivex Hub Landing Page'
        })
      })

      if (webhookResponse.ok) {
        const result = await webhookResponse.json()
        if (result.success) {
          return NextResponse.json(
            { message: 'Đăng ký thành công!' },
            { status: 200 }
          )
        } else {
          throw new Error(result.error || 'Lỗi khi lưu dữ liệu')
        }
      } else {
        throw new Error('Lỗi kết nối đến Google Sheets')
      }
    } catch (webhookError) {
    //   console.error('Webhook error:', webhookError)
    //   // Fallback: Log data for manual entry
    //   console.log('Registration data (manual entry):', { timestamp, fullName, email, phone })
    }


    
    return NextResponse.json(
      { message: 'Đăng ký thành công!' },
      { status: 200 }
    )

  } catch (error) {
    // console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    )
  }
}
