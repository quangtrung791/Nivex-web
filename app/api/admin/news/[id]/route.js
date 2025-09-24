// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, title, status, content, author, thumbnail_url, time_upload, created_at, updated_at, category_id
       FROM public.news WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/news/:id - data:", data);
    
    const paramsArr = [
      data.title,
      data.category_id,
      data.status ?? 'active',
      data.content ?? null,
      data.author ?? 'admin',
      data.thumbnail_url ?? null,
      data.time_upload ?? '01/01/1990',
      id,
    ]
    const updateSQL = `
      UPDATE public.news SET
        title=$1, category_id=$2, status=$3, content=$4, author=$5, thumbnail_url=$6, time_upload=$7, updated_at=NOW()
      WHERE id=$8
      RETURNING id, title, category_id, status, content, author, thumbnail_url, time_upload, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.news WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}