import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  try {
    const slug = params?.slug;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Thiếu slug của bài viết' },
        { status: 400 }
      );
    }

    const url = `https://nivexhub.learningchain.vn/wp-json/nivex/v1/news/by-slug/${encodeURIComponent(slug)}`;
    const res  = await fetch(url, { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 404 }
      );
    }

    const a = json.data;
    const article = {
      id: a.id,
      slug: a.slug,
      title: a.title,
      status: a.status,
      content: a.content || '',
      thumbnail_url: a.thumbnail_url || 'https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp',
      author: a.author || 'admin',
      time_upload: a.time_upload,
      created_at: a.created_at,
      updated_at: a.updated_at,
      category_id: a.category_id ?? null,
      rank_math_seo_keyword: a.rank_math_seo_keyword ?? '',
      rank_math_seo_description: a.rank_math_seo_description ?? '',
    };

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải chi tiết tin tức', details: error.message },
      { status: 500 }
    );
  }
}
