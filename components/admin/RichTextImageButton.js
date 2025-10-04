'use client'
import { useState, useCallback } from 'react'
import { Button, CircularProgress, Box } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'

/**
 * A standalone image upload button that finds the closest Quill editor ('.ql-editor')
 * in the DOM and directly injects an <img> tag at the end (or at current selection if possible).
 * After insertion it dispatches a custom event so the parent RichTextInput can sync value if needed.
 */
export default function RichTextImageButton({ onContentChange }) {
  const [uploading, setUploading] = useState(false)

  const uploadFile = useCallback(async (file) => {
    if (!file) return null
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload/images', { method: 'POST', body: formData })
      const json = await res.json()
      if (json.success && json.url) return json.url
      console.error('[RichTextImageButton] Upload failed', json)
      return null
    } catch (e) {
      console.error('[RichTextImageButton] Upload error', e)
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  const insertImageIntoEditor = useCallback((url) => {
    // Find the first visible .ql-editor (can refine later by scoping)
    const editors = document.querySelectorAll('.ql-editor')
    if (!editors.length) {
      console.warn('[RichTextImageButton] No .ql-editor found to insert image.')
      return
    }
    // For now take the first (or we could choose last focused tracking focus events)
    const editor = editors[0]

    // Create block wrapper to keep Quill happy
    const img = document.createElement('img')
    img.src = url
    img.alt = ''
    img.style.maxWidth = '100%'
    editor.appendChild(img)

    // Trigger input/save via callback
    const html = editor.innerHTML
    console.debug('[RichTextImageButton] Inserted image. New HTML length:', html.length)
    if (typeof onContentChange === 'function') onContentChange(html)
  }, [onContentChange])

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const url = await uploadFile(file)
      if (url) insertImageIntoEditor(url)
    }
    input.click()
  }

  return (
    <Box sx={{ mb: 1 }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={uploading ? <CircularProgress size={16} /> : <PhotoIcon />}
        disabled={uploading}
        onClick={handleClick}
        style={{ color: '#3e3e49'}}
      >
        {uploading ? 'Đang tải ảnh...' : 'Chèn ảnh cho nội dung'}
      </Button>
    </Box>
  )
}
