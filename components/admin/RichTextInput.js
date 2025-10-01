'use client'
import { useInput } from 'react-admin'
import { FormHelperText, FormControl, InputLabel } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamic import để tránh SSR issues với Quill
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '200px', padding: '10px', border: '1px solid #ccc' }}>Đang tải editor...</div>
})

// Import Quill styles
import 'react-quill/dist/quill.snow.css'

const RichTextInput = (props) => {
  const { source, label, validate, helperText, multiline, rows, ...rest } = props
  const { field, fieldState } = useInput({ source, validate })
  const [mounted, setMounted] = useState(false)
  const [quillRef, setQuillRef] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      if (result.success) {
        return result.url
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  // Custom image handler for Cloudinary upload
  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ảnh quá lớn. Kích thước tối đa 5MB.')
        return
      }

      try {
        if (!quillRef) {
          alert('Lỗi: Editor chưa sẵn sàng')
          return
        }

        const range = quillRef.getSelection(true)
        if (!range) {
          alert('Vui lòng click vào vị trí muốn chèn ảnh')
          return
        }
        
        // Insert loading text
        quillRef.insertText(range.index, 'Đang tải ảnh...', 'user')
        quillRef.setSelection(range.index + 17)

        // Upload to Cloudinary
        const imageUrl = await uploadImageToCloudinary(file)

        // Remove loading text and insert image
        quillRef.deleteText(range.index, 17)
        quillRef.insertEmbed(range.index, 'image', imageUrl)
        quillRef.setSelection(range.index + 1)

      } catch (error) {
        console.error('Upload error:', error)
        alert('Lỗi khi tải ảnh lên: ' + error.message)
        
        // Clean up loading text on error
        if (quillRef) {
          try {
            const range = quillRef.getSelection()
            if (range) {
              const text = quillRef.getText(Math.max(0, range.index - 17), 17)
              if (text.includes('Đang tải ảnh...')) {
                quillRef.deleteText(Math.max(0, range.index - 17), 17)
              }
            }
          } catch (cleanupError) {
            console.error('Cleanup error:', cleanupError)
          }
        }
      }
    }
  }

  // Quill modules configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['code-block'],
        ['clean']
      ],
      handlers: {
        image: () => imageHandler()
      }
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'code-block'
  ]

  // Don't render on server-side
  if (!mounted) {
    return (
      <FormControl fullWidth error={!!fieldState.error} margin="normal">
        <InputLabel shrink>{label}</InputLabel>
        <div style={{ 
          minHeight: '200px', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginTop: '16px'
        }}>
          Đang tải rich text editor...
        </div>
        {fieldState.error && (
          <FormHelperText>{fieldState.error.message}</FormHelperText>
        )}
      </FormControl>
    )
  }

  return (
    <FormControl fullWidth error={!!fieldState.error} margin="normal">
      <InputLabel shrink style={{ backgroundColor: 'white', padding: '0 8px' }}>
        {label}
      </InputLabel>
      
      <div style={{ marginTop: '16px' }}>
        <ReactQuill
          theme="snow"
          value={field.value || ''}
          onChange={(content) => {
            field.onChange(content)
            
            // Set quill ref on first change if not set
            if (!quillRef) {
              const quillInstance = document.querySelector('.ql-editor')?.closest('.ql-container')?.querySelector('.ql-editor')?.parentNode.__quill
              if (quillInstance) {
                console.log('Setting quill ref from onChange')
                setQuillRef(quillInstance)
              }
            }
          }}
          onBlur={field.onBlur}
          modules={modules}
          formats={formats}
          placeholder="Nhập nội dung bài viết..."
          ref={(el) => {
            if (el) {
              // Try to get quill instance immediately
              setTimeout(() => {
                try {
                  const quill = el.getEditor()
                  if (quill && !quillRef) {
                    console.log('Setting quill ref from ref callback')
                    setQuillRef(quill)
                    
                    // Handle paste events for image upload
                    quill.root.addEventListener('paste', async (e) => {
                      const clipboardData = e.clipboardData || e.originalEvent.clipboardData
                      if (!clipboardData) return
                      
                      const items = clipboardData.items
                      if (!items) return
                      
                      for (let item of items) {
                        if (item.type.indexOf('image') !== -1) {
                          e.preventDefault()
                          const file = item.getAsFile()
                          
                          if (!file) continue
                          
                          if (file.size > 5 * 1024 * 1024) {
                            alert('Ảnh paste quá lớn. Kích thước tối đa 5MB.')
                            return
                          }
                          
                          try {
                            const range = quill.getSelection(true)
                            if (!range) return
                            
                            quill.insertText(range.index, 'Đang tải ảnh...', 'user')
                            quill.setSelection(range.index + 17)
                            
                            const imageUrl = await uploadImageToCloudinary(file)
                            
                            quill.deleteText(range.index, 17)
                            quill.insertEmbed(range.index, 'image', imageUrl)
                            quill.setSelection(range.index + 1)
                          } catch (error) {
                            console.error('Paste upload error:', error)
                            alert('Lỗi khi tải ảnh paste: ' + error.message)
                          }
                          break
                        }
                      }
                    })
                  }
                } catch (error) {
                  console.error('Error getting quill instance:', error)
                }
              }, 100)
            }
          }}
          style={{
            backgroundColor: 'white',
            border: fieldState.error ? '2px solid #d32f2f' : '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '300px'
          }}
        />
      </div>
      
      {(fieldState.error || helperText) && (
        <FormHelperText>
          {fieldState.error ? fieldState.error.message : helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default RichTextInput