import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Có thể đưa vào ENV nếu muốn
const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search   = searchParams.get('search')   || '';
    const page     = searchParams.get('page')     || '1';
    const perPage  = searchParams.get('per_page') || '500'; // lấy nhiều để group A..Z

    // Reuse endpoint dictionary trên WP
    const url = new URL(`${WP_BASE}/dictionary`);
    if (search) url.searchParams.set('search', search);
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', perPage);

    const res  = await fetch(url.toString(), { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 500 }
      );
    }

    // Trả đúng format Propose() đang dùng
    const list = (json.data || [])
      .map(x => ({
        id: Number(x.id),
        slug: x.slug || '',
        keyword: x.keyword || '',
        short_desc: x.short_desc || ''
      }))
      // sắp xếp A→Z theo keyword (tiếng Việt)
      .sort((a, b) => a.keyword.localeCompare(b.keyword, 'vi', { sensitivity: 'base' }));

    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách thuật ngữ', details: error.message },
      { status: 500 }
    );
  }
}
