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
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

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

    // For production, use Cloudinary
    if (process.env.NODE_ENV === 'production') {
      try {
        // Convert file to buffer for Cloudinary upload
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Generate unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const extension = originalName.split('.').pop()
        const baseName = originalName.replace(`.${extension}`, '')
        const publicId = `courses/${baseName}_${timestamp}`
        
        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              public_id: publicId,
              folder: 'nivex-courses',
              transformation: [
                { width: 800, height: 600, crop: 'limit' },
                { quality: 'auto' },
                { format: 'auto' }
              ]
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(buffer)
        })

        console.log('Image uploaded to Cloudinary:', uploadResult.secure_url)

        return NextResponse.json({
          success: true,
          filename: `${baseName}_${timestamp}.${extension}`,
          url: uploadResult.secure_url,
          originalName: file.name,
          size: file.size,
          type: file.type,
          cloudinaryId: uploadResult.public_id
        })

      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError)
        return NextResponse.json({
          error: 'Failed to upload to cloud storage',
          details: cloudinaryError.message
        }, { status: 500 })
      }
    }

    // Development mode: Use local filesystem
    const { writeFile } = await import('fs/promises')
    const path = await import('path')
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const extension = path.extname(originalName)
    const baseName = path.basename(originalName, extension)
    const filename = `${baseName}_${timestamp}${extension}`

    // Save file to public/assets/images/courses/
    const uploadPath = path.join(process.cwd(), 'public', 'assets', 'images', 'courses', filename)
    await writeFile(uploadPath, buffer)

    // Return the public URL
    const imageUrl = `/assets/images/courses/${filename}`

    console.log('Image uploaded successfully:', imageUrl)

    return NextResponse.json({
      success: true,
      filename: filename,
      url: imageUrl,
      originalName: file.name,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: 'Failed to upload file',
      details: error.message
    }, { status: 500 })
  }
}

// GET method to list uploaded images
export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      try {
        // List images from Cloudinary
        const result = await cloudinary.search
          .expression('folder:nivex-courses')
          .sort_by([['created_at', 'desc']])
          .max_results(30)
          .execute()

        const images = result.resources.map(resource => ({
          filename: resource.public_id.split('/').pop(),
          url: resource.secure_url,
          uploadDate: new Date(resource.created_at),
          cloudinaryId: resource.public_id
        }))

        return NextResponse.json({ images })

      } catch (cloudinaryError) {
        console.error('Cloudinary list error:', cloudinaryError)
        return NextResponse.json({ 
          images: [],
          note: 'Failed to connect to cloud storage'
        })
      }
    }

    // Development mode: Use local filesystem
    const fs = require('fs')
    const path = await import('path')
    
    const imagesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'courses')
    
    // Create directory if it doesn't exist (development only)
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
      return NextResponse.json({ images: [] })
    }

    const files = fs.readdirSync(imagesDir)
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `/assets/images/courses/${file}`,
        uploadDate: fs.statSync(path.join(imagesDir, file)).mtime
      }))
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))

    return NextResponse.json({ images })

  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json({
      error: 'Failed to list images',
      details: error.message
    }, { status: 500 })
  }
}