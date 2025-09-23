import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

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
    const fs = require('fs')
    const imagesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'courses')
    
    // Create directory if it doesn't exist
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