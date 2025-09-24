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
    console.log('🔍 Upload API called')
    console.log('📊 Request headers:', Object.fromEntries(request.headers.entries()))
    
    let data
    try {
      data = await request.formData()
      console.log('✅ FormData parsed successfully')
    } catch (formDataError) {
      console.error('❌ Failed to parse FormData:', formDataError)
      throw new Error('Invalid form data: ' + formDataError.message)
    }

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

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 5MB.' 
      }, { status: 400 })
    }

    console.log('✅ File validation passed')

    // Try Cloudinary upload first (better for production)
    try {
      console.log('🔄 Attempting Cloudinary upload...')
      
      // Check if Cloudinary is configured
      if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name_here') {
        console.log('⚠️ Cloudinary not configured, trying WordPress...')
        throw new Error('Cloudinary not configured')
      }
      
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      console.log('📦 Buffer created for Cloudinary, size:', buffer.length)
      
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
          folder: 'nivex-courses',
          public_id: filename.replace(`.${extension}`, ''),
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        }
      )
      
      console.log('✅ Cloudinary upload successful:', uploadResult.secure_url)
      
      const jsonResponse = NextResponse.json({
        success: true,
        filename: filename,
        url: uploadResult.secure_url,
        originalName: file.name,
        size: file.size,
        type: file.type,
        cloudinaryId: uploadResult.public_id,
        source: 'cloudinary'
      })
      
      // Add CORS headers
      jsonResponse.headers.set('Access-Control-Allow-Origin', '*')
      jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      
      return jsonResponse

    } catch (cloudinaryError) {
      console.error('❌ Cloudinary upload failed:', cloudinaryError.message)
      
      // Fallback to WordPress upload
      try {
        console.log('🔄 Attempting WordPress upload as fallback...')
        
        // Generate unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const extension = originalName.split('.').pop()
        const baseName = originalName.replace(`.${extension}`, '')
        const filename = `${baseName}_${timestamp}.${extension}`
        
        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        console.log('📦 Buffer created for WordPress, size:', buffer.length)
        
        // WordPress upload using native FormData for Node.js
        let FormData
        try {
          FormData = (await import('form-data')).default
        } catch (importError) {
          console.error('❌ Failed to import form-data:', importError)
          throw new Error('form-data package not available')
        }
        
        const formData = new FormData()
        
        try {
          formData.append('file', buffer, {
            filename: filename,
            contentType: file.type
          })
        } catch (appendError) {
          console.error('❌ Failed to append file to FormData:', appendError)
          throw new Error('Failed to prepare file for upload')
        }
        
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

        const jsonResponse = NextResponse.json({
          success: true,
          filename: filename,
          url: wpResult.source_url,
          originalName: file.name,
          size: file.size,
          type: file.type,
          wordpressId: wpResult.id,
          source: 'wordpress'
        })
        
        // Add CORS headers
        jsonResponse.headers.set('Access-Control-Allow-Origin', '*')
        jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
        
        return jsonResponse

      } catch (wpError) {
        console.error('❌ WordPress upload failed:', wpError.message)
        
        // Final fallback to local storage for development
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

        // Ensure directory exists
        const fs = require('fs')
        const coursesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'courses')
        if (!fs.existsSync(coursesDir)) {
          fs.mkdirSync(coursesDir, { recursive: true })
        }

        const uploadPath = path.join(coursesDir, filename)
        await writeFile(uploadPath, buffer)

        const imageUrl = `/assets/images/courses/${filename}`
        console.log('✅ Local upload successful:', imageUrl)

        const jsonResponse = NextResponse.json({
          success: true,
          filename: filename,
          url: imageUrl,
          originalName: file.name,
          size: file.size,
          type: file.type,
          source: 'local',
          note: 'Cloudinary and WordPress failed, used local storage'
        })
        
        // Add CORS headers
        jsonResponse.headers.set('Access-Control-Allow-Origin', '*')
        jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
        
        return jsonResponse
      }
    }

  } catch (error) {
    console.error('💥 Upload error:', error)
    const errorResponse = NextResponse.json({
      error: 'Failed to upload file',
      details: error.message
    }, { status: 500 })
    
    // Add CORS headers to error responses too
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return errorResponse
  }
}

// GET method to list uploaded images - prioritize Cloudinary then WordPress
export async function GET() {
  try {
    console.log('🔍 Loading images...')
    
    // Try Cloudinary first if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name_here') {
      try {
        console.log('🔄 Attempting Cloudinary media fetch...')
        
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: 'nivex-courses/',
          max_results: 30,
          sort_by: [['created_at', 'desc']]
        })
        
        const images = result.resources.map(item => ({
          id: item.asset_id,
          url: item.secure_url,
          thumbnail: cloudinary.url(item.public_id, {
            width: 150, height: 150, crop: 'fill'
          }),
          filename: item.filename || item.public_id,
          title: item.display_name || '',
          alt: '',
          uploadDate: item.created_at,
          mimeType: `image/${item.format}`
        }))
        
        console.log('✅ Cloudinary images loaded:', images.length)
        
        const jsonResponse = NextResponse.json({ 
          images: images,
          source: 'cloudinary'
        })
        
        // Add CORS headers
        jsonResponse.headers.set('Access-Control-Allow-Origin', '*')
        jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
        
        return jsonResponse
        
      } catch (cloudinaryError) {
        console.error('❌ Cloudinary media fetch failed:', cloudinaryError.message)
        // Continue to WordPress fallback
      }
    }
    
    // Fallback to WordPress
    try {
      console.log('🔄 Attempting WordPress media fetch...')
      
      const response = await fetch(
        `${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media?page=1&per_page=30&order=desc&orderby=date`,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_PASSWORD}`).toString('base64')}`,
          }
        }
      )

      if (!response.ok) {
        throw new Error(`WordPress media fetch failed: ${response.status}`)
      }

      const items = await response.json()
      
      const images = items.map(item => ({
        id: item.id,
        url: item.source_url,
        thumbnail: item.media_details?.sizes?.thumbnail?.source_url || item.source_url,
        filename: item.media_details?.file || item.slug,
        title: item.title?.rendered || '',
        alt: item.alt_text || '',
        uploadDate: item.date,
        mimeType: item.mime_type
      }))
      
      console.log('✅ WordPress images loaded:', images.length)
      
      const jsonResponse = NextResponse.json({ 
        images: images,
        source: 'wordpress'
      })
      
      // Add CORS headers
      jsonResponse.headers.set('Access-Control-Allow-Origin', '*')
      jsonResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      jsonResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      
      return jsonResponse
      
    } catch (wordpressError) {
      console.error('❌ WordPress media fetch failed:', wordpressError.message)
      
      // Final fallback to local filesystem
      console.log('🔄 Using local filesystem fallback...')
      
      const fs = require('fs')
      const path = await import('path')
      
      const imagesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'courses')
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true })
        const emptyResponse = NextResponse.json({ 
          images: [],
          source: 'local'
        })
        emptyResponse.headers.set('Access-Control-Allow-Origin', '*')
        return emptyResponse
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

      console.log('✅ Local images loaded:', images.length)

      const localResponse = NextResponse.json({ 
        images: images,
        source: 'local'
      })
      localResponse.headers.set('Access-Control-Allow-Origin', '*')
      return localResponse
    }

  } catch (error) {
    console.error('💥 Error listing images:', error)
    const errorResponse = NextResponse.json({
      error: 'Failed to list images',
      details: error.message
    }, { status: 500 })
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}