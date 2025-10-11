# Hướng dẫn tích hợp Google Sheets cho Nivex Hub

## Bước 1: Tạo Google Apps Script

1. Truy cập [Google Apps Script](https://script.google.com/)
2. Tạo một project mới
3. Copy code từ file `google-apps-script.js` và paste vào editor
4. Lưu project với tên "Nivex Hub Registration Handler"

## Bước 2: Cấu hình Google Sheet

1. Mở Google Sheet của bạn: https://docs.google.com/spreadsheets/d/1ey0--yQhTnweK86DL1mze1mmY5JRIjTH3_PQ4nvzqbU/edit
2. Đảm bảo sheet có tên "Sheet1" (hoặc thay đổi trong code nếu cần)
3. Thêm header row nếu chưa có:
   - A1: Thời gian
   - B1: Họ và tên  
   - C1: Email
   - D1: Số điện thoại
   - E1: Nguồn

## Bước 3: Deploy Google Apps Script

1. Trong Google Apps Script editor, click "Deploy" > "New deployment"
2. Chọn type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy URL được tạo ra (có dạng: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)

## Bước 4: Cập nhật API endpoint

1. Mở file `app/api/landing-register/route.js`
2. Thay thế `YOUR_SCRIPT_ID` bằng ID thực tế từ URL ở bước 3
3. Lưu file

## Bước 5: Test

1. Chạy ứng dụng Next.js
2. Mở trang landing page
3. Click nút "Xem thêm" để mở popup
4. Điền thông tin và submit
5. Kiểm tra Google Sheet để xem dữ liệu đã được thêm

## Cấu trúc dữ liệu

Dữ liệu sẽ được lưu vào Google Sheet với format:
- Cột A: Thời gian đăng ký (format Việt Nam)
- Cột B: Họ và tên
- Cột C: Email
- Cột D: Số điện thoại
- Cột E: Nguồn (luôn là "Nivex Hub Landing Page")

## Troubleshooting

### Lỗi "Script not found"
- Kiểm tra lại Script ID trong URL
- Đảm bảo script đã được deploy với quyền "Anyone"

### Lỗi "Permission denied"
- Kiểm tra quyền truy cập Google Sheet
- Đảm bảo script có quyền chỉnh sửa sheet

### Dữ liệu không xuất hiện
- Kiểm tra console log trong browser
- Kiểm tra execution log trong Google Apps Script
- Đảm bảo sheet name đúng trong code

## Security Notes

- Google Apps Script webhook URL có thể được truy cập công khai
- Cân nhắc thêm validation hoặc authentication nếu cần
- Monitor usage để tránh spam
