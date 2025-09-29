import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { formatDateForAdmin } from '@/utils/timezone';

export const runtime = "nodejs";

export async function GET(request) {
  try {
    console.log("GET /api/admin/courses called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.courses ORDER BY id ASC');
    
    // Transform courses data for React Admin với timezone đúng
    const courses = rows.map(row => {
      console.log('Admin API - Raw database dates:', {
        id: row.id,
        start_date: row.start_date,
        end_date: row.end_date
      });
      
      // Format dates để hiển thị đúng trong admin (tương tự code cũ hoạt động)
      const formatDateForDisplay = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return date.toISOString(); // Giữ ISO format để DateField tự xử lý timezone
      };
      
      return {
        id: row.id,
        title: row.title,
        type: row.type || 'online',
        status: row.status || 'active',
        // Sử dụng format tương tự code cũ
        start_date: formatDateForDisplay(row.start_date),
        end_date: formatDateForDisplay(row.end_date),
        link_zoom: row.link_zoom,
        content: row.content || '',
        image_url: row.image_url,
        created_at: row.created_at,
        updated_at: row.updated_at,
        category: row.category || []
      };
    });
    
    console.log("Returning courses:", courses.length);
    
    return NextResponse.json(courses, {
      headers: {
        'X-Total-Count': String(courses.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/courses error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log("POST course data received:", data);
    
    // Parse và validate datetime inputs
    const startDate = data.start_date ? new Date(data.start_date).toISOString() : null;
    const endDate = data.end_date ? new Date(data.end_date).toISOString() : null;
    
    console.log("Parsed dates:", { startDate, endDate });
    
    // Insert into courses table với timezone handling
    const result = await query(
      'INSERT INTO public.courses (title, type, status, start_date, end_date, link_zoom, content, image_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        data.title || 'New Course',
        data.type || 'online',
        data.status || 'active',
        startDate, 
        endDate,
        data.link_zoom || null,
        data.content || '',
        data.image_url || null,
        JSON.stringify(data.category || [])
      ]
    );
    
    // Return the created course
    const course = result[0];
    
    return NextResponse.json(course, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/courses error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
