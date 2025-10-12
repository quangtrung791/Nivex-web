// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    // const id = parseInt(params.id)
    // const result = await query(
    //   `SELECT id, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at
    //    FROM public.joined_events WHERE id = $1`,
    //   [id]
    // )

    const slug = params.slug;
    let result;

    if(/^\d+$/.test(slug)) {
      result = await query(
        `SELECT id, slug, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at
         FROM public.joined_events WHERE id = $1`,
        [parseInt(slug)]
      )
    } else {
      // nếu là slug => tìm theo slug
      result = await query(
        `SELECT id, slug, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at
        FROM public.joined_events WHERE slug = $1`,
        [slug]
      )
    }

    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } 
  catch (error) {
    console.error('DB GET /joined_events/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const slug = params.slug;
    const data = await request.json()
    console.log("PUT /api/admin/events/:slug - data:", data);
    
    let result;

    if (/^\d+$/.test(slug)) {
      result = await query(
        `UPDATE public.joined_events SET
          slug = $1,
          title = $2,
          content = $3,
          short_desc = $4,
          thumbnail_url = $5,
          time_event = $6,
          tag1=$7, tag2=$8, tag3=$9, type=$10, time_from_and_to=$11
          updated_at = NOW()
         WHERE id = $12
         RETURNING id, slug, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at`,
        [
          data.slug ?? null,
          data.title ?? null,
          data.content ?? null,
          data.short_desc ?? null,
          data.thumbnail_url ?? null,
          data.time_event ?? null,
          data.tag1 ?? null,
          data.tag2 ?? null,
          data.tag3 ?? null,
          data.type ?? null,
          data.time_from_and_to ?? null,
          parseInt(slug),
        ]
      )
    } else {
      result = await query(
        `UPDATE public.joined_events SET
          slug = $1,
          title = $2,
          content = $3,
          short_desc = $4,
          thumbnail_url = $5,
          time_event = $6,
          tag1=$7, tag2=$8, tag3=$9, type=$10, time_from_and_to=$11
          updated_at = NOW()
         WHERE id = $12
         RETURNING id, slug, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at`,
        [
          data.slug ?? null,
          data.title ?? null,
          data.content ?? null,
          data.short_desc ?? null,
          data.thumbnail_url ?? null,
          data.time_event ?? null,
          data.tag1 ?? null,
          data.tag2 ?? null,
          data.tag3 ?? null,
          data.type ?? null,
          data.time_from_and_to ?? null,
          slug,
        ]
      )
    }
    
    // const paramsArr = [
    //   data.title,
    //   data.content ?? null,
    //   data.short_desc ?? null,
    //   data.thumbnail_url ?? null,
    //   data.time_event ?? '01/01/1990',
    //   data.tag1 ?? 'Hợp đồng',
    //   data.tag2 ?? 'Spot',
    //   data.tag3 ?? 'CopyTrade',
    //   data.type ?? 'Online',
    //   data.time_from_and_to ?? '00:00 - 01:00',
    //   id,
    // ]
    // const updateSQL = `
    //   UPDATE public.joined_events SET
    //     title=$1, content=$2, short_desc=$3, thumbnail_url=$4, time_event=$5, tag1=$6, tag2=$7, tag3=$8, type=$9, time_from_and_to=$10, updated_at=NOW()
    //   WHERE id=$11
    //   RETURNING id, title, content, short_desc, thumbnail_url, time_event, tag1, tag2, tag3, type, time_from_and_to, created_at, updated_at
    // `
    // const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    // return NextResponse.json(result[0])
    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error('DB PUT /joined_events/:slug error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    // const id = parseInt(params.id)
    const slug = params.slug
    let result;

    // const result = await query('DELETE FROM public.joined_events WHERE id = $1 RETURNING id', [id])

    if (/^\d+$/.test(slug)) {
      // Nếu là số → xóa theo id
      result = await query(
        'DELETE FROM public.joined_events WHERE id = $1 RETURNING id, slug',
        [parseInt(slug)]
      )
    } else {
      // Nếu là chuỗi → xóa theo slug
      result = await query(
        'DELETE FROM public.joined_events WHERE slug = $1 RETURNING id, slug',
        [slug]
      )
    }

    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    // console.error('DB DELETE /joined_events/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}