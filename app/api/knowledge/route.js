import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic      = searchParams.get('topic') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const search     = searchParams.get('search') || '';
    const offset     = searchParams.get('offset') || '0';
    const limit      = searchParams.get('limit')  || '6';

    const wp = new URL('https://nivexhub.learningchain.vn/wp-json/nivex/v1/knowledge');
    if (topic)      wp.searchParams.set('topic', topic);
    if (difficulty) wp.searchParams.set('difficulty', difficulty);
    if (search)     wp.searchParams.set('search', search);
    wp.searchParams.set('offset', offset);
    wp.searchParams.set('limit',  limit);

    const res = await fetch(wp.toString(), { cache: 'no-store' });

    let json;
    try { json = await res.json(); }
    catch {
      const text = await res.text();
      return NextResponse.json({ success:false, error:'Invalid JSON from WP', body:text.slice(0,500) }, { status:500 });
    }

    if (!res.ok || !json?.success) {
      return NextResponse.json({ success:false, error: json?.error || 'WP API error' }, { status:500 });
    }

    // JSON từ WP đã đúng shape frontend cần, trả thẳng luôn:
    return NextResponse.json(json);

  } catch (err) {
    return NextResponse.json(
      { success:false, error:'Không thể tải danh sách kiến thức', details:String(err?.message || err) },
      { status:500 }
    );
  }
}
