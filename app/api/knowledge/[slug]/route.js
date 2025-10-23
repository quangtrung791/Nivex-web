import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  try {
    const { slug } = params || {};
    if (!slug) {
      return NextResponse.json({ success:false, error:'Slug is required' }, { status:400 });
    }

    const url = `https://nivexhub.learningchain.vn/wp-json/nivex/v1/knowledge/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: 'no-store' });

    let json;
    json = await res.json();
    // try { json = await res.json(); }
    // catch {
    //   const text = await res.text();
    //   return NextResponse.json({ success:false, error:'Invalid JSON from WP', body:text.slice(0,500) }, { status:500 });
    // }

    // if (!res.ok || !json?.success) {
    //   return NextResponse.json({ success:false, error: json?.error || 'WP API error' }, { status: res.status || 500 });
    // }

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ success:false, error:'Internal server error', details:String(err?.message || err) }, { status:500 });
  }
}
