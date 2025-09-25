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
import { useState } from 'react'

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
  <SelectInput
    key="topic"
    source="topic"
    label="Chủ đề"
    choices={[
      { id: 'blockchain', name: 'Blockchain' },
      { id: 'defi', name: 'DeFi' },
      { id: 'copy_trade', name: 'Copy Trade' },
      { id: 'ai', name: 'AI' },
    ]}
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
  const t = record?.topic
  const map = {
    blockchain: { text: 'Blockchain', color: '#2196f3' },
    defi: { text: 'DeFi', color: '#ff9800' },
    copy_trade: { text: 'Copy Trade', color: '#9c27b0' },
    ai: { text: 'AI', color: '#4caf50' },
  }
  if (!t) return null
  const { text, color } = map[t] ?? { text: t, color: '#9e9e9e' }
  return <Chip label={text} style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }} />
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

// ===== Create =====
export const KnowledgeCreate = () => (
  <Create title="➕ Tạo bài viết mới" redirect="list">
    <SimpleForm>
      <TextInput
        source="title"
        label="Tiêu đề bài viết"
        validate={[required()]}
        fullWidth
        helperText="Nhập tiêu đề bài viết (bắt buộc)"
      />
      <SelectInput
        source="topic"
        label="Chủ đề"
        choices={[
          { id: 'blockchain', name: 'Blockchain' },
          { id: 'defi', name: 'DeFi' },
          { id: 'copy_trade', name: 'Copy Trade' },
          { id: 'ai', name: 'AI' },
        ]}
        defaultValue="blockchain"
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
        fullHeight
        helperText="Nội dung chi tiết của bài viết kiến thức với định dạng HTML"
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
)

// ===== Edit =====
export const KnowledgeEdit = () => (
  <Edit title="✏️ Chỉnh sửa bài viết">
    <SimpleForm>
      <TextInput source="id" label="ID" disabled />
      <TextInput source="title" label="Tiêu đề bài viết" validate={[required()]} fullWidth />
      <SelectInput
        source="topic"
        label="Chủ đề"
        choices={[
          { id: 'blockchain', name: 'Blockchain' },
          { id: 'defi', name: 'DeFi' },
          { id: 'copy_trade', name: 'Copy Trade' },
          { id: 'ai', name: 'AI' },
        ]}
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
        fullHeight
        validate={[required()]}
      />
      <DateField source="created_at" label="Ngày tạo" showTime disabled />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
    </SimpleForm>
  </Edit>
)

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
