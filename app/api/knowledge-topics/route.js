import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    console.log("GET /api/knowledge-topics called");
    
    // Query all knowledge_topics (for admin interface, users need to see all topics)
    const rows = await query(
      'SELECT id, name, status FROM public.knowledge_topics ORDER BY id'
    );
    
    console.log("Raw topics from DB:", rows);
    
    // Transform for SelectInput choices format
    const topics = rows.map(row => ({
      id: row.id,
      name: row.name
    }));
    
    console.log("Transformed topics:", topics);
    
    return NextResponse.json({
      success: true,
      data: topics
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}