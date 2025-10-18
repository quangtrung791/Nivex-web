import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = 'https://nivexhub.learningchain.vn/wp-json/nivex/v1/knowledge-topics';
    const res = await fetch(url, { cache: 'no-store' });

    let json;
    try { json = await res.json(); }
    catch {
      const text = await res.text();
      return NextResponse.json({ success:false, error:'Invalid JSON from WP', body:text.slice(0,500) }, { status:500 });
    }

    if (!res.ok || !json?.success) {
      return NextResponse.json({ success:false, error: json?.error || 'WP API error' }, { status: res.status || 500 });
    }

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ success:false, error:String(err?.message || err) }, { status:500 });
  }
}
