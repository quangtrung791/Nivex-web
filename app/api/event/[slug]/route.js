import { NextResponse } from 'next/server'
import { query } from "@/app/lib/neon"

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Thiếu slug thông tin sự kiện" },
        { status: 400 }
      );
    }

    const sqlQuery = `
      SELECT 
        id,
        slug,
        title,
        content,
        short_desc,
        thumbnail_url,
        time_event,
        created_at,
        updated_at
      FROM public.event
      WHERE slug = $1
      LIMIT 1
    `;
    const result = await query(sqlQuery, [slug]);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy dữ liệu" },
        { status: 404 }
      );
    }

    // Trả về thông tin sự kiện đầu tiên
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching by id:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải dữ liệu chi tiết',
        details: error.message
      },
      { status: 500 }
    )
  }
}