// API endpoint cho single course dùng database
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, keyword, description, created_at, updated_at
       FROM public.dictionary WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB GET /dictionary/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    console.log("PUT /api/admin/dictionary/:id - data:", data);
    
    const paramsArr = [
      data.keyword,
      data.description ?? null,
      id,
    ]
    const updateSQL = `
      UPDATE public.dictionary SET
        keyword=$1, description=$2, updated_at=NOW()
      WHERE id=$3
      RETURNING id, keyword, description, created_at, updated_at`

    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('DB PUT /dictionary/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query('DELETE FROM public.dictionary WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    console.error('DB DELETE /dictionary/:id error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}