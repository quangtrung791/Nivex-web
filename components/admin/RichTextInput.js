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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Quill modules configuration
  const modules = {
    toolbar: [
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
          onChange={field.onChange}
          onBlur={field.onBlur}
          modules={modules}
          formats={formats}
          placeholder="Nhập nội dung bài viết..."
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
