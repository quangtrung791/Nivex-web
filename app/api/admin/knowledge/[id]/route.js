// API endpoint cho single knowledge article
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { slugify, generateUniqueSlug } from '@/utils/slugify'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT k.*, kt.name as topic_name
       FROM public.knowledge k
       LEFT JOIN public.knowledge_topics kt ON k.topic_id = kt.id
       WHERE k.id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge article not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /knowledge/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/knowledge/:id - data:", data);
    
    // Generate or update slug
    let slug = data.slug;
    if (!slug || data.title) {
      // If no slug provided or title changed, regenerate slug
      slug = slugify(data.title);
      
      // Check if slug exists (excluding current article)
      const checkSlugExists = async (checkSlug) => {
        const existing = await query(
          'SELECT id FROM public.knowledge WHERE slug = $1 AND id != $2',
          [checkSlug, id]
        );
        return existing.length > 0;
      };
      
      slug = await generateUniqueSlug(slug, checkSlugExists);
    }
    
    const paramsArr = [
      data.title,
      slug,
      data.status ?? 'active',
      data.topic_id ?? 1,
      data.difficulty ?? 'easy',
      data.content ?? null,
      data.image_url ?? null,
      id,
    ]
    const updateSQL = `
      UPDATE public.knowledge SET
        title=$1, slug=$2, status=$3, topic_id=$4, difficulty=$5, content=$6, image_url=$7, updated_at=NOW()
      WHERE id=$8
      RETURNING id, title, slug, status, topic_id, difficulty, content, image_url, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge article not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /knowledge/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.knowledge WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge article not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /knowledge/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}