import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    console.log('🔍 RichText Upload API called')
    
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
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
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' 
      }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 5MB.' 
      }, { status: 400 })
    }

    // Upload to Cloudinary
    try {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Generate unique filename  
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const extension = originalName.split('.').pop()
      const baseName = originalName.replace(`.${extension}`, '')
      const filename = `${baseName}_${timestamp}.${extension}`
      
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString('base64')}`,
        {
          folder: 'nivex-richtext',
          public_id: filename.replace(`.${extension}`, ''),
          resource_type: 'auto',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        }
      )
      
      console.log('✅ Cloudinary upload successful:', uploadResult.secure_url)
      
      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        filename: filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        cloudinaryId: uploadResult.public_id
      })

    } catch (cloudinaryError) {
      console.error('❌ Cloudinary upload failed:', cloudinaryError.message)
      return NextResponse.json({ 
        error: 'Upload failed: ' + cloudinaryError.message 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Upload API error:', error)
    return NextResponse.json({ 
      error: 'Upload failed: ' + error.message 
    }, { status: 500 })
  }
}