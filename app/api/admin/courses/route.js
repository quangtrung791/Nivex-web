import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { zonedTimeToUtc } from "date-fns-tz";

export const runtime = "nodejs";

const TZ = "Asia/Ho_Chi_Minh";
const hasTZ = (s: any) => typeof s === "string" && /Z|[+\-]\d{2}:\d{2}$/.test(s);

// DB -> API (luôn trả ISO UTC)
const toApiISOFromDb = (v: any) => {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();             // timestamptz -> Date
  if (hasTZ(v)) return new Date(v).toISOString();            // string đã có TZ
  return zonedTimeToUtc(v, TZ).toISOString();                // string không TZ => hiểu là giờ VN
};

// Client -> DB (nhận 'YYYY-MM-DDTHH:mm' hoặc ISO; trả ISO UTC)
const fromClientToUTC = (v: any) => {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  if (hasTZ(v)) return new Date(v).toISOString();            // đã có TZ => giữ UTC
  return zonedTimeToUtc(v, TZ).toISOString();                // không TZ => coi là giờ VN
};

export async function GET(request) {
  try {
    console.log("GET /api/admin/courses called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.courses ORDER BY id ASC');
    
    // Transform courses data for React Admin (thêm link_zoom)
    const courses = rows.map(row => ({
      id: row.id,
      title: row.title,
      type: row.type || 'online',
      status: row.status || 'active',
      start_date: toApiISOFromDb(row.start_date), 
      end_date: toApiISOFromDb(row.end_date),  
      link_zoom: row.link_zoom,
      content: row.content || '',
      image_url: row.image_url,
      created_at: row.created_at,
      updated_at: row.updated_at,
      category: row.category || []
    }));
    
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
    const startUtc = fromClientToUTC(data.start_date);  
    const endUtc   = fromClientToUTC(data.end_date);   
    
    // Insert into courses table (thêm link_zoom)
    const result = await query(
      'INSERT INTO public.courses (title, type, status, start_date, end_date, link_zoom, content, image_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        data.title || 'New Course',
        data.type || 'online',
        data.status || 'active',
        startUtc,              
        endUtc,  
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
