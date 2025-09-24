// WordPress upload utility
export class WordPressUploader {
  constructor() {
    this.siteUrl = process.env.WORDPRESS_SITE_URL
    this.username = process.env.WORDPRESS_USERNAME
    this.password = process.env.WORDPRESS_PASSWORD
  }

  // Generate basic auth header
  getAuthHeader() {
    const credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64')
    return `Basic ${credentials}`
  }

  // Upload from buffer (for server-side uploads) 
  async uploadFromBuffer(buffer, filename, mimeType) {
    try {
      // Use FormData for Node.js environment
      const FormData = (await import('form-data')).default
      const formData = new FormData()
      
      // Append buffer as stream with proper filename and content type
      formData.append('file', buffer, {
        filename: filename,
        contentType: mimeType
      })

      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/media`, {
        method: 'POST',
        headers: {
          'Authorization': this.getAuthHeader(),
          ...formData.getHeaders()
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`WordPress upload failed: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      
      return {
        success: true,
        id: result.id,
        url: result.source_url,
        filename: result.media_details?.file || filename,
        title: result.title?.rendered || filename,
        alt: result.alt_text || '',
        mediaDetails: result.media_details
      }
    } catch (error) {
      console.error('WordPress upload error:', error)
      throw error
    }
  }

  // Get media library items
  async getMediaItems(page = 1, perPage = 20) {
    try {
      const response = await fetch(
        `${this.siteUrl}/wp-json/wp/v2/media?page=${page}&per_page=${perPage}&order=desc&orderby=date`,
        {
          headers: {
            'Authorization': this.getAuthHeader(),
          }
        }
      )

      if (!response.ok) {
        throw new Error(`WordPress media fetch failed: ${response.status}`)
      }

      const items = await response.json()
      
      return items.map(item => ({
        id: item.id,
        url: item.source_url,
        thumbnail: item.media_details?.sizes?.thumbnail?.source_url || item.source_url,
        filename: item.media_details?.file || item.slug,
        title: item.title?.rendered || '',
        alt: item.alt_text || '',
        uploadDate: item.date,
        mimeType: item.mime_type
      }))
    } catch (error) {
      console.error('WordPress media fetch error:', error)
      return []
    }
  }

  // Delete media item
  async deleteMedia(mediaId) {
    try {
      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/media/${mediaId}?force=true`, {
        method: 'DELETE',
        headers: {
          'Authorization': this.getAuthHeader(),
        }
      })

      if (!response.ok) {
        throw new Error(`WordPress delete failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('WordPress delete error:', error)
      throw error
    }
  }

  // Test connection
  async testConnection() {
    try {
      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/media?per_page=1`, {
        headers: {
          'Authorization': this.getAuthHeader(),
        }
      })
      
      return {
        success: response.ok,
        status: response.status,
        message: response.ok ? 'Connection successful' : `HTTP ${response.status}`
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}