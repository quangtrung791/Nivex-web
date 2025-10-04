'use client'
import { useInput } from 'react-admin'
import { FormHelperText, FormControl, FormLabel } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import RichTextImageButton from './RichTextImageButton'

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
  const quillRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [editorKey, setEditorKey] = useState(0) // force remount after whitelist registration if needed
  const lastSelectionRef = useRef(null) // remember last non-null selection

  useEffect(() => {
    setMounted(true)
  }, [])

  // No custom size configuration - use Quill's default size options

  // Quill modules configuration with default size options (small, normal, large, huge)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }], // Quill default: small, normal, large, huge
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'video'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['code-block'],
      ['clean']
    ],
    clipboard: { matchVisual: false }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'code-block'
  ]

  // External image button callback (no hook to avoid changing hook order)
  function handleExternalContentChange(html) {
    field.onChange(html)
  }

  // (Removed early return to keep hook order stable)



  return (
    <FormControl component="fieldset" fullWidth error={!!fieldState.error} margin="normal" sx={{ mt: 2 }}>
      <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>{label}</FormLabel>
      {mounted ? (
        <div>
          <style>{`
            .ql-editor ::selection { background:#ffe8a8; color:#222; }
            .ql-editor ::-moz-selection { background:#ffe8a8; color:#222; }
          `}</style>
          <RichTextImageButton onContentChange={handleExternalContentChange} />
          <ReactQuill
            key={editorKey}
            ref={quillRef}
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
      ) : (
        <div style={{
          minHeight: '200px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          Đang tải rich text editor...
        </div>
      )}
      {(fieldState.error || helperText) && (
        <FormHelperText>
          {fieldState.error ? fieldState.error.message : helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default RichTextInput
