import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";
import { slugify, generateUniqueSlug } from "@/utils/slugify";

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
      slug: row.slug,
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
  try {
    const data = await request.json();
    
    // Generate slug from title
    let slug = data.slug || slugify(data.title || 'New Article');
    
    // Check if slug exists and make it unique
    const checkSlugExists = async (checkSlug) => {
      const existing = await query(
        'SELECT id FROM public.knowledge WHERE slug = $1',
        [checkSlug]
      );
      return existing.length > 0;
    };
    
    slug = await generateUniqueSlug(slug, checkSlugExists);
    
    // Insert into knowledge table
    const result = await query(
      'INSERT INTO public.knowledge (title, slug, status, topic_id, difficulty, content, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        data.title || 'New Article',
        slug,
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