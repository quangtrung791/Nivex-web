import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WP_BASE = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const url = new URL(`${WP_BASE}/dictionary`);
    if (search) url.searchParams.set('search', search);

    const res  = await fetch(url.toString(), { next: { revalidate: 60 } });
    const json = await res.json();

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách thuật ngữ', details: error.message },
      { status: 500 }
    );
  }
}
