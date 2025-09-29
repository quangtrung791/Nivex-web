import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET() {
  try {
    // Lấy dữ liệu từ database
    const rows = await query('SELECT id, title, start_date, end_date FROM public.courses LIMIT 3');
    
    const comparison = rows.map(row => {
      const startDate = new Date(row.start_date);
      const endDate = row.end_date ? new Date(row.end_date) : null;
      
      return {
        id: row.id,
        title: row.title,
        raw_database: {
          start_date: row.start_date,
          end_date: row.end_date
        },
        javascript_date_object: {
          start_date: startDate.toString(),
          end_date: endDate ? endDate.toString() : null
        },
        vietnam_format: {
          start_date: startDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
          }),
          start_datetime: startDate.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          end_date: endDate ? endDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
          }) : null,
          end_datetime: endDate ? endDate.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : null
        },
        iso_format: {
          start_date: startDate.toISOString(),
          end_date: endDate ? endDate.toISOString() : null
        }
      };
    });
    
    return NextResponse.json({
      message: 'Date comparison between database and display formats',
      server_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      current_time: new Date().toString(),
      courses: comparison
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}