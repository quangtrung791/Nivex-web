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
import { useWatch, useFormContext } from 'react-hook-form'
import { useEffect } from 'react'


// Hàm tạo slug tự động từ keyword
const generateSlug = (str = "") => {
  return String(str)
    .toLowerCase()
    .normalize('NFD') // tách ký tự và dấu
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/đ/g, 'd') // thay đ → d
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-') // thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, '-'); // tránh trùng dấu '-'
};


// Custom Delete Button với confirmation rõ ràng
const CustomDeleteButton = () => {
  const record = useRecordContext()
  const [deleteOne, { isLoading }] = useDelete()
  const notify = useNotify()
  const refresh = useRefresh()
  
  const handleDelete = () => {
    // Sử dụng window.confirm để đảm bảo confirmation hoạt động
    const isConfirmed = window.confirm(
      `⚠️ XÁC NHẬN XÓA SỰ KIỆN NÀY\n\n` +
      `Bạn có chắc chắn muốn xóa thông tin sự kiện này "${record?.title}" không?\n\n` +
      `⚠️ HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!`
    )
    
    if (isConfirmed) {
      deleteOne(
        'joined_events',
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
const eventFilters = [
  <SearchInput key="q" source="q" placeholder="Tìm kiếm sự kiện hiện có..." alwaysOn />
]

// Custom Actions cho List
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Tạo sự kiện mới" />
    <ExportButton />
  </TopToolbar>
)

// Custom Status Field với màu sắc
const StatusField = () => {
  const record = useRecordContext()
  if (!record) return null
  
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return '#52c41a'
//       case 'draft': return '#f5222d'
//       case 'removed': return '#fa8c16'
//       default: return '#d9d9d9'
//     }
//   }
  
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case 'active': return 'Đang công khai'
//       case 'draft': return 'Bản nháp riêng tư'
//       case 'removed': return 'Đã xóa tạm thời'
//       default: return status
//     }
//   }
  
  return (
    <ChipField 
      source="status" 
      style={{ 
        // backgroundColor: getStatusColor(record.status),
        color: 'white',
        fontWeight: 'bold'
      }}
    //   transform={getStatusLabel}
    />
  )
}

// List component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const JoinedEventList = () => (
  <List 
    filters={eventFilters}
    actions={<ListActions />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={25}
    title="📚 Quản lý thông tin Sự kiện"
  >
    <Datagrid 
      rowClick="show"
      bulkActionButtons={false}
    >

      {/* Chọn Id danh mục tin tức */}
      {/* <ReferenceField source="category_id" reference="category_news" label="Danh mục">
        <TextField source="name" />
      </ReferenceField> */}

      <TextField source="id" label="ID" />
      <ImageField source="thumbnail_url" label="Ảnh" sx={{ '& img': { maxWidth: '60px', maxHeight: '45px', objectFit: 'cover' } }} />
      <TextField source="title" label="Tên sự kiện" />
      <TextField source="slug" label="Slug URL" />
      <TextField source="short_desc" label="Mô tả ngắn" />
      <DateField source="time_event" label="Ngày diễn ra sự kiện" showTime />
      <TextField source="tag1" label="Thẻ tag 1" />
      <TextField source="tag2" label="Thẻ tag 2" />
      <TextField source="tag3" label="Thẻ tag 3" />
      <TextField source="type" label="Phân loại (Online/Offline)" />
      <TextField source="time_from_and_to" label="Thời gian diễn ra" />
      <StatusField />
      <EditButton label="Sửa" />
      <ShowButton label="Xem" />
      <CustomDeleteButton />
    </Datagrid>
  </List>
)


export const AutoSlug = () => {
    const { control, setValue } = useFormContext();
    const keyword = useWatch({ control, name: "title" });

    useEffect(() => {
      if (!keyword) return;

      const generateUniqueSlug = async () => {
        let baseSlug = generateSlug(keyword);
        let slug = baseSlug;
        let counter = 1;

        // Kiểm tra tồn tại slug trên server
        while (true) {
          const res = await fetch(`/api/admin/joined_events?slug=${slug}`);
          if (res.status === 404) break; // chưa tồn tại => dùng được
          if (!res.ok) break; // lỗi khác => thoát
          slug = `${baseSlug}-${counter++}`;
        }

        setValue("slug", slug, { shouldValidate: true });
      };

      generateUniqueSlug();
    }, [keyword, setValue]);

    return null;
  };


// Create component (loại bỏ level, thêm DateTimeInput)
export const JoinedEventCreate = () => (
  <Create 
    title="➕ Tạo sự kiện mới"
    redirect="list"
  >
    <SimpleForm>
      <AutoSlug />{/* Component tự động cập nhật slug */}
      {/* Chọn danh mục tin tức */}
      {/* <ReferenceInput source="category_id" reference="category_news" label="Danh mục">
        <SelectInput optionText="name" />
      </ReferenceInput> */}

      <TextInput 
        source="title" 
        label="Tên sự kiện" 
        validate={[required()]}
        fullWidth
        helperText="Nhập tên của sự kiện (bắt buộc)"
      required />

        <TextInput 
          source="slug" 
          label="Slug URL" 
          fullWidth
          helperText="Slug được tự động tạo từ từ khóa (bạn có thể chỉnh lại nếu muốn)"
        />
      
      <DateTimeInput 
        source="time_event" 
        label="Thời gian diễn ra sự kiện"
      required/>
      
      <ImageUploadInput 
        source="thumbnail_url" 
        label="Hình ảnh thumbnail quảng bá sự kiện (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB. Định dạng: JPG, PNG, GIF, WebP"
      />
      
      <RichTextInput 
        source="content" 
        label="Nội dung giới thiệu đầy đủ cho sự kiện"
        multiline
        rows={15}
        fullWidth
        helperText="Nội dung giới thiệu đầy đủ cho sự kiện"
      />
      <TextInput 
        source="short_desc" 
        label="Nội dung giới thiệu ngắn gọn cho sự kiện"
        multiline
        rows={5}
        helperText="Nội dung giới thiệu ngắn gọn cho sự kiện"
      />

      <TextInput 
        source="tag1" 
        label="Thẻ tag 1" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 1"
      required />
      <TextInput 
        source="tag2" 
        label="Thẻ tag 2" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 2"
      required />
      <TextInput 
        source="tag3" 
        label="Thẻ tag 3" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 3"
      required />
      <TextInput 
        source="type" 
        label="Phân loại (Online/Offline)" 
        validate={[required()]}
        fullWidth
        helperText="Phân loại sự kiện (Chỉ được nhập Online hoặc Offline)"
      required />
      {/* <TextField source="author" label="Tác giả bài đăng" /> */}
    </SimpleForm>
  </Create>
)

// Edit component (loại bỏ level, thêm DateTimeInput)
export const JoinedEventEdit = () => (
  <Edit 
    title="✏️ Chỉnh sửa thông tin sự kiện"
  >
    <SimpleForm>
      {/* Chọn id danh mục */}
      {/* <ReferenceInput source="category_id" reference="category_news" label="Danh mục">
        <SelectInput optionText="name" />
      </ReferenceInput> */}

      <TextInput source="id" label="ID" disabled />
      
      <TextInput 
        source="title" 
        label="Tên sự kiện" 
        validate={[required()]}
        fullWidth
      required />

      <TextInput 
          source="slug" 
          label="Slug URL" 
          fullWidth
          helperText="Sửa slug"
        />
      
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
      
      {/* <SelectInput 
        source="status" 
        label="Trạng thái"
        choices={[
          { id: 'active', name: 'Đăng công khai' },
          { id: 'draft', name: 'Bản nháp riêng tư' },
        //   { id: 'removed', name: 'Sắp ra mắt' },
        ]}
        validate={[required()]}
      /> */}
      
      <DateTimeInput 
        source="time_event" 
        label="Thời gian diễn ra sự kiện"
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
        label="Hình ảnh thumbnail quảng bá sự kiện (Nên là tỉ lệ 16:9)"
        helperText="Tải lên hoặc chọn ảnh từ thư viện. Kích thước tối đa: 5MB"
      />
      
      <RichTextInput 
        source="content" 
        label="Nội dung quảng bá đầy đủ cho sự kiện"
        multiline
        rows={15}
        fullWidth
      />
      <TextInput 
        source="short_desc" 
        label="Mô tả ngắn cho sự kiện"
        multiline
        rows={15}
      />
      
      <TextInput 
        source="tag1" 
        label="Thẻ tag 1" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 1"
      required />
      <TextInput 
        source="tag2" 
        label="Thẻ tag 2" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 2"
      required />
      <TextInput 
        source="tag3" 
        label="Thẻ tag 3" 
        validate={[required()]}
        fullWidth
        helperText="Nhập thẻ tag 3"
      required />
      <TextInput 
        source="type" 
        label="Phân loại (Online/Offline)" 
        validate={[required()]}
        fullWidth
        helperText="Phân loại sự kiện (Chỉ được nhập Online hoặc Offline)"
      required />
      <TextInput 
        source="time_from_and_to" 
        label="Thời gian diễn ra" 
        validate={[required()]}
        fullWidth
        helperText="Thời gian diễn ra (nhập theo định dạng 00:00 - 01:00)"
      required />

      {/* <TextField source="author" label="Tác giả bài đăng" /> */}
      <span>Ngày tạo: </span><DateField source="created_at" label="Ngày tạo" showTime disabled />
      <span>Ngày cập nhật: </span><DateField source="updated_at" label="Cập nhật lần cuối" showTime disabled />
    </SimpleForm>
  </Edit>
)

// Show component (loại bỏ level, thêm start_date/end_date, hiển thị ảnh)
export const JoinedEventShow = () => (
  <Show title="👁️ Chi tiết sự kiện">
    <SimpleShowLayout>
      <TextField source="id" label="ID sự kiện" />
      <TextField source="title" label="Tên sự kiện" />
      <TextField source="slug" label="Slug URL" />
      <StatusField />
      <DateField source="time_event" label="Thời gian diễn ra sự kiện" showTime />
      <ImageField source="thumbnail_url" label="Hình ảnh quảng bá sự kiện" sx={{ '& img': { maxWidth: '300px', borderRadius: '8px' } }} />
      <RichTextField source="content" label="Nội dung giới thiệu đầy đủ" />
      <TextField source="short_desc" label="Nội dung mô tả ngắn gọn" />

      <TextField source="tag1" label="Thẻ tag 1" />
      <TextField source="tag2" label="Thẻ tag 2" />
      <TextField source="tag3" label="Thẻ tag 3" />
      <TextField source="type" label="Phân loại sự kiện (Online/Offline)" />
      <TextField source="time_from_and_to" label="Thời gian diễn ra (định dạng 00:00 - 01:00)" />

      <DateField source="created_at" label="Ngày tạo" showTime />
      <DateField source="updated_at" label="Cập nhật lần cuối" showTime />
    </SimpleShowLayout>
  </Show>
)