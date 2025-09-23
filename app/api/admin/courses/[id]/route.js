// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, title, type, category, status, start_date, end_date, link_zoom, content, image_url, created_at, updated_at
       FROM public.courses WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /courses/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/courses/:id - data:", data);
    
    const paramsArr = [
      data.title,
      data.type ?? 'online',
      JSON.stringify(data.category ?? []),
      data.status ?? 'active',
      data.start_date ?? null,
      data.end_date ?? null,
      data.link_zoom ?? null,
      data.content ?? null,
      data.image_url ?? null,
      id,
    ]
    const updateSQL = `
      UPDATE public.courses SET
        title=$1, type=$2, category=$3, status=$4, start_date=$5, end_date=$6, link_zoom=$7, content=$8, image_url=$9, updated_at=NOW()
      WHERE id=$10
      RETURNING id, title, type, category, status, start_date, end_date, link_zoom, content, image_url, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /courses/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.courses WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /courses/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}