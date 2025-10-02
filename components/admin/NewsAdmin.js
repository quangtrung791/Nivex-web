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
      `⚠️ XÁC NHẬN XÓA BÀI ĐĂNG TIN TỨC\n\n` +
      `Bạn có chắc chắn muốn xóa bài này "${record?.title}" không?\n\n` +
      `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!`
    )
    
    if (isConfirmed) {
      deleteOne(
        'news',
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
const newsFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm bài đăng..." alwaysOn />,
  <SelectInput key="status" source="status" label="Trạng thái" choices={[
    { id: 'active', name: 'Đang công khai' },
    { id: 'draft', name: 'Bản nháp riêng tư' },
    { id: 'removed', name: 'Đã xóa tạm thời' },
  ]} />
  // ,
//   <SelectInput key="type" source="type" label="Loại" choices={[
//     { id: 'online', name: 'Online' },
//     { id: 'offline', name: 'Offline' },
//     { id: 'hybrid', name: 'Hybrid' },
//   ]} />
]

// Custom Actions cho List
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo bài đăng mới" />
    <ExportButton />
  </TopToolbar>
)

// Custom Status Field với màu sắc
const StatusField = () => {
  const record = useRecordContext()
  if (!record) return null
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#52c41a'
      case 'draft': return '#f5222d'
      case 'removed': return '#fa8c16'
      default: return '#d9d9d9'
    }
  }
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Đang công khai'
      case 'draft': return 'Bản nháp riêng tư'
      case 'removed': return 'Đã xóa tạm thời'
      default: return status
    }
  }
  
  return (
    <ChipField 
      source="status" 
      style={{ 
        backgroundColor: getStatusColor(record.status),
        color: 'white',
        fontWeight: 'bold'
      }}
      transform={getStatusLabel}
    />
  )
}

// List component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const NewsList = () => (
  <List 
    filters={newsFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    title="📚 Quản lý Bài đăng tin tức"
  >
    <Datagrid 
      rowClick="show"
      bulkActionButtons={false}
    >

      {/* Chọn Id danh mục tin tức */}
      <ReferenceField source="category_id" reference="category_news" label="Danh mục">
        <TextField source="name" />
      </ReferenceField>

      <TextField source="id" label="ID" />
      <ImageField source="thumbnail_url" label="Ảnh" sx={{ '& img': { maxWidth: '60px', maxHeight: '45px', objectFit: 'cover' } }} />
      <TextField source="title" label="Tiêu đề bài đăng" />
      <TextField source="author" label="Tác giả bài đăng" />
      {/* <SelectField 
        source="type" 
        label="Loại" 
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
      /> */}
      <DateField source="time_upload" label="Ngày đăng" showTime />
      {/* <DateField source="end_date" label="Ngày kết thúc" showTime /> */}
      <StatusField />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)

// Create component (loại bỏ level, thêm DateTimeInput)
export const NewsCreate = () => (
  <Create 
    title="➕ Tạo bài đăng mới"
    redirect="list"
  >
    <SimpleForm>
      {/* Chọn danh mục tin tức */}
      <ReferenceInput source="category_id" reference="category_news" label="Danh mục">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <TextInput 
        source="title" 
        label="Tiêu đề bài đăng" 
        validate={[required()]}
        fullWidth
        helperText="Nhập tiêu đề của bài đăng tin tức (bắt buộc)"
      required />
      
      {/* <SelectInput 
        source="type" 
        label="Loại khóa học"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
        defaultValue="online"
        validate={[required()]}
      disabled /> */}
      
      <SelectInput 
        source="status" 
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Công khai' },
          { id: 'draft', name: 'Bản nháp riêng tư' },
        //   { id: 'removed', name: 'Sắp ra mắt' },
        ]}
        defaultValue="active"
        validate={[required()]}
      />
      
      <DateTimeInput 
        source="time_upload" 
        label="Thời gian đăng tải"
      required/>
      
      {/* <DateTimeInput 
        source="end_date" 
        label="Ngày giờ kết thúc"
      required/> */}
      
      {/* <TextInput 
        source="link_zoom" 
        label="Link Zoom"
        fullWidth
        placeholder="https://zoom.us/j/123456789"
      required /> */}
      
      <ImageUploadInput 
        source="thumbnail_url" 
        label="Hình ảnh thumbnail quảng bá bài đăng (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB. Định dạng: JPG, PNG, GIF, WebP"
      />
      
      <RichTextInput 
        source="content" 
        label="Nội dung bài đăng"
        multiline
        rows={15}
        fullWidth
        helperText="Nội dung bài đăng"
      />
      <TextField source="author" label="Tác giả bài đăng" />
    </SimpleForm>
  </Create>
)

// Edit component (loại bỏ level, thêm DateTimeInput)
export const NewsEdit = () => (
  <Edit 
    title="✏️ Chỉnh sửa bài đăng"
  >
    <SimpleForm>
      {/* Chọn id danh mục */}
      <ReferenceInput source="category_id" reference="category_news" label="Danh mục">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <TextInput source="id" label="ID" disabled />
      
      <TextInput 
        source="title" 
        label="Tiêu đề bài đăng" 
        validate={[required()]}
        fullWidth
      required />
      
      {/* <SelectInput 
        source="type" 
        label="Loại khóa học"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
        validate={[required()]}
      disabled /> */}
      
      <SelectInput 
        source="status" 
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Đăng công khai' },
          { id: 'draft', name: 'Bản nháp riêng tư' },
        //   { id: 'removed', name: 'Sắp ra mắt' },
        ]}
        validate={[required()]}
      />
      
      <DateTimeInput 
        source="time_upload" 
        label="Thời gian đăng tải"
      required />
      
      {/* <DateTimeInput 
        source="end_date" 
        label="Ngày giờ kết thúc"
      required /> */}
      
      {/* <TextInput 
        source="link_zoom" 
        label="Link Zoom"
        fullWidth
        placeholder="https://zoom.us/j/123456789"
      required/> */}
      
      <ImageUploadInput 
        source="thumbnail_url" 
        label="Hình ảnh thumbnail quảng bá bài đăng (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB"
      />
      
      <RichTextInput 
        source="content" 
        label="Nội dung bài đăng"
        multiline
        rows={15}
        fullWidth
      />
      <TextField source="author" label="Tác giả bài đăng" />
      <span>Ngày tạo: </span><DateField source="created_at" label="Ngày tạo" showTime disabled />
      <span>Ngày cập nhật: </span><DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
    </SimpleForm>
  </Edit>
)

// Show component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const NewsShow = () => (
  <Show title="👁️ Chi tiết bài đăng">
    <SimpleShowLayout>

      {/* Chọn ID danh mục tin tức */}
      <ReferenceField source="category_id" reference="category_news" label="Danh mục">
        <TextField source="category_id" label="ID Danh mục" />
      </ReferenceField>

      <TextField source="id" label="ID bài đăng" />
      <TextField source="title" label="Tiêu đề bài đăng" />
      <TextField source="author" label="Tác giả bài đăng" />
      {/* <SelectField 
        source="type" 
        label="Loại"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
      /> */}
      <StatusField />
      <DateField source="time_upload" label="Thời gian đã đăng" showTime />
      <ImageField source="thumbnail_url" label="Hình ảnh" sx={{ '& img': { maxWidth: '300px', borderRadius: '8px' } }} />
      {/* <RichTextField source="content" label="Nội dung" /> */}
      <DateField source="created_at" label="Ngày tạo" showTime />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)