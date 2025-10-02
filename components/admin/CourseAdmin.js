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

// Helper to format UTC date from DB to a local datetime string for the input
const formatDateTimeLocal = (value) => {
    if (!value) return '';
    try {
        // Create a date object assuming the value is a UTC string
        const date = new Date(value);
        if (isNaN(date.getTime())) return '';

        // Get the timezone offset in minutes and convert it to milliseconds
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        // Create a new date object adjusted for the local timezone
        const localDate = new Date(date.getTime() - timezoneOffset);
        
        // Convert to an ISO string and slice to get the 'YYYY-MM-DDTHH:mm' format
        return localDate.toISOString().slice(0, 16);
    } catch (e) {
        console.error("Error formatting date:", e);
        return '';
    }
};

// Helper to parse local datetime string back to a UTC ISO string for the DB
const parseDateTimeLocal = (value) => {
    if (!value) return null;
    try {
        // The input 'value' is a string like '2025-09-26T20:00' from the datetime-local input.
        // new Date() will parse this as a local time.
        const localDate = new Date(value);
        if (isNaN(localDate.getTime())) return null;
        
        // Convert the local date object to a full UTC ISO string.
        return localDate.toISOString();
    } catch (e) {
        console.error("Error parsing date:", e);
        return null;
    }
};

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
const nowForDatetimeLocal = () => {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

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
      
      <TextInput 
        source="start_date" 
        label="Ngày giờ bắt đầu"
        validate={[required()]}
        parse={parseDateTimeLocal}
        format={formatDateTimeLocal}
        type="datetime-local"
        defaultValue={nowForDatetimeLocal()}
      />
      
      <TextInput 
        source="end_date"
        label="Ngày giờ kết thúc"
        validate={[required()]}
        parse={parseDateTimeLocal}
        format={formatDateTimeLocal}
        type="datetime-local"
        defaultValue={nowForDatetimeLocal()}
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
      
      <TextInput 
        source="start_date" 
        label="Ngày giờ bắt đầu"
        validate={[required()]}
        parse={parseDateTimeLocal}
        format={formatDateTimeLocal}
        type="datetime-local"
        sx={{ width: '100%' }}
      />
      
      <TextInput 
        source="end_date" 
        label="Ngày giờ kết thúc"
        validate={[required()]}
        parse={parseDateTimeLocal}
        format={formatDateTimeLocal}
        type="datetime-local"
        sx={{ width: '100%' }}
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
