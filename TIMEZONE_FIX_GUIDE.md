# TIMEZONE FIX GUIDE

## Vấn đề đã được khắc phục:

### 1. **Timezone Mismatch**
- Server/Database lưu UTC time
- Admin panel hiển thị local time
- Frontend cần Vietnam time (UTC+7)

### 2. **Course Status Logic**
- "Đang diễn ra": start_date <= now <= end_date 
- "Sắp diễn ra": start_date > now
- "Đã kết thúc": end_date < now

## Files đã được sửa:

### `/app/api/courses/route.js`
- ✅ Sử dụng timezone Vietnam để tính status
- ✅ Filter courses theo timezone chính xác  
- ✅ Format date hiển thị đúng

### `/app/api/admin/courses/route.js`
- ✅ Parse dates thành ISO string trước khi lưu
- ✅ Debug logging để track datetime

### `/app/api/admin/courses/[id]/route.js`
- ✅ PUT request xử lý datetime đúng cách

### `/utils/timezone.js`
- ✅ Utility functions cho Vietnam timezone
- ✅ getCourseStatus(), formatDateForUser(), etc.

## Testing:

### 1. Test timezone debug:
```
GET /api/debug/timezone
```

### 2. Test course API:
```
GET /api/courses?filter=online
GET /api/courses?filter=offline  
GET /api/courses?filter=completed
```

### 3. Kiểm tra Admin:
- Tạo course với start_date, end_date
- Verify trong database (Neon console)
- Check hiển thị trong admin panel

### 4. Kiểm tra Frontend:
- Check course status display
- Verify filter "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"

## Expected Results:

| Database (UTC) | Vietnam Time | Status |
|---------------|-------------|---------|
| 2025-09-29 01:00:00 | 2025-09-29 08:00 | ✅ |
| 2025-09-30 15:00:00 | 2025-09-30 22:00 | ✅ |

## Rollback Plan:
Nếu có vấn đề, revert các files:
- app/api/courses/route.js
- app/api/admin/courses/route.js  
- app/api/admin/courses/[id]/route.js

## Next Steps:
1. Test toàn bộ hệ thống
2. Xóa debug logs sau khi confirm OK
3. Monitor production data