import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(_req, { params }) {
  try {
    const slug = params?.slug;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Thiếu slug thông tin thuật ngữ' },
        { status: 400 }
      );
    }

    const url  = `${WP_BASE}/dictionary/by-slug/${encodeURIComponent(slug)}`;
    const res  = await fetch(url, { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: res.status || 404 }
      );
    }

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải dữ liệu chi tiết', details: error.message },
      { status: 500 }
    );
  }
}
