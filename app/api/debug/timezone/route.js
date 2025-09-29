import { NextResponse } from 'next/server'
import { getVietnamTime, getCourseStatus, formatDateForUser, formatDateForAdmin } from '@/utils/timezone'
import { query } from "@/app/lib/neon"

export async function GET() {
  const now = new Date()
  const vietnamTime = getVietnamTime()
  
  // Test với real database data
  let realCourseData = null;
  try {
    const courses = await query('SELECT id, title, start_date, end_date FROM public.courses LIMIT 1');
    if (courses.length > 0) {
      realCourseData = {
        course: courses[0],
        formatted: {
          start_user: formatDateForUser(courses[0].start_date),
          start_admin: formatDateForAdmin(courses[0].start_date),
          end_user: formatDateForUser(courses[0].end_date),
          end_admin: formatDateForAdmin(courses[0].end_date)
        },
        status: getCourseStatus(courses[0].start_date, courses[0].end_date)
      }
    }
  } catch (error) {
    realCourseData = { error: error.message };
  }
  
  return NextResponse.json({
    debug: {
      serverTime: now.toISOString(),
      serverTimeLocal: now.toString(),
      vietnamTime: vietnamTime.toISOString(),
      vietnamTimeLocal: vietnamTime.toString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offset: now.getTimezoneOffset()
    },
    realCourse: realCourseData,
    testFormats: [
      '2025-09-29T01:00:00.000Z', // 8AM Vietnam
      '2025-09-29T13:00:00.000Z'  // 8PM Vietnam
    ].map(date => ({
      original: date,
      formatUser: formatDateForUser(date),
      formatAdmin: formatDateForAdmin(date),
      directFormat: new Date(date).toLocaleDateString('vi-VN')
    }))
  })
}