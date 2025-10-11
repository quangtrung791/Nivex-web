import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    
    // Query active knowledge_topics only
    const rows = await query(
      'SELECT id, name FROM public.knowledge_topics WHERE status = $1',
      ['active']
    );
    
    // Transform for frontend categories format
    const categories = rows.map(row => ({
      id: row.name, // Use name as id for backward compatibility
      label: row.name
    }));
    
    
    return NextResponse.json({
      success: true,
      data: categories
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}