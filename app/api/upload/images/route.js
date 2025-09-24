import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { WordPressUploader } from '@/lib/wordpressUploader'

// Configure Cloudinary (keeping as fallback)
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

    // Try WordPress upload first
    try {
      const uploader = new WordPressUploader()
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Generate unique filename
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const extension = originalName.split('.').pop()
      const baseName = originalName.replace(`.${extension}`, '')
      const filename = `${baseName}_${timestamp}.${extension}`
      
      // Upload to WordPress
      const result = await uploader.uploadFromBuffer(buffer, filename, file.type)
      
      console.log('Image uploaded to WordPress:', result.url)

      return NextResponse.json({
        success: true,
        filename: result.filename,
        url: result.url,
        originalName: file.name,
        size: file.size,
        type: file.type,
        wordpressId: result.id,
        source: 'wordpress'
      })

    } catch (wordpressError) {
      console.error('WordPress upload failed, trying fallback:', wordpressError)
      
      // Fallback to Cloudinary for production or local for development
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

          console.log('Image uploaded to Cloudinary (fallback):', uploadResult.secure_url)

          return NextResponse.json({
            success: true,
            filename: `${baseName}_${timestamp}.${extension}`,
            url: uploadResult.secure_url,
            originalName: file.name,
            size: file.size,
            type: file.type,
            cloudinaryId: uploadResult.public_id,
            source: 'cloudinary'
          })

        } catch (cloudinaryError) {
          console.error('All upload methods failed:', { wordpressError, cloudinaryError })
          return NextResponse.json({
            error: 'Failed to upload to both WordPress and cloud storage',
            details: {
              wordpress: wordpressError.message,
              cloudinary: cloudinaryError.message
            }
          }, { status: 500 })
        }
      } else {
        // Development mode: Use local filesystem as fallback
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

        console.log('Image uploaded locally (fallback):', imageUrl)

        return NextResponse.json({
          success: true,
          filename: filename,
          url: imageUrl,
          originalName: file.name,
          size: file.size,
          type: file.type,
          source: 'local'
        })
      }
    }

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
    // Try WordPress media library first
    try {
      const uploader = new WordPressUploader()
      const images = await uploader.getMediaItems(1, 30)
      
      console.log('Images loaded from WordPress:', images.length)
      
      return NextResponse.json({ 
        images: images,
        source: 'wordpress'
      })
      
    } catch (wordpressError) {
      console.error('WordPress media fetch failed, trying fallback:', wordpressError)
      
      // Fallback to Cloudinary for production
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

          return NextResponse.json({ 
            images: images,
            source: 'cloudinary'
          })

        } catch (cloudinaryError) {
          console.error('Cloudinary list error:', cloudinaryError)
          return NextResponse.json({ 
            images: [],
            note: 'Failed to connect to both WordPress and cloud storage'
          })
        }
      } else {
        // Development mode: Use local filesystem
        const fs = require('fs')
        const path = await import('path')
        
        const imagesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'courses')
        
        // Create directory if it doesn't exist (development only)
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir, { recursive: true })
          return NextResponse.json({ 
            images: [],
            source: 'local'
          })
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

        return NextResponse.json({ 
          images: images,
          source: 'local'
        })
      }
    }

  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json({
      error: 'Failed to list images',
      details: error.message
    }, { status: 500 })
  }
}