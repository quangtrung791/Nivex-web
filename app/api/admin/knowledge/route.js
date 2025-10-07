import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { isAuthorized } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    
    // Query knowledge table with JOIN to get topic name
    const rows = await query(`
      SELECT 
        k.*,
        kt.name as topic_name
      FROM public.knowledge k
      LEFT JOIN public.knowledge_topics kt ON k.topic_id = kt.id
      ORDER BY k.created_at DESC
    `);
    
    // Transform knowledge data for React Admin
    const knowledge = rows.map(row => ({
      id: row.id,
      title: row.title,
      status: row.status || 'active',
      topic: row.topic || 'blockchain', // Keep old field for compatibility during migration
      topic_id: row.topic_id,
      topic_name: row.topic_name || 'Unknown Topic',
      difficulty: row.difficulty || 'easy',
      content: row.content || '',
      image_url: row.image_url,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
    
    
    return NextResponse.json(knowledge, {
      headers: {
        'X-Total-Count': String(knowledge.length),
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
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
  }

  try {
    const data = await request.json();
    
    // Insert into knowledge table
    const result = await query(
      'INSERT INTO public.knowledge (title, status, topic_id, difficulty, content, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        data.title || 'New Article',
        data.status || 'active',
        data.topic_id || 1, // Default to first topic (usually Blockchain)
        data.difficulty || 'easy',
        data.content || '',
        data.image_url || null
      ]
    );
    
    // Return the created knowledge article
    const knowledge = result[0];
    
    return NextResponse.json(knowledge, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}