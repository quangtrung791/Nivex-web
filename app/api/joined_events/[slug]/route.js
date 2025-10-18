// app/api/joined_events/[slug]/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(_req, { params }) {
  try {
    const slug = params?.slug;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Thiếu slug sự kiện' },
        { status: 400 }
      );
    }

    const url  = `${WP_BASE}/joined-events/by-slug/${encodeURIComponent(slug)}`;
    const res  = await fetch(url, { next: { revalidate: 30 } });
    const json = await res.json();

    if (!res.ok || !json?.success || !json?.data) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 404 }
      );
    }

    const e = json.data;
    const event = {
      id: Number(e.id),
      slug: e.slug,
      title: e.title,
      time_event: e.time_event,
      content: e.content ?? '',
      short_desc: e.short_desc ?? '',
      thumbnail_url: e.thumbnail_url ?? '',
      time_from_and_to: e.time_from_and_to ?? '',
      tag1: e.tag1 ?? '',
      tag2: e.tag2 ?? '',
      tag3: e.tag3 ?? '',
      type: e.type ?? ''
    };

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải chi tiết sự kiện', details: error.message },
      { status: 500 }
    );
  }
}
