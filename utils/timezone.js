// Utility functions để xử lý timezone Việt Nam
export const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

// Lấy thời gian hiện tại theo timezone Việt Nam
export function getVietnamTime() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: vietnamTimeZone }));
}

// Chuyển đổi UTC time thành Vietnam time
export function convertToVietnamTime(utcDate) {
  if (!utcDate) return null;
  return new Date(new Date(utcDate).toLocaleString("en-US", { timeZone: vietnamTimeZone }));
}

// Format date cho hiển thị trong admin
export function formatDateForAdmin(date) {
  if (!date) return null;
  return new Date(date).toLocaleString('vi-VN', {
    timeZone: vietnamTimeZone,
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
  return new Date(date).toLocaleDateString('vi-VN', {
    timeZone: vietnamTimeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
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