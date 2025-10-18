import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page   = searchParams.get('page')   || '1';
    const per    = searchParams.get('per_page') || '50';
    const category_id = searchParams.get('category_id') || '';

    // WP endpoint
    const wp = new URL('https://nivexhub.learningchain.vn/wp-json/nivex/v1/news');
    wp.searchParams.set('status', 'active');
    wp.searchParams.set('page', page);
    wp.searchParams.set('per_page', per);
    if (search) wp.searchParams.set('search', search);
    if (category_id) wp.searchParams.set('category_id', category_id);

    const res  = await fetch(wp.toString(), { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 500 }
      );
    }

    const news = (json.data || []).map(n => ({
      id: n.id,
      slug: n.slug,
      title: n.title,
      status: n.status,
      category_id: n.category_id ?? null,
      time_upload: n.time_upload,
      created_at: n.created_at,
      updated_at: n.updated_at,
      thumbnail_url: n.thumbnail_url || 'https://learningchain.vn/wp-content/uploads/2025/09/Frame_1707483879_new_knowledge.webp'
    }));

    return NextResponse.json({ success: true, data: news, meta: json.meta });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách tin tức', details: error.message },
      { status: 500 }
    );
  }
}
