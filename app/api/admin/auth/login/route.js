import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// Hardcoded admin credentials (trong production nên lưu trong database hoặc env)
const ADMIN_CREDENTIALS = {
  username: 'adminnivex',
  password: 'nivex293849@', 
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

export async function POST(request) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log('🔍 Login attempt:', { username, password })
    console.log('🔑 Expected credentials:', ADMIN_CREDENTIALS)

    // Validate input
    if (!username || !password) {
      console.log('❌ Missing credentials')
      return NextResponse.json(
        { error: 'Username và password là bắt buộc' },
        { status: 400 }
      )
    }

    // Check credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      console.log('❌ Invalid credentials')
      return NextResponse.json(
        { error: 'Thông tin đăng nhập không chính xác' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful for:', username)

    // Create JWT token
    const token = jwt.sign(
      { 
        username: username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET
    )

    // Create response
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Đăng nhập thành công',
        user: { username: username, role: 'admin' }
      },
      { status: 200 }
    )

    // Set HTTP-only cookie với token
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: false, // Để false cho development
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    // Set thêm một cookie thường để client-side có thể đọc
    response.cookies.set('admin-auth', 'true', {
      httpOnly: false, // Client có thể đọc được
      secure: false, // Để false cho development
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    console.log('🍪 Cookies set - admin-token (httpOnly) + admin-auth (readable)')
    
    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Lỗi server internal' },
      { status: 500 }
    )
  }
}

// GET method để check login status
export async function GET(request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin-token')?.value

    console.log('🔍 Auth check - Token:', token ? 'Present' : 'Missing')

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('✅ Token verified for:', decoded.username)
    
    return NextResponse.json({
      authenticated: true,
      user: {
        username: decoded.username,
        role: decoded.role
      }
    })

  } catch (error) {
    console.error('Auth check error:', error.message)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}