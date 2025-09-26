import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/events called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.event ORDER BY id ASC');
    
    // Transform courses data for React Admin (thêm link_zoom)
    const events = rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content || '',
      short_desc: row.short_desc || '',
      thumbnail_url: row.thumbnail_url,
      time_event: row.time_event,
      created_at: row.created_at,
      updated_at: row.updated_at      
    }));
    
    console.log("Returning event:", events.length);
    
    return NextResponse.json(events, {
      headers: {
        'X-Total-Count': String(events.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("POST /api/admin/events - data:", data);
    
    // Insert into events table
    const result = await query(
      'INSERT INTO public.event (title, content, short_desc, thumbnail_url, time_event) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        data.title || 'Untitled',
        data.content || '',
        data.short_desc || '',
        data.thumbnail_url || null,
        data.time_event || '01/01/1990'
      ]
    );
    
    // Return the created course
    const n = result[0];
    
    return NextResponse.json(n, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
