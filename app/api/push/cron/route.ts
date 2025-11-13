import { NextResponse } from 'next/server';
import webpush from 'web-push';

const WP_BASE   = 'https://nivexhub.learningchain.vn';                 // vd: https://nivexhub.learningchain.vn
// const WP_SECRET = process.env.WP_PUSH_SECRET || '';     // trùng option nvx_push_cron_secret trong WP (nếu bạn bật)
const NEWS_API  = `${WP_BASE}/wp-json/nivex/v1/news_flash?status=active&per_page=1`;

// App Password (tùy chọn). Ví dụ: echo -n 'user:app-password' | base64
const WP_APP_PASS_B64 = process.env.WP_APP_PASS_B64 || '';

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:admin@your-domain.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY_BASE64URL!, // public key
  process.env.VAPID_PRIVATE_KEY!                       // private key
);

export const dynamic = 'force-dynamic';

type SubRow = { endpoint: string; p256dh: string; auth: string };

function stripTags(html: string): string {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function ellipsis(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

export async function GET() {
  try {
    // 1) Lấy tin nhanh mới nhất
    const newsRes = await fetch(NEWS_API, { cache: 'no-store' });
    if (!newsRes.ok) {
      return NextResponse.json({ ok:false, step:'news_api', status:newsRes.status }, { status:502 });
    }
    const newsJson = await newsRes.json();
    const item = newsJson?.data?.[0];
    if (!item) return NextResponse.json({ ok:true, reason:'no_item' });

    // 2) Lấy state & subs từ WP
    const qs = new URLSearchParams();

    const commonGetHeaders: HeadersInit = {
      ...(WP_APP_PASS_B64 ? { Authorization: `Basic ${WP_APP_PASS_B64}` } : {}),
    };

    const stateRes = await fetch(
      `${WP_BASE}/wp-json/nivex/v1/cron_web_notification?${qs.toString()}`,
      { cache: 'no-store', headers: commonGetHeaders }
    );
    if (!stateRes.ok) {
      return NextResponse.json({ ok:false, step:'state_get', status:stateRes.status }, { status:502 });
    }
    const stateJson = await stateRes.json() as { ok: boolean; last_id: string; subs: SubRow[] };

    const lastId = stateJson?.last_id ? Number(stateJson.last_id) : 0;
    const subs   = Array.isArray(stateJson?.subs) ? stateJson.subs : [];
    if (Number(item.id) === lastId) {
      return NextResponse.json({ ok:true, reason:'no_change', lastId });
    }

    // 3) Chuẩn bị payload push
    const title = stripTags(item.title || 'Tin nhanh');
    const body  = ellipsis(stripTags(item.content || ''), 120);
    const payload = JSON.stringify({
      title,
      options: {
        body,
        icon: item.thumbnail_url || '/assets/images/icon/icon_menu_header.png',
        tag: `newsflash-${item.id}`,
        renotify: true,
        requireInteraction: true,
        silent: false,
        data: { url: `/tin-tuc/${item.slug || ''}` }
      }
    });

    // 4) Gửi push
    let sent = 0;
    const prune: string[] = [];

    for (const s of subs) {
      const subscription = {
        endpoint: s.endpoint,
        keys: { p256dh: s.p256dh, auth: s.auth }
      } as any;

      try {
        const res = await webpush.sendNotification(subscription, payload, { TTL: 1800 });
        if (res?.statusCode === 201) sent++;
      } catch (e: any) {
        const status = e?.statusCode;
        if (status === 404 || status === 410) {
          prune.push(s.endpoint); // client huỷ đăng ký, xoá ở WP
        }
      }
    }

    // 5) Báo WP cập nhật last_id + prune endpoints chết
    const postHeaders: HeadersInit = {
      'Content-Type':'application/json',
      ...(WP_APP_PASS_B64 ? { Authorization: `Basic ${WP_APP_PASS_B64}` } : {}),
    };

    const postRes = await fetch(
      `${WP_BASE}/wp-json/nivex/v1/cron_web_notification?${qs.toString()}`,
      {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify({ last_id: String(item.id), prune_endpoints: prune })
      }
    );

    if (!postRes.ok) {
      return NextResponse.json({ ok:false, step:'state_post', status:postRes.status }, { status:502 });
    }
    const postJson = await postRes.json();

    return NextResponse.json({
      ok: true,
      pushed_id: item.id,
      sent,
      pruned: prune.length,
      state: postJson
    });
  } catch (err: any) {
    return NextResponse.json({ ok:false, error: String(err?.message || err) }, { status:500 });
  }
}
