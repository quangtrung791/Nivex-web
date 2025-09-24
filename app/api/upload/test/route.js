import { NextResponse } from 'next/server'

// Simple upload test without WordPress
export async function POST(request) {
  try {
    console.log('🔍 Simple upload test called')
    
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
      console.log('❌ No file provided')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log('📁 File received:', {
      name: file.name,
      size: file.size,
      type: file.type
    })

    // Just return file info without actual upload
    return NextResponse.json({
      success: true,
      filename: file.name,
      size: file.size,
      type: file.type,
      message: 'File received successfully (test mode)'
    })

  } catch (error) {
    console.error('💥 Simple upload test error:', error)
    return NextResponse.json({
      error: 'Test upload failed',
      details: error.message
    }, { status: 500 })
  }
}