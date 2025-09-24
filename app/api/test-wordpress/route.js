import { NextResponse } from 'next/server'
import { WordPressUploader } from '@/lib/wordpressUploader'

export async function GET() {
  try {
    console.log('Testing WordPress connection...')
    
    const uploader = new WordPressUploader()
    const testResult = await uploader.testConnection()
    
    console.log('WordPress connection test result:', testResult)
    
    return NextResponse.json({
      success: testResult.success,
      message: testResult.message,
      status: testResult.status,
      config: {
        siteUrl: process.env.WORDPRESS_SITE_URL,
        username: process.env.WORDPRESS_USERNAME,
        hasPassword: !!process.env.WORDPRESS_PASSWORD
      }
    })
    
  } catch (error) {
    console.error('WordPress test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.stack
    }, { status: 500 })
  }
}