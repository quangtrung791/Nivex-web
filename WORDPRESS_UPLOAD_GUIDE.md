# WordPress Upload Integration - Hướng Dẫn

## Cài Đặt Hoàn Tất

✅ **WordPress Uploader Class** - `lib/wordpressUploader.js`
✅ **Environment Variables** - WordPress credentials đã được thêm vào `.env.local`
✅ **API Route Updated** - `app/api/upload/images/route.js` ưu tiên WordPress
✅ **Test Endpoint** - `app/api/test-wordpress/route.js` để kiểm tra kết nối

## Cách Upload Hoạt Động

### Upload Priority (Thứ tự ưu tiên):
1. **WordPress Media Library** (ưu tiên cao nhất)
2. **Cloudinary** (fallback cho production nếu WordPress fail)  
3. **Local Storage** (fallback cho development nếu WordPress fail)

### Upload Flow:
```
Upload Request → Try WordPress → 
  ✅ Success: Return WordPress URL
  ❌ Failed: Try Fallback (Cloudinary/Local)
```

## Test Upload

### 1. Khởi động server:
```bash
npm run dev
```

### 2. Test WordPress connection:
```bash
curl http://localhost:3001/api/test-wordpress
```

### 3. Test upload trong Admin Panel:
1. Mở `http://localhost:3001/admin`
2. Login với credentials admin
3. Tạo hoặc chỉnh sửa khóa học
4. Upload ảnh → sẽ tự động upload lên WordPress

## Tính Năng Mới

### WordPress Integration:
- ✅ Upload ảnh trực tiếp lên `https://learningchain.vn`
- ✅ Tự động resize và optimize qua WordPress
- ✅ Lưu trong WordPress Media Library
- ✅ Trả về URL trực tiếp từ WordPress
- ✅ Fallback system nếu WordPress không khả dụng

### Image Gallery:
- ✅ Load ảnh từ WordPress Media Library
- ✅ Hiển thị trong admin interface
- ✅ Chọn ảnh có sẵn từ thư viện WordPress

### Error Handling:
- ✅ Retry mechanism với fallback
- ✅ Detailed error messages
- ✅ Connection testing

## Configuration

### WordPress Settings (đã set):
```env
WORDPRESS_SITE_URL=https://learningchain.vn
WORDPRESS_USERNAME=admin
WORDPRESS_PASSWORD=lcadmin789056@
```

### WordPress REST API Requirements:
- WordPress site phải enable REST API (default: enabled)
- User phải có quyền `upload_files` (admin có sẵn)
- WordPress site phải accessible từ internet

## Troubleshooting

### Nếu upload WordPress fail:
1. Kiểm tra credentials trong `.env.local`
2. Test connection: `curl http://localhost:3001/api/test-wordpress`
3. Kiểm tra WordPress site có accessible không
4. Xem console logs để debug

### Upload sẽ fallback về Cloudinary/Local nếu:
- WordPress site down
- Credentials sai
- Network issues
- WordPress REST API disabled

## WordPress Admin

Sau khi upload thành công, ảnh sẽ xuất hiện trong:
- WordPress Admin → Media Library
- URL trực tiếp: `https://learningchain.vn/wp-admin/upload.php`

## Next Steps

1. Test upload trong admin panel
2. Verify ảnh xuất hiện trong WordPress Media Library  
3. Check URL ảnh hoạt động đúng
4. Configure Vercel environment variables (khi deploy production)

**Ready to test!** 🚀