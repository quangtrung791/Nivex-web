// app/api/joined_events/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search   = searchParams.get('search')   || '';
    const page     = searchParams.get('page')     || '1';
    const perPage  = searchParams.get('per_page') || '50';

    const wp = new URL(`${WP_BASE}/joined-events`);
    if (search) wp.searchParams.set('search', search);
    wp.searchParams.set('page', page);
    wp.searchParams.set('per_page', perPage);

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
      time_event: e.time_event,
      short_desc: e.short_desc ?? '',
      thumbnail_url: e.thumbnail_url ?? '',
      time_from_and_to: e.time_from_and_to ?? '',
      tag1: e.tag1 ?? '',
      tag2: e.tag2 ?? '',
      tag3: e.tag3 ?? '',
      type: e.type ?? ''
    }));

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách sự kiện', details: error.message },
      { status: 500 }
    );
  }
}
