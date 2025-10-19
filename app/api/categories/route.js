// app/api/knowledge-categories/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1/knowledge-topics';
    const res = await fetch(url, { cache: 'no-store' });

    let json;
    try {
      json = await res.json();
    } catch (e) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, error: 'Invalid JSON from WP', body: text.slice(0, 500) },
        { status: 500 }
      );
    }

    if (!res.ok || !json?.success) {
      return NextResponse.json(
        { success: false, error: json?.error || 'WP API error' },
        { status: res.status || 500 }
      );
    }

    // WP trả về mảng [{id, name}], map sang {id: name, label: name}
    const categories = (json.data || []).map((row) => ({
      id: row.name,      // dùng name làm id để tương thích ngược
      label: row.name,
    }));

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error?.message || error) },
      { status: 500 }
    );
  }
}
