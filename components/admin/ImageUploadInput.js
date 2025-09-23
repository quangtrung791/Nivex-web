'use client'
import { useState, useCallback } from 'react'
import { 
  FormControl, 
  FormLabel, 
  Button, 
  Box, 
  Typography, 
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { PhotoCamera, Delete, Visibility } from '@mui/icons-material'
import { useInput } from 'react-admin'

export const ImageUploadInput = ({ source, label, helperText, ...props }) => {
  const { field, fieldState } = useInput({ source, ...props })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [images, setImages] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [preview, setPreview] = useState(null)

  // Load existing images
  const loadImages = useCallback(async () => {
    try {
      const response = await fetch('/api/upload/images')
      const data = await response.json()
      if (data.images) {
        setImages(data.images)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }, [])

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/images', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        field.onChange(result.url)
        setImages(prev => [result, ...prev])
      } else {
        setUploadError(result.error || 'Upload failed')
      }
    } catch (error) {
      setUploadError('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  // Select image from gallery
  const selectImage = (imageUrl) => {
    field.onChange(imageUrl)
    setShowGallery(false)
  }

  // Open gallery
  const openGallery = () => {
    loadImages()
    setShowGallery(true)
  }

  return (
    <FormControl fullWidth margin="normal" error={!!fieldState.error}>
      <FormLabel component="legend">{label}</FormLabel>
      
      <Box sx={{ mt: 1 }}>
        {/* Current Image Preview */}
        {field.value && (
          <Box sx={{ mb: 2 }}>
            <img
              src={field.value}
              alt="Course preview"
              style={{
                maxWidth: '200px',
                maxHeight: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={() => field.onChange('')}
              >
                Xóa ảnh
              </Button>
            </Box>
          </Box>
        )}

        {/* Upload Buttons */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component="label"
            startIcon={uploading ? <CircularProgress size={20} /> : <PhotoCamera />}
            disabled={uploading}
            size="small"
          >
            {uploading ? 'Đang tải...' : 'Tải ảnh mới'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>

          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={openGallery}
            size="small"
          >
            Chọn từ thư viện
          </Button>

          {field.value && (
            <TextField
              size="small"
              label="URL ảnh"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              sx={{ minWidth: '300px' }}
            />
          )}
        </Box>

        {/* Error Message */}
        {uploadError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {uploadError}
          </Alert>
        )}

        {/* Helper Text */}
        {helperText && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {helperText}
          </Typography>
        )}

        {/* Field Error */}
        {fieldState.error && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            {fieldState.error.message}
          </Typography>
        )}
      </Box>

      {/* Gallery Dialog */}
      <Dialog 
        open={showGallery} 
        onClose={() => setShowGallery(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chọn ảnh từ thư viện</DialogTitle>
        <DialogContent>
          {images.length === 0 ? (
            <Typography>Chưa có ảnh nào trong thư viện</Typography>
          ) : (
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="120"
                      image={image.url}
                      alt={image.filename}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => selectImage(image.url)}
                    />
                    <CardActions dense>
                      <Button 
                        size="small" 
                        onClick={() => selectImage(image.url)}
                        fullWidth
                      >
                        Chọn
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGallery(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  )
}