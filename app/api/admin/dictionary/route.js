import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/dictionary called");
    
    // Query courses table with explicit schema
    const rows = await query('SELECT * FROM public.dictionary ORDER BY id ASC');
    
    // Transform courses data for React Admin 
    const dictionary = rows.map(row => ({
      id: row.id,
      keyword: row.keyword,
      short_desc: row.short_desc,
      description: row.description || '',
      created_at: row.created_at,
      updated_at: row.updated_at      
    }));
    
    console.log("Returning event:", dictionary.length);
    
    return NextResponse.json(dictionary, {
      headers: {
        'X-Total-Count': String(dictionary.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/dictionary error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("POST /api/admin/dictionary - data:", data);
    
    // Insert into dictionary table
    const result = await query(
      'INSERT INTO public.dictionary (keyword, short_desc, description) VALUES ($1, $2, $3) RETURNING *',
      [
        data.keyword || 'Untitled',
        data.short_desc || "null",
        data.description || ''
      ]
    );
    
    // Return the created course
    const n = result[0];
    
    return NextResponse.json(n, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/dictionary error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
