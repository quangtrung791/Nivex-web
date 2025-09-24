import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    console.log('🔍 Debug Upload API called')
    
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

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      console.log('❌ Invalid file type:', file.type)
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' 
      }, { status: 400 })
    }

    console.log('✅ File validation passed')

    try {
      console.log('🔄 Attempting WordPress upload...')
      
      // Generate unique filename
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const extension = originalName.split('.').pop()
      const baseName = originalName.replace(`.${extension}`, '')
      const filename = `${baseName}_${timestamp}.${extension}`
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      console.log('📦 Buffer created, size:', buffer.length)
      
      // WordPress upload using native FormData for Node.js
      const FormData = (await import('form-data')).default
      const formData = new FormData()
      
      formData.append('file', buffer, {
        filename: filename,
        contentType: file.type
      })
      
      console.log('🌐 Uploading to WordPress...')
      
      const wpResponse = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_PASSWORD}`).toString('base64')}`,
          ...formData.getHeaders()
        },
        body: formData
      })

      console.log('📊 WordPress response status:', wpResponse.status)

      if (!wpResponse.ok) {
        const errorText = await wpResponse.text()
        console.log('❌ WordPress error:', errorText)
        throw new Error(`WordPress upload failed: ${wpResponse.status} - ${errorText}`)
      }

      const wpResult = await wpResponse.json()
      console.log('✅ WordPress upload successful:', wpResult.source_url)

      return NextResponse.json({
        success: true,
        filename: filename,
        url: wpResult.source_url,
        originalName: file.name,
        size: file.size,
        type: file.type,
        wordpressId: wpResult.id,
        source: 'wordpress'
      })

    } catch (wpError) {
      console.error('❌ WordPress upload failed:', wpError.message)
      
      // Fallback to local storage for development
      console.log('🔄 Using local fallback...')
      
      const { writeFile } = await import('fs/promises')
      const path = await import('path')
      
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const extension = path.extname(originalName)
      const baseName = path.basename(originalName, extension)
      const filename = `${baseName}_${timestamp}${extension}`

      const uploadPath = path.join(process.cwd(), 'public', 'assets', 'images', 'courses', filename)
      await writeFile(uploadPath, buffer)

      const imageUrl = `/assets/images/courses/${filename}`
      console.log('✅ Local upload successful:', imageUrl)

      return NextResponse.json({
        success: true,
        filename: filename,
        url: imageUrl,
        originalName: file.name,
        size: file.size,
        type: file.type,
        source: 'local',
        note: 'WordPress failed, used local storage'
      })
    }

  } catch (error) {
    console.error('💥 Upload error:', error)
    return NextResponse.json({
      error: 'Failed to upload file',
      details: error.message
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Upload debug API ready',
    wordpress: {
      siteUrl: process.env.WORDPRESS_SITE_URL,
      username: process.env.WORDPRESS_USERNAME,
      hasPassword: !!process.env.WORDPRESS_PASSWORD
    }
  })
}