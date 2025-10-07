import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { isAuthorized } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/admin/knowledge_topics called");
    
    // Query knowledge_topics table
    const rows = await query('SELECT * FROM public.knowledge_topics');
    
    // Transform knowledge_topics data for React Admin
    const topics = rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description || '',
      status: row.status || 'active',
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
    
    console.log("Returning knowledge topics:", topics.length);
    
    return NextResponse.json(topics, {
      headers: {
        'X-Total-Count': String(topics.length),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
    
  } catch (error) {
    console.error("GET /api/admin/knowledge_topics error:", error);
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
    console.log("POST /api/admin/knowledge_topics - data:", data);
    
    // Insert into knowledge_topics table
    const result = await query(
      'INSERT INTO public.knowledge_topics (name, description, status) VALUES ($1, $2, $3) RETURNING *',
      [
        data.name || 'New Topic',
        data.description || '',
        data.status || 'active'
      ]
    );
    
    // Return the created knowledge topic
    const topic = result[0];
    
    return NextResponse.json(topic, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/admin/knowledge_topics error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}