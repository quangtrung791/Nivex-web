// API endpoint cho single knowledge article
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, title, status, topic, difficulty, content, image_url, created_at, updated_at
       FROM public.knowledge WHERE id = $1`,
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
    
    const paramsArr = [
      data.title,
      data.status ?? 'active',
      data.topic ?? 'blockchain',
      data.difficulty ?? 'easy',
      data.content ?? null,
      data.image_url ?? null,
      id,
    ]
    const updateSQL = `
      UPDATE public.knowledge SET
        title=$1, status=$2, topic=$3, difficulty=$4, content=$5, image_url=$6, updated_at=NOW()
      WHERE id=$7
      RETURNING id, title, status, topic, difficulty, content, image_url, created_at, updated_at
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