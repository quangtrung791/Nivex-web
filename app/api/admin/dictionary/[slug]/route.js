// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    // const slug = parseInt(params.id)
    const slug = params.slug
    let result

    if(/^\d+$/.test(slug)) {
      result = await query(
        `SELECT id, slug, keyword, short_desc, description, created_at, updated_at
         FROM public.dictionary WHERE id = $1`,
        [parseInt(slug)]
      )
    }
    else {
      // nếu là slug => tìm theo slug
      result = await query(
          `SELECT id, slug, keyword, short_desc, description, created_at, updated_at
          FROM public.dictionary WHERE slug = $1`,
          [slug]
        )
    }
    
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /dictionary/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    // const slug = parseInt(params.id)
    const slug = params.slug
    const data = await request.json()
    console.log("PUT /api/admin/dictionary/:slug - data:", data);

    let result;
    if (/^\d+$/.test(slug)) {
      result = await query(
        `UPDATE public.dictionary SET
          slug = $1,
          keyword = $2,
          short_desc = $3,
          description = $4,
          updated_at = NOW()
         WHERE id = $5
         RETURNING id, slug, keyword, short_desc, description, created_at, updated_at`,
        [
          data.slug ?? null,
          data.keyword,
          data.short_desc ?? null,
          data.description ?? null,
          parseInt(slug),
        ]
      )
    } else {
      result = await query(
        `UPDATE public.dictionary SET
          slug = $1,
          keyword = $2,
          short_desc = $3,
          description = $4,
          updated_at = NOW()
         WHERE slug = $5
         RETURNING id, slug, keyword, short_desc, description, created_at, updated_at`,
        [
          data.slug ?? slug,
          data.keyword,
          data.short_desc ?? null,
          data.description ?? null,
          slug,
        ]
      )
    }
    
    // const paramsArr = [
    //   data.slug ?? slug,
    //   data.keyword,
    //   data.short_desc ?? null,
    //   data.description ?? null,
    //   slug,
    // ]
    // const updateSQL = `
    //   UPDATE public.dictionary SET
    //     slug=$1, keyword=$2, short_desc=$3, description=$4, updated_at=NOW()
    //   WHERE slug=$5
    //   RETURNING id, slug, keyword, short_desc, description, created_at, updated_at`

    // const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })  
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /dictionary/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    // const id = parseInt(params.id)
    const slug = params.slug
    let result

    if (/^\d+$/.test(slug)) {
      // Nếu là số → xóa theo id
      result = await query(
        'DELETE FROM public.dictionary WHERE id = $1 RETURNING id, slug',
        [parseInt(slug)]
      )
    } else {
      // Nếu là chuỗi → xóa theo slug
      result = await query(
        'DELETE FROM public.dictionary WHERE slug = $1 RETURNING id, slug',
        [slug]
      )
    }
    // const result = await query('DELETE FROM public.dictionary WHERE slug = $1 RETURNING id', [slug])
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /dictionary/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}