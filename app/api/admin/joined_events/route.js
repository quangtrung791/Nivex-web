import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/joined_events called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.joined_events ORDER BY id ASC');
    
    // Transform courses data for React Admin (thêm link_zoom)
    const events = rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content || '',
      short_desc: row.short_desc || '',
      thumbnail_url: row.thumbnail_url,
      time_from_and_to: row.time_from_and_to,
      tag1: row.tag1,
      tag2: row.tag2,
      tag3: row.tag3,
      type: row.type,
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
    console.error("GET /api/admin/joined_events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("POST /api/admin/joined_events - data:", data);
    
    // Insert into events table
    const result = await query(
      'INSERT INTO public.joined_events (title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        data.title || 'Untitled',
        data.content || '',
        data.short_desc || '',
        data.thumbnail_url || null,
        data.time_event || '01/01/1990',
        data.tag1 || 'Hợp đồng',
        data.tag2 || 'Spot',
        data.tag3 || 'CopyTrade',
        data.type || 'Online',
        data.time_from_and_to || '00:00 - 01:00',
      ]
    );
    
    // Return the created course
    const n = result[0];
    
    return NextResponse.json(n, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/joined_events error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
