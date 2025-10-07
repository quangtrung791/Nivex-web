import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { isAuthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/category_news called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.cate_news ORDER BY id ASC');
    
    // Transform courses data for React Admin (thêm link_zoom)
    const news = rows.map(row => ({
      id: row.id,
      name: row.name,
      // type: row.type || 'online',
      // category: row.category || [],
      // status: row.status || 'active',
      // content: row.content || '',
      // author: row.author || 'admin',
      // thumbnail_url: row.thumbnail_url,
      // time_upload: row.time_upload,
      created_at: row.created_at,
      updated_at: row.updated_at      
    }));
    
    console.log("Returning category news:", news.length);
    
    return NextResponse.json(news, {
      headers: {
        'X-Total-Count': String(news.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/category_news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
  }

  try {
    const data = await request.json();
    console.log("POST /api/admin/category_news - data:", data);
    
    // Insert into news table
    const result = await query(
      'INSERT INTO public.cate_news (name) VALUES ($1) RETURNING *',
      [
        data.name || 'Unknown category'
      ]
    );
    
    // Return the created course
    const n = result[0];
    
    return NextResponse.json(n, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/category_news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
