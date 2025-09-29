// Utility functions để xử lý timezone Việt Nam
export const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

// Lấy thời gian hiện tại theo timezone Việt Nam
export function getVietnamTime() {
  // Cách đơn giản hơn: UTC + 7 giờ
  const now = new Date();
  return new Date(now.getTime() + (7 * 60 * 60 * 1000));
}

// Chuyển đổi UTC time thành Vietnam time
export function convertToVietnamTime(utcDate) {
  if (!utcDate) return null;
  const date = new Date(utcDate);
  return new Date(date.getTime() + (7 * 60 * 60 * 1000));
}

// Format date cho hiển thị trong admin
export function formatDateForAdmin(date) {
  if (!date) return null;
  const vietnamDate = new Date(date);
  // Thêm 7 giờ để chuyển từ UTC sang Vietnam time
  vietnamDate.setHours(vietnamDate.getHours() + 7);
  
  return vietnamDate.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Format date cho hiển thị user-friendly
export function formatDateForUser(date) {
  if (!date) return null;
  
  console.log('formatDateForUser input:', date);
  
  const vietnamDate = new Date(date);
  // Thêm 7 giờ để chuyển từ UTC sang Vietnam time
  vietnamDate.setHours(vietnamDate.getHours() + 7);
  
  const result = vietnamDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  console.log('formatDateForUser output:', result);
  return result;
}

// So sánh thời gian để xác định trạng thái course
export function getCourseStatus(startDate, endDate) {
  const now = getVietnamTime();
  const start = convertToVietnamTime(startDate);
  const end = endDate ? convertToVietnamTime(endDate) : null;
  
  if (end && end < now) {
    return 'completed'; // Đã kết thúc
  } else if (start > now) {
    return 'upcoming'; // Sắp diễn ra
  } else {
    return 'ongoing'; // Đang diễn ra
  }
}