
import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

// Middleware kiểm tra API Key
function checkApiKey(request) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized - Invalid API Key' }, { status: 401 });
  }
  return null;
}

export const runtime = 'nodejs';

export async function GET(request) {
  const unauthorized = checkApiKey(request);
  if (unauthorized) return unauthorized;
  try {
    console.log("GET /api/admin/news called");
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.news ORDER BY id ASC');
    // Transform courses data for React Admin
    const news = rows.map(row => ({
      id: row.id,
      title: row.title,
      category_id: row.category_id || [],
      status: row.status || 'active',
      content: row.content || '',
      author: row.author || 'admin',
      thumbnail_url: row.thumbnail_url,
      time_upload: row.time_upload,
      created_at: row.created_at,
      updated_at: row.updated_at      
    }));
    console.log("Returning news:", news.length);
    return NextResponse.json(news, {
      headers: {
        'X-Total-Count': String(news.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  const unauthorized = checkApiKey(request);
  if (unauthorized) return unauthorized;
  try {
    const data = await request.json();
    console.log("POST /api/admin/news - data:", data);
    // Insert into news table
    const result = await query(
      'INSERT INTO public.news (title, category_id, status, content, author, thumbnail_url, time_upload) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        data.title || 'Untitled',
        data.category_id || '',
        data.status || 'active',
        data.content || '',
        data.author || 'admin',
        data.thumbnail_url || null,
        data.time_upload || '01/01/1990'
      ]
    );
    // Return the created course
    const n = result[0];
    return NextResponse.json(n, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/news error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
