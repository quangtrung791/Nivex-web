// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
       FROM public.event WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /events/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/events/:id - data:", data);
    
    const paramsArr = [
      data.title,
      data.content ?? null,
      data.short_desc ?? null,
      data.thumbnail_url ?? null,
      data.time_event ?? '01/01/1990',
      id,
    ]
    const updateSQL = `
      UPDATE public.event SET
        title=$1, content=$2, short_desc=$3, thumbnail_url=$4, time_event=$5, updated_at=NOW()
      WHERE id=$6
      RETURNING id, title, content, short_desc, thumbnail_url, time_event, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /events/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    console.log("DELETE id:", id);
    const result = await query('DELETE FROM public.event WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /events/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}