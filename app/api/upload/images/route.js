import { NextResponse } from 'next/server'

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

    // For production (Vercel), return a placeholder response
    // In a real production app, you would use external storage like:
    // - Vercel Blob Storage
    // - Cloudinary
    // - AWS S3
    // - Firebase Storage
    
    if (process.env.NODE_ENV === 'production') {
      // Generate a fake URL for demonstration
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const fakeUrl = `https://placeholder-storage.example.com/courses/${originalName}_${timestamp}`
      
      console.log('Production mode: File upload simulated')
      
      return NextResponse.json({
        success: true,
        filename: `${originalName}_${timestamp}`,
        url: fakeUrl,
        originalName: file.name,
        size: file.size,
        type: file.type,
        note: 'Production mode: Using placeholder URL. Integrate with external storage service.'
      })
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
      // In production, return empty list or connect to external storage
      console.log('Production mode: Image listing not available without external storage')
      
      return NextResponse.json({ 
        images: [],
        note: 'Production mode: Connect to external storage service to list images'
      })
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