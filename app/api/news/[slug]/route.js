import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    // const { id } = params;
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Thiếu slug cuar bài viết" },
        { status: 400 }
      );
    }

    const sqlQuery = `
      SELECT 
        id,
        slug,
        title,
        status,
        content,
        thumbnail_url,
        author,
        time_upload,
        created_at,
        updated_at,
        category_id
      FROM public.news
      WHERE slug = $1 AND status = 'active'
      LIMIT 1
    `;
    const result = await query(sqlQuery, [slug]);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    // Trả về bài viết đầu tiên
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching news by id:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải chi tiết tin tức',
        details: error.message
      },
      { status: 500 }
    )
  }
}