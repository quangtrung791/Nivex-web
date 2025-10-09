// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    // const id = parseInt(params.id)
    const slug = params.slug;
    let result;
    // const result = await query(
    //   `SELECT id, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
    //    FROM public.event WHERE id = $1`,
    //   [id]
    // )

    if(/^\d+$/.test(slug)) {
      result = await query(
        `SELECT id, slug, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
         FROM public.event WHERE id = $1`,
        [parseInt(slug)]
      )
    } else {
      // nếu là slug => tìm theo slug
      result = await query(
        `SELECT id, slug, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
        FROM public.event WHERE slug = $1`,
        [slug]
      )
    }

    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /events/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    // const id = parseInt(params.id)
    const slug = params.slug;
    const data = await request.json()
    console.log("PUT /api/admin/events/:slug - data:", data);
    
    let result;

    // const paramsArr = [
    //   data.title,
    //   data.content ?? null,
    //   data.short_desc ?? null,
    //   data.thumbnail_url ?? null,
    //   data.time_event ?? '01/01/1990',
    //   id,
    // ]
    // const updateSQL = `
    //   UPDATE public.event SET
    //     title=$1, content=$2, short_desc=$3, thumbnail_url=$4, time_event=$5, updated_at=NOW()
    //   WHERE id=$6
    //   RETURNING id, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
    // `
    // const result = await query(updateSQL, paramsArr)

    if (/^\d+$/.test(slug)) {
      result = await query(
        `UPDATE public.event SET
          slug = $1,
          title = $2,
          content = $3,
          short_desc = $4,
          thumbnail_url = $5,
          time_event = $6,
          updated_at = NOW()
         WHERE id = $7
         RETURNING id, slug, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at`,
        [
          data.slug ?? null,
          data.title ?? null,
          data.content ?? null,
          data.short_desc ?? null,
          data.thumbnail_url ?? null,
          data.time_event ?? null,
          parseInt(slug),
        ]
      )
    } else {
      result = await query(
        `UPDATE public.event SET
          slug = $1,
          title = $2,
          content = $3,
          short_desc = $4,
          thumbnail_url = $5,
          time_event = $6,
          updated_at = NOW()
         WHERE id = $7
         RETURNING id, slug, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at`,
        [
          data.slug ?? null,
          data.title ?? null,
          data.content ?? null,
          data.short_desc ?? null,
          data.thumbnail_url ?? null,
          data.time_event ?? null,
          slug,
        ]
      )
    }

    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /events/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    // const id = parseInt(params.id);
    const slug = params.slug
    let result;

    // console.log("DELETE id:", id);
    // const result = await query('DELETE FROM public.event WHERE id = $1 RETURNING id', [id])

    if (/^\d+$/.test(slug)) {
      // Nếu là số → xóa theo id
      result = await query(
        'DELETE FROM public.event WHERE id = $1 RETURNING id, slug',
        [parseInt(slug)]
      )
    } else {
      // Nếu là chuỗi → xóa theo slug
      result = await query(
        'DELETE FROM public.event WHERE slug = $1 RETURNING id, slug',
        [slug]
      )
    }

    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /events/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}