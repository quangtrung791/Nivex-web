import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

// Helper function to format date to Vietnam time

export const runtime = "nodejs";

export async function GET(request) {
  try {
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.courses ORDER BY id ASC');
    
    // Transform courses data for React Admin
    const courses = rows.map(row => {
      return {
        id: row.id,
        title: row.title,
        type: row.type || 'online',
        status: row.status || 'active',
        start_date:  row.start_date ? new Date(new Date(row.start_date).getTime() - 7 * 60 * 60 * 1000).toISOString() : '',
        end_date : row.end_date ? new Date(new Date(row.end_date).getTime() - 7 * 60 * 60 * 1000).toISOString() : '',

        link_zoom: row.link_zoom,
        content: row.content || '',
        image_url: row.image_url,
        created_at: row.created_at,
        updated_at: row.updated_at,
        category: row.category || []
      };
    });
    
    
    return NextResponse.json(courses, {
      headers: {
        'X-Total-Count': String(courses.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    
    // Parse và validate datetime inputs, sau đó cộng thêm 7 giờ
    const startDate = data.start_date ? new Date(new Date(data.start_date).getTime() + 7 * 60 * 60 * 1000).toISOString() : null;
    const endDate = data.end_date ? new Date(new Date(data.end_date).getTime() + 7 * 60 * 60 * 1000).toISOString() : null;
    
    
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
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
