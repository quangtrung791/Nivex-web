// ./components/admin/KnowledgeTopicsAdmin.js
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
import { useState } from 'react'

// ===== Custom Delete Button (xác nhận xóa) =====
const CustomDeleteButton = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <DeleteButton
      label="Xóa"
      confirmTitle="Xác nhận xóa chủ đề"
      confirmContent="Bạn có chắc chắn muốn xóa chủ đề này? Hành động này không thể hoàn tác và có thể ảnh hưởng đến các bài viết kiến thức đang sử dụng chủ đề này."
      mutationMode="pessimistic"
      sx={{
        color: '#d32f2f',
        '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.04)' },
      }}
      onClick={() => {
        const confirmed = window.confirm(
          '⚠️ CẢNH BÁO: Bạn có thực sự muốn xóa chủ đề này?\n\n✅ Click OK để xác nhận xóa\n❌ Click Cancel để hủy bỏ'
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
const topicsFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm chủ đề..." alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    label="Trạng thái"
    choices={[
      { id: 'active', name: 'Đang hoạt động' },
      { id: 'inactive', name: 'Không hoạt động' },
    ]}
  />,
]

// ===== List actions toolbar =====
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo chủ đề mới" />
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



// ===== List =====
export const KnowledgeTopicsList = () => (
  <List
    filters={topicsFilters}
    actions={<ListActions />}
    sort={{ field: 'name', order: 'ASC' }}
    perPage={25}
    title="📂 Quản lý Chủ đề Kiến thức"
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Tên chủ đề" />
      <TextField source="description" label="Mô tả" />
      <StatusField label="Trạng thái" />
      <DateField source="created_at" label="Ngày tạo" showTime />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)

// ===== Create =====
export const KnowledgeTopicsCreate = () => (
  <Create title="➕ Tạo chủ đề mới" redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        label="Tên chủ đề"
        validate={[required()]}
        fullWidth
        helperText="Nhập tên chủ đề (ví dụ: Blockchain, DeFi, NFT...)"
      />

      <TextInput
        source="description"
        label="Mô tả"
        multiline
        rows={3}
        fullWidth
        helperText="Mô tả ngắn gọn về chủ đề này"
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
    </SimpleForm>
  </Create>
)

// ===== Edit =====
export const KnowledgeTopicsEdit = () => (
  <Edit title="✏️ Chỉnh sửa chủ đề">
    <SimpleForm>
      <TextInput source="id" label="ID" disabled />
      <TextInput 
        source="name" 
        label="Tên chủ đề" 
        validate={[required()]} 
        fullWidth 
      />

      <TextInput
        source="description"
        label="Mô tả"
        multiline
        rows={3}
        fullWidth
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
      <DateField source="created_at" label="Ngày tạo" showTime disabled />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
    </SimpleForm>
  </Edit>
)

// ===== Show =====
export const KnowledgeTopicsShow = () => (
  <Show title="📂 Chi tiết chủ đề">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Tên chủ đề" />
      <TextField source="description" label="Mô tả" />
      <StatusField label="Trạng thái" />
      <DateField source="created_at" label="Ngày tạo" showTime />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)