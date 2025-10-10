// ./components/admin/KnowledgeAdmin.js
'use client'

import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  Create,
  Edit,
  Show,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  SearchInput,
  SimpleShowLayout,
  useRecordContext,
} from 'react-admin'
import { Chip } from '@mui/material'
import { ImageUploadInput } from './ImageUploadInput'
import RichTextInput from './RichTextInput'
import { useState, useEffect } from 'react'
import { slugify } from '@/utils/slugify'

// ===== Dynamic Topic Select Component =====
const DynamicTopicSelect = ({ source, label, validate, ...props }) => {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/knowledge-topics')
        const result = await response.json()
        if (result.success) {
          const choices = result.data.map(topic => ({
            id: topic.id,
            name: topic.name
          }))
          setTopics(choices)
        }
      } catch (error) {
        console.error('Error fetching topics:', error)
        // Fallback to hardcoded values
        setTopics([
          { id: 1, name: 'Blockchain' },
          { id: 2, name: 'DeFi' },
          { id: 3, name: 'Copy Trade' },
          { id: 4, name: 'AI' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  if (loading) {
    return <div>Đang tải chủ đề...</div>
  }

  return (
    <SelectInput
      source={source}
      label={label}
      choices={topics}
      validate={validate}
      {...props}
    />
  )
}

// ===== Custom Delete Button (xác nhận xóa) =====
const CustomDeleteButton = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <DeleteButton
      label="Xóa"
      confirmTitle="Xác nhận xóa bài viết"
      confirmContent="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
      mutationMode="pessimistic"
      sx={{
        color: '#d32f2f',
        '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.04)' },
      }}
      onClick={() => {
        const confirmed = window.confirm(
          '⚠️ CẢNH BÁO: Bạn có thực sự muốn xóa bài viết này?\n\n✅ Click OK để xác nhận xóa\n❌ Click Cancel để hủy bỏ'
        )
        if (confirmed) {
          setIsDeleting(true)
          return true
        }
        return false
      }}
    />
  )
}

// ===== Filters =====
const knowledgeFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm bài viết..." alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    label="Trạng thái"
    choices={[
      { id: 'active', name: 'Đang hoạt động' },
      { id: 'inactive', name: 'Không hoạt động' },
    ]}
  />,
  <DynamicTopicSelect
    key="topic_id"
    source="topic_id"
    label="Chủ đề"
  />,
  <SelectInput
    key="difficulty"
    source="difficulty"
    label="Độ khó"
    choices={[
      { id: 'easy', name: 'Người mới' },
      { id: 'intermediate', name: 'Trung cấp' },
      { id: 'advanced', name: 'Nâng cao' },
    ]}
  />,
]

// ===== List actions toolbar =====
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo bài viết mới" />
    <ExportButton />
  </TopToolbar>
)

// ===== Custom colored fields using RecordContext =====
const StatusField = () => {
  const record = useRecordContext()
  const status = record?.status
  const color =
    status === 'active' ? '#4caf50' : status === 'inactive' ? '#f44336' : '#9e9e9e'
  const text =
    status === 'active'
      ? 'Đang hoạt động'
      : status === 'inactive'
      ? 'Không hoạt động'
      : status
  if (!status) return null
  return <Chip label={text} style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }} />
}

const TopicField = () => {
  const record = useRecordContext()
  const topicName = record?.topic_name || record?.topic
  
  // Color mapping based on topic name
  const colorMap = {
    'Blockchain': '#2196f3',
    'DeFi': '#ff9800', 
    'Copy Trade': '#9c27b0',
    'AI': '#4caf50',
  }
  
  if (!topicName) return null
  
  const color = colorMap[topicName] || '#290909ff'
  return <Chip label={topicName} style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }} />
}

const DifficultyField = () => {
  const record = useRecordContext()
  const d = record?.difficulty
  const map = {
    easy: { text: 'Người mới', color: '#4caf50' },
    intermediate: { text: 'Trung cấp', color: '#ff9800' },
    advanced: { text: 'Nâng cao', color: '#f44336' },
  }
  if (!d) return null
  const { text, color } = map[d] ?? { text: d, color: '#9e9e9e' }
  return <Chip label={text} style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }} />
}

// ===== List =====
export const KnowledgeList = () => (
  <List
    filters={knowledgeFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    title="📚 Quản lý Kiến thức"
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tiêu đề" />
      <TopicField label="Chủ đề" />
      <DifficultyField label="Độ khó" />
      <StatusField label="Trạng thái" />
      <DateField source="created_at" label="Ngày tạo" showTime />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)

// ===== Slug Input with Auto-generation =====
const SlugInput = ({ source, label, ...props }) => {
  const [slugValue, setSlugValue] = useState('')
  const record = useRecordContext()
  
  useEffect(() => {
    if (record?.slug) {
      setSlugValue(record.slug)
    }
  }, [record])
  
  const handleTitleChange = (e) => {
    const title = e.target.value
    if (title && !slugValue) {
      const generatedSlug = slugify(title)
      setSlugValue(generatedSlug)
    }
  }
  
  return (
    <div style={{ width: '100%' }}>
      <TextInput
        source={source}
        label={label}
        value={slugValue}
        onChange={(e) => setSlugValue(e.target.value)}
        fullWidth
        helperText="URL thân thiện (tự động tạo từ tiêu đề, có thể chỉnh sửa)"
        {...props}
      />
    </div>
  )
}

// ===== Create =====
export const KnowledgeCreate = () => {
  const [titleValue, setTitleValue] = useState('')
  const [slugValue, setSlugValue] = useState('')
  
  const handleTitleChange = (e) => {
    const title = e.target.value
    setTitleValue(title)
    // Auto-generate slug from title
    if (title) {
      const generatedSlug = slugify(title)
      setSlugValue(generatedSlug)
    }
  }
  
  return (
    <Create title="➕ Tạo bài viết mới" redirect="list">
      <SimpleForm>
        <TextInput
          source="title"
          label="Tiêu đề bài viết"
          validate={[required()]}
          fullWidth
          helperText="Nhập tiêu đề bài viết (bắt buộc)"
          onChange={handleTitleChange}
        />
        <TextInput
          source="slug"
          label="Đường dẫn URL (Slug)"
          value={slugValue}
          fullWidth
          helperText="Tự động tạo từ tiêu đề, có thể chỉnh sửa thủ công"
          hidden
        />
        <DynamicTopicSelect
          source="topic_id"
          label="Chủ đề"
          defaultValue={1}
          validate={[required()]}
        />
      <SelectInput
        source="difficulty"
        label="Độ khó"
        choices={[
          { id: 'easy', name: 'Người mới' },
          { id: 'intermediate', name: 'Trung cấp' },
          { id: 'advanced', name: 'Nâng cao' },
        ]}
        defaultValue="easy"
        validate={[required()]}
      />
      <SelectInput
        source="status"
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Đang hoạt động' },
          { id: 'inactive', name: 'Không hoạt động' },
        ]}
        defaultValue="active"
        validate={[required()]}
      />
      <ImageUploadInput
        source="image_url"
        label="Hình ảnh bài viết (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB. Định dạng: JPG, PNG, GIF, WebP"
      />
        <RichTextInput
          source="content"
          label="Nội dung bài viết"
          fullWidth
          helperText="Nội dung chi tiết của bài viết kiến thức với định dạng HTML"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  )
}

// ===== Edit =====
export const KnowledgeEdit = () => {
  const [slugValue, setSlugValue] = useState('')
  const record = useRecordContext()
  
  useEffect(() => {
    if (record?.slug) {
      setSlugValue(record.slug)
    }
  }, [record])
  
  const handleTitleBlur = (e) => {
    const title = e.target.value
    if (title && !slugValue) {
      const generatedSlug = slugify(title)
      setSlugValue(generatedSlug)
    }
  }
  
  return (
    <Edit title="✏️ Chỉnh sửa bài viết">
      <SimpleForm>
        <TextInput source="id" label="ID" disabled />
        <TextInput 
          source="title" 
          label="Tiêu đề bài viết" 
          validate={[required()]} 
          fullWidth 
          onBlur={handleTitleBlur}
        />
        <TextInput
          source="slug"
          label="Đường dẫn URL (Slug)"
          fullWidth
          helperText="URL thân thiện SEO (tự động cập nhật khi thay đổi tiêu đề)"
          hidden
        />
        <DynamicTopicSelect
          source="topic_id"
          label="Chủ đề"
          validate={[required()]}
        />
      <SelectInput
        source="difficulty"
        label="Độ khó"
        choices={[
          { id: 'easy', name: 'Người mới' },
          { id: 'intermediate', name: 'Trung cấp' },
          { id: 'advanced', name: 'Nâng cao' },
        ]}
        validate={[required()]}
      />
      <SelectInput
        source="status"
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Đang hoạt động' },
          { id: 'inactive', name: 'Không hoạt động' },
        ]}
        validate={[required()]}
      />
      <ImageUploadInput
        source="image_url"
        label="Hình ảnh bài viết (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB"
      />
      <RichTextInput
        source="content"
        label="Nội dung bài viết"
        fullWidth
        validate={[required()]}
      />
        <DateField source="created_at" label="Ngày tạo" showTime disabled />
        <DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
      </SimpleForm>
    </Edit>
  )
}

// ===== Show =====
export const KnowledgeShow = () => (
  <Show title="📖 Chi tiết bài viết">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tiêu đề" />
      <TopicField label="Chủ đề" />
      <DifficultyField label="Độ khó" />
      <StatusField label="Trạng thái" />
      <TextField source="content" label="Nội dung" />
      <DateField source="created_at" label="Ngày tạo" showTime />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)
