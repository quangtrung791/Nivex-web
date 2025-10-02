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
  useInput
} from 'react-admin'
import { ImageUploadInput } from './ImageUploadInput'
import { useState } from 'react'
import { convertToVietnamTime } from '@/utils/timezone'

// VietnamDateField component - đơn giản và chính xác
const VietnamDateField = ({ source, label, showTime = false }) => {
  const record = useRecordContext()
  
  if (!record || !record[source]) {
    return <span>-</span>
  }
  
  const dateValue = record[source]
  
  // Parse thành Date object từ ISO string
  const date = new Date(dateValue)
  
  if (isNaN(date.getTime())) {
    return <span>-</span>
  }
  
  // Format với timezone Vietnam
  const formatted = showTime ? 
    date.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 
    date.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  
  return <span title={dateValue}>{formatted}</span>
}

// VietnamDateTimeInput component cho form input - tích hợp với React Admin
const VietnamDateTimeInput = ({ source, label, validate, ...props }) => {
  const { field, fieldState: { error } } = useInput({ source, validate })
  
  // Chuyển từ UTC (database) sang local datetime-local format
  const getLocalDateTime = (utcString) => {
    if (!utcString) return ''
    const utcDate = new Date(utcString)
    // Thêm 7h để chuyển từ UTC về Vietnam time
    const vietnamDate = new Date(utcDate.getTime() + (7 * 60 * 60 * 1000))
    return vietnamDate.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:mm
  }
  
  // Chuyển từ local datetime-local về UTC để lưu database
  const getUTCFromLocal = (localString) => {
    if (!localString) return null
    const localDate = new Date(localString)
    // Trừ 7h để chuyển từ Vietnam time về UTC
    const utcDate = new Date(localDate.getTime() - (7 * 60 * 60 * 1000))
    return utcDate.toISOString()
  }
  
  const handleChange = (e) => {
    const localValue = e.target.value
    const utcValue = getUTCFromLocal(localValue)
    field.onChange(utcValue)
  }
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
        {label} {validate && validate.includes(required) && ' *'}
      </label>
      <input
        type="datetime-local"
        value={getLocalDateTime(field.value)}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px',
          border: error ? '1px solid #f44336' : '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      {error && (
        <div style={{ color: '#f44336', fontSize: '12px', marginTop: '4px' }}>
          {error.message || error}
        </div>
      )}
    </div>
  )
}

// Custom Delete Button với confirmation rõ ràng
const CustomDeleteButton = () => {
  const record = useRecordContext()
  const [deleteOne, { isLoading }] = useDelete()
  const notify = useNotify()
  const refresh = useRefresh()
  
  const handleDelete = () => {
    // Sử dụng window.confirm để đảm bảo confirmation hoạt động
    const isConfirmed = window.confirm(
      `⚠️ XÁC NHẬN XÓA KHÓA HỌC\n\n` +
      `Bạn có chắc chắn muốn xóa khóa học "${record?.title}" không?\n\n` +
      `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!`
    )
    
    if (isConfirmed) {
      deleteOne(
        'courses',
        { id: record.id },
        {
          onSuccess: () => {
            notify('✅ Đã xóa khóa học thành công', { type: 'success' })
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
const courseFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm khóa học..." alwaysOn />,
  <SelectInput key="status" source="status" label="Trạng thái" choices={[
    { id: 'active', name: 'Đang hoạt động' },
    { id: 'inactive', name: 'Không hoạt động' },
    { id: 'coming_soon', name: 'Sắp ra mắt' },
  ]} />,
  <SelectInput key="type" source="type" label="Loại" choices={[
    { id: 'online', name: 'Online' },
    { id: 'offline', name: 'Offline' },
    { id: 'hybrid', name: 'Hybrid' },
  ]} />
]

// Custom Actions cho List
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo khóa học mới" />
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
      case 'inactive': return '#f5222d'
      case 'coming_soon': return '#fa8c16'
      default: return '#d9d9d9'
    }
  }
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Đang hoạt động'
      case 'inactive': return 'Không hoạt động'
      case 'coming_soon': return 'Sắp ra mắt'
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
export const CourseList = () => (
  <List 
    filters={courseFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    title="📚 Quản lý Khóa học"
  >
    <Datagrid 
      rowClick="show"
      bulkActionButtons={false}
    >
      <TextField source="id" label="ID" />
      <ImageField source="image_url" label="Ảnh" sx={{ '& img': { maxWidth: '60px', maxHeight: '45px', objectFit: 'cover' } }} />
      <TextField source="title" label="Tên khóa học" />
      <SelectField 
        source="type" 
        label="Loại" 
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
      />
      <VietnamDateField source="start_date" label="Ngày bắt đầu" showTime />
      <VietnamDateField source="end_date" label="Ngày kết thúc" showTime />
      <StatusField />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)

// Create component (loại bỏ level, thêm DateTimeInput)
export const CourseCreate = () => (
  <Create 
    title="➕ Tạo khóa học mới"
    redirect="list"
  >
    <SimpleForm>
      <TextInput 
        source="title" 
        label="Tên khóa học" 
        validate={[required()]}
        fullWidth
        helperText="Nhập tên khóa học (bắt buộc)"
      required />
      
      <SelectInput 
        source="type" 
        label="Loại khóa học"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
        defaultValue="online"
        validate={[required()]}
      disabled />
      
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
      
      <VietnamDateTimeInput 
        source="start_date" 
        label="Ngày giờ bắt đầu"
        validate={[required]}
      />
      
      <VietnamDateTimeInput 
        source="end_date"
        label="Ngày giờ kết thúc"
        validate={[required]}
      />
      
      <TextInput 
        source="link_zoom" 
        label="Link Zoom"
        fullWidth
        placeholder="https://zoom.us/j/123456789"
      required />
      
      <ImageUploadInput 
        source="image_url" 
        label="Hình ảnh khóa học (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB. Định dạng: JPG, PNG, GIF, WebP"
      />
      
      <TextInput 
        source="content" 
        label="Nội dung khóa học (Phần hiển thị mô tả trên trang KHÓA HỌC)"
        multiline
        rows={5}
        fullWidth
        helperText="Mô tả chi tiết về khóa học"
      />
    </SimpleForm>
  </Create>
)

// Edit component (loại bỏ level, thêm DateTimeInput)
export const CourseEdit = () => (
  <Edit 
    title="✏️ Chỉnh sửa khóa học"
  >
    <SimpleForm>
      <TextInput source="id" label="ID" disabled />
      
      <TextInput 
        source="title" 
        label="Tên khóa học" 
        validate={[required()]}
        fullWidth
      required />
      
      <SelectInput 
        source="type" 
        label="Loại khóa học"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
        validate={[required()]}
      disabled />
      
      <SelectInput 
        source="status" 
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Đang hoạt động' },
          { id: 'inactive', name: 'Không hoạt động' },
        ]}
        validate={[required()]}
      />
      
      <VietnamDateTimeInput 
        source="start_date" 
        label="Ngày giờ bắt đầu"
        validate={[required]}
      />
      
      <VietnamDateTimeInput 
        source="end_date" 
        label="Ngày giờ kết thúc"
        validate={[required]}
      />
      
      <TextInput 
        source="link_zoom" 
        label="Link Zoom"
        fullWidth
        placeholder="https://zoom.us/j/123456789"
      required/>
      
      <ImageUploadInput 
        source="image_url" 
        label="Hình ảnh khóa học (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB"
      />
      
      <TextInput 
        source="content" 
        label="Nội dung khóa học (Phần hiển thị mô tả trên trang KHÓA HỌC)"
        multiline
        rows={5}
        fullWidth
      />
      
      <span>Ngày tạo: </span><VietnamDateField source="created_at" label="Ngày tạo" showTime />
      <span>Ngày cập nhật: </span><VietnamDateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleForm>
  </Edit>
)

// Show component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const CourseShow = () => (
  <Show title="👁️ Chi tiết khóa học">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tên khóa học" />
      <SelectField 
        source="type" 
        label="Loại"
        choices={[
          { id: 'online', name: 'Online' },
          { id: 'offline', name: 'Offline' },
          { id: 'hybrid', name: 'Hybrid' },
        ]}
      />
      <StatusField />
      <VietnamDateField source="start_date" label="Ngày giờ bắt đầu" showTime />
      <VietnamDateField source="end_date" label="Ngày giờ kết thúc" showTime />
      <TextField source="link_zoom" label="Link Zoom" />
      <ImageField source="image_url" label="Hình ảnh" sx={{ '& img': { maxWidth: '300px', borderRadius: '8px' } }} />
      <RichTextField source="content" label="Nội dung" />
      <VietnamDateField source="created_at" label="Ngày tạo" showTime />
      <VietnamDateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)
