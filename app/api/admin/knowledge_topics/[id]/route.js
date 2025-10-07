// API endpoint cho single knowledge topic
import { NextResponse } from 'next/server'
import { query } from '@/app/lib/neon'
import { isAuthorized } from '@/lib/adminAuth'

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)
    const result = await query(
      `SELECT id, name, description, status, created_at, updated_at
       FROM public.knowledge_topics WHERE id = $1`,
      [id]
    )
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge topic not found' }, { status: 404 })
    return NextResponse.json(result[0])
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
    
    const paramsArr = [
      data.name,
      data.description ?? '',
      data.status ?? 'active',
      id,
    ]
    const updateSQL = `
      UPDATE public.knowledge_topics SET
        name=$1, description=$2, status=$3, updated_at=NOW()
      WHERE id=$4
      RETURNING id, name, description, status, created_at, updated_at
    `
    const result = await query(updateSQL, paramsArr)
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge topic not found' }, { status: 404 })
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
    
    // Check if topic is being used by any knowledge articles
    const usageCheck = await query('SELECT COUNT(*) as count FROM public.knowledge WHERE topic_id = $1', [id])
    if (usageCheck[0].count > 0) {
      return NextResponse.json({ 
        error: `Không thể xóa chủ đề này vì có ${usageCheck[0].count} bài viết đang sử dụng` 
      }, { status: 400 })
    }
    
    const result = await query('DELETE FROM public.knowledge_topics WHERE id = $1 RETURNING id', [id])
    if (result.length === 0) return NextResponse.json({ error: 'Knowledge topic not found' }, { status: 404 })
    return NextResponse.json({ id: result[0].id })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}