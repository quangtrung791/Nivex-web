# HƯỚNG DẪN THIẾT LẬP GOOGLE APPS SCRIPT CHO NIVEX HUB

## Bước 1: Tạo Google Apps Script

1. **Truy cập Google Apps Script**: https://script.google.com/
2. **Tạo project mới**: Click "New Project"
3. **Đặt tên project**: "Nivex Hub Registration Handler"

## Bước 2: Copy và paste code sau vào editor

```javascript
function doPost(e) {
  try {
    // Lấy dữ liệu từ request
    const data = JSON.parse(e.postData.contents);
    
    // ID của Google Sheet (từ URL của bạn)
    const SHEET_ID = '1ey0--yQhTnweK86DL1mze1mmY5JRIjTH3_PQ4nvzqbU';
    const SHEET_NAME = 'Sheet1';
    
    // Mở spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Nếu sheet không tồn tại, tạo mới
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Kiểm tra nếu sheet trống, thêm header
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([
        ['Thời gian', 'Họ và tên', 'Email', 'Số điện thoại', 'Nguồn']
      ]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 5).setBackground('#f0f0f0');
    }
    
    // Chuẩn bị dữ liệu để thêm vào sheet
    const rowData = [
      data.timestamp || new Date().toLocaleString('vi-VN'),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.source || 'Nivex Hub Landing Page'
    ];
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow(rowData);
    
    // Trả về response thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Dữ liệu đã được lưu thành công'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    // Trả về response lỗi
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Nivex Hub Registration API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function để kiểm tra
function testFunction() {
  const testData = {
    timestamp: new Date().toLocaleString('vi-VN'),
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '0901234567',
    source: 'Test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}
```

## Bước 3: Lưu và Deploy

1. **Lưu project**: Ctrl+S hoặc click Save
2. **Deploy**: 
   - Click "Deploy" > "New deployment"
   - Chọn type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
3. **Copy URL**: Copy URL được tạo ra (có dạng: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

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

## Troubleshooting

### Nếu không thấy dữ liệu trong Google Sheet:

1. **Kiểm tra console log**: Mở Developer Tools (F12) và xem tab Console
2. **Kiểm tra Google Apps Script logs**: 
   - Vào Google Apps Script
   - Click "Executions" để xem log
3. **Kiểm tra quyền truy cập**: Đảm bảo Google Sheet có thể chỉnh sửa được
4. **Test function**: Chạy `testFunction()` trong Google Apps Script để kiểm tra

### Nếu gặp lỗi "Script not found":
- Kiểm tra lại Script ID trong URL
- Đảm bảo script đã được deploy với quyền "Anyone"

### Nếu gặp lỗi "Permission denied":
- Kiểm tra quyền truy cập Google Sheet
- Đảm bảo script có quyền chỉnh sửa sheet
