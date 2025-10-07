// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { isAuthorized } from '@/lib/adminAuth'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, name, created_at, updated_at
       FROM public.cate_news WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /category_news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/category_news/:id - data:", data);
    
    const paramsArr = [
      data.name,
      // JSON.stringify(data.category ?? []),
      // data.status ?? 'active',
      // data.content ?? null,
      // data.author ?? 'admin',
      // data.thumbnail_url ?? null,
      // data.time_upload ?? '01/01/1990',
      id,
    ]
    const updateSQL = `
      UPDATE public.news SET
        name=$1, updated_at=NOW()
      WHERE id=$2
      RETURNING id, name, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /category_news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.cate_news WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /category_news/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}