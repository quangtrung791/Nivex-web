import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/knowledge called");
    
    // Query knowledge table
    const rows = await query('SELECT * FROM public.knowledge ORDER BY created_at DESC');
    
    // Transform knowledge data for React Admin
    const knowledge = rows.map(row => ({
      id: row.id,
      title: row.title,
      status: row.status || 'active',
      topic: row.topic || 'blockchain',
      difficulty: row.difficulty || 'easy',
      content: row.content || '',
      image_url: row.image_url,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
    
    console.log("Returning knowledge articles:", knowledge.length);
    
    return NextResponse.json(knowledge, {
      headers: {
        'X-Total-Count': String(knowledge.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/knowledge error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("POST /api/admin/knowledge - data:", data);
    
    // Insert into knowledge table
    const result = await query(
      'INSERT INTO public.knowledge (title, status, topic, difficulty, content, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        data.title || 'New Article',
        data.status || 'active',
        data.topic || 'blockchain',
        data.difficulty || 'easy',
        data.content || '',
        data.image_url || null
      ]
    );
    
    // Return the created knowledge article
    const knowledge = result[0];
    
    return NextResponse.json(knowledge, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/knowledge error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}