// app/api/event/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search  = searchParams.get('search')   || '';
    const page    = searchParams.get('page')     || '1';
    const perPage = searchParams.get('per_page') || '50';
    const hot     = searchParams.get('hot')      || '';

    const wp = new URL(`${WP_BASE}/events`);
    if (search) wp.searchParams.set('search', search);
    wp.searchParams.set('page', page);
    wp.searchParams.set('per_page', perPage);
    if (hot) wp.searchParams.set('hot', hot);

    const res  = await fetch(wp.toString(), { next: { revalidate: 30 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 500 }
      );
    }

    const events = (json.data || []).map(e => ({
      id: Number(e.id),
      slug: e.slug,
      title: e.title,
      short_desc: e.short_desc ?? '',
      thumbnail_url: e.thumbnail_url ?? '',
      time_event: e.time_event,
      created_at: e.created_at,
      updated_at: e.updated_at,
    }));

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách sự kiện', details: error.message },
      { status: 500 }
    );
  }
}
