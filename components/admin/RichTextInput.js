'use client'
import { useInput } from 'react-admin'
import { FormHelperText, FormControl, InputLabel } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef, useState } from 'react'

// Dynamic import Quill
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '200px', padding: '10px', border: '1px solid #ccc' }}>Đang tải editor...</div>
})
import 'react-quill/dist/quill.snow.css'

async function uploadToCloudinary(file: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET! // preset UNSIGNED
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', preset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form
  })
  const json = await res.json()
  if (!res.ok || !json.secure_url) {
    throw new Error(json?.error?.message || 'Upload failed')
  }
  return json.secure_url as string
}

const RichTextInput = (props:any) => {
  const { source, label, validate, helperText, ...rest } = props
  const { field, fieldState } = useInput({ source, validate })
  const [mounted, setMounted] = useState(false)
  const quillRef = useRef<any>(null)

  useEffect(() => { setMounted(true) }, [])

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = async () => {
      const file = (input.files && input.files[0]) || null
      if (!file) return
      try {
        const url = await uploadToCloudinary(file)
        const quill = quillRef.current?.getEditor()
        const range = quill.getSelection(true)
        quill.insertEmbed(range.index, 'image', url, 'user')
        quill.setSelection(range.index + 1)
      } catch (e:any) {
        console.error('Upload failed:', e?.message || e)
        alert('Upload ảnh thất bại: ' + (e?.message || 'Unknown error'))
      }
    }
    input.click()
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1,2,3,4,5,6,false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered'}, { list: 'bullet' }, { indent: '-1'}, { indent: '+1' }],
        ['link', 'image', 'video'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler   // <— QUAN TRỌNG: override nút Image
      }
    },
    clipboard: { matchVisual: false }
  }), [])

  const formats = [
    'header','font','size',
    'bold','italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image','video',
    'align','color','background',
    'code-block'
  ]

  if (!mounted) {
    return (
      <FormControl fullWidth error={!!fieldState.error} margin="normal">
        <InputLabel shrink>{label}</InputLabel>
        <div style={{ minHeight: 200, padding: 10, border: '1px solid #ccc', borderRadius: 4, marginTop: 16 }}>
          Đang tải rich text editor...
        </div>
        {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
      </FormControl>
    )
  }

  return (
    <FormControl fullWidth error={!!fieldState.error} margin="normal">
      <InputLabel shrink style={{ backgroundColor: 'white', padding: '0 8px' }}>{label}</InputLabel>
      <div style={{ marginTop: 16 }}>
        <ReactQuill
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
            borderRadius: 4,
            minHeight: 300
          }}
          {...rest}
        />
      </div>
      {(fieldState.error || helperText) && (
        <FormHelperText>{fieldState.error ? fieldState.error.message : helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default RichTextInput
