'use client'
import {
  List,
  Datagrid,
  TextField,
  SelectField,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  DateTimeInput,
  required,
  Edit,
  Show,
  SimpleShowLayout,
  RichTextField,
  TopToolbar,
  ExportButton,
  CreateButton,
  FilterButton,
  SearchInput,
  useRecordContext,
  ChipField,
  BooleanField,
  BooleanInput,
  ImageField,
  useDelete,
  useNotify,
  useRefresh,
  Button,
  ReferenceInput,
  ReferenceField
} from 'react-admin'
import { ImageUploadInput } from './ImageUploadInput'
import { useState } from 'react'
import RichTextInput from './RichTextInput'

// Custom Delete Button với confirmation rõ ràng
const CustomDeleteButton = () => {
  const record = useRecordContext()
  const [deleteOne, { isLoading }] = useDelete()
  const notify = useNotify()
  const refresh = useRefresh()
  
  const handleDelete = () => {
    // Sử dụng window.confirm để đảm bảo confirmation hoạt động
    const isConfirmed = window.confirm(
      `⚠️ XÁC NHẬN XÓA TỪ KHÓA THUẬT NGỮ NÀY\n\n` +
      `Bạn có chắc chắn muốn xóa thông tin thuật ngữ này "${record?.title}" không?\n\n` +
      `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!`
    )
    
    if (isConfirmed) {
      deleteOne(
        'dictionary',
        { id: record.id },
        {
          onSuccess: () => {
            notify('✅ Đã xóa thành công', { type: 'success' })
            refresh()
          },
          onError: (error) => {
            notify(`❌ Lỗi khi xóa: ${error.message}`, { type: 'error' })
          }
        }
      )
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading}
      color="error"
      size="small"
      sx={{
        '&:hover': {
          backgroundColor: '#d32f2f',
          color: 'white'
        }
      }}
    >
      {isLoading ? 'Đang xóa...' : '🗑️ Xóa'}
    </Button>
  )
}

// Filters cho tìm kiếm (loại bỏ level)
const dictionaryFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm từ khóa thuật ngữ hiện có..." alwaysOn />,
]

// Custom Actions cho List
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo thuật ngữ mới" />
    <ExportButton />
  </TopToolbar>
)

// Custom Status Field với màu sắc
const StatusField = () => {
  const record = useRecordContext()
  if (!record) return null
 
  return (
    <ChipField 
      source="status" 
      style={{ 
        color: 'white',
        fontWeight: 'bold'
      }}
    //   transform={getStatusLabel}
    />
  )
}

// List component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const DictionaryList = () => (
  <List 
    filters={dictionaryFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    title="📚 Cập nhật dữ liệu thuật ngữ"
  >
    <Datagrid 
      rowClick="show"
      bulkActionButtons={false}
    >

      <TextField source="id" label="ID" />
      {/* <ImageField source="thumbnail_url" label="Ảnh" sx={{ '& img': { maxWidth: '60px', maxHeight: '45px', objectFit: 'cover' } }} /> */}
      <TextField source="keyword" label="Từ khóa thuật ngữ" />
      <TextField source="short_desc" label="Mô tả ngắn về từ khóa" />
      <StatusField />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)

// Create component (loại bỏ level, thêm DateTimeInput)
export const DictionaryCreate = () => (
  <Create 
    title="➕ Tạo từ khóa thuật ngữ mới"
    redirect="list"
  >
    <SimpleForm>

      <TextInput 
        source="keyword" 
        label="Từ khóa thuật ngữ" 
        validate={[required()]}
        fullWidth
        helperText="Nhập Từ khóa thuật ngữ (bắt buộc)"
      required />

      <TextInput 
        source="short_desc" 
        label="Mô tả ngắn về từ khóa" 
        validate={[required()]}
        fullWidth
        helperText="Nhập Mô tả ngắn về từ khóa (bắt buộc)"
      required />
      
      <RichTextInput 
        source="description" 
        label="Giải thích từ khóa thuật ngữ"
        multiline
        rows={15}
        fullWidth
        helperText="Giải thích từ khóa thuật ngữ"
      />
    </SimpleForm>
  </Create>
)

// Edit component (loại bỏ level, thêm DateTimeInput)
export const DictionaryEdit = () => (
  <Edit 
    title="✏️ Chỉnh sửa thông tin thuật ngữ"
  >
    <SimpleForm>
      <TextInput source="id" label="ID" disabled />
      <TextInput 
        source="keyword" 
        label="Từ khóa thuật ngữ" 
        validate={[required()]}
        fullWidth
      required />

      <TextInput 
        source="short_desc" 
        label="Mô tả ngắn về từ khóa" 
        validate={[required()]}
        fullWidth
      required />
      
      <RichTextInput 
        source="description" 
        label="Giải thích từ khóa thuật ngữ"
        multiline
        rows={15}
        fullWidth
      />
      <span>Ngày tạo: </span><DateField source="created_at" label="Ngày tạo" showTime disabled />
      <span>Ngày cập nhật: </span><DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
    </SimpleForm>
  </Edit>
)

// Show component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const DictionaryShow = () => (
  <Show title="👁️ Chi tiết / thông tin thuật ngữ">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="keyword" label="Từ khóa thuật ngữ" />
      <TextField source="short_desc" label="Mô tả ngắn về từ khóa" />
      <StatusField />
      {/* <RichTextField source="description" label="Giải thích từ khóa thuật ngữ" /> */}
      <DateField source="created_at" label="Ngày tạo" showTime />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)