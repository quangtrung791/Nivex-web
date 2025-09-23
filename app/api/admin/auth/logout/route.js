import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Đăng xuất thành công' 
      },
      { status: 200 }
    )

    // Clear the admin cookies
    response.cookies.delete('admin-token')
    response.cookies.delete('admin-auth')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Lỗi khi đăng xuất' },
      { status: 500 }
    )
  }
}