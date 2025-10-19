import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const wp = new URL('https://nivexhub.learningchain.vn/wp-json/nivex/v1/news/categories');
    if (search) wp.searchParams.set('search', search);

    const res  = await fetch(wp.toString(), { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 500 }
      );
    }

    const categories = (json.data || []).map(c => ({
      id: c.id,
      name: c.name,
      created_at: c.created_at ?? null,
      updated_at: c.updated_at ?? null
    }));

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách danh mục', details: error.message },
      { status: 500 }
    );
  }
}
