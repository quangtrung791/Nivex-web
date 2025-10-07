// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { isAuthorized } from '@/lib/adminAuth'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, title, type, category, status, start_date, end_date, link_zoom, content, image_url, created_at, updated_at
       FROM public.courses WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    const row = result[0]

    // Subtract 7 hours from start_date and end_date for edit form display
    const minus7h = (val) => {
      if (!val) return null
      const d = new Date(val)
      if (isNaN(d.getTime())) return null
      return new Date(d.getTime() - 7 * 60 * 60 * 1000).toISOString()
    }

    const response = {
      ...row,
      start_date: minus7h(row.start_date),
      end_date: minus7h(row.end_date),
    }

    return NextResponse.json(response)
  } catch (error) {
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
    
    
    // Parse và validate datetime inputs, sau đó cộng thêm 7 giờ
    const startDate = data.start_date ? new Date(new Date(data.start_date).getTime() + 7 * 60 * 60 * 1000).toISOString() : null;
    const endDate = data.end_date ? new Date(new Date(data.end_date).getTime() + 7 * 60 * 60 * 1000).toISOString() : null;
    
    
    const paramsArr = [
      data.title,
      data.type ?? 'online',
      JSON.stringify(data.category ?? []),
      data.status ?? 'active',
      startDate, 
      endDate,
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
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized - Invalid API Key or not authenticated' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.courses WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
