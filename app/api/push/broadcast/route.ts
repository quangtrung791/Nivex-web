// app/api/push/broadcast/route.ts
import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:admin@your-domain.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY_BASE64URL!, // base64url public
  process.env.VAPID_PRIVATE_KEY!                       // private
);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // 1) Verify Bearer secret từ WP
  const auth = req.headers.get('authorization') || '';
  if (auth !== `Bearer NVX_PUSH_SECRET_89900902334673634665236`) {
    return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  }

  // 2) Payload tin (WP đã gửi sẵn)
  const { title, options } = await req.json();
  if (!title || !options) {
    return NextResponse.json({ ok:false, error:'bad_payload' }, { status:400 });
  }

  // 3) Lấy subscriptions từ WP
  const subsRes = await fetch(
    `https://nivexhub.learningchain.vn/wp-json/nivex/v1/webpush_subscriptions`,
    {
    //   headers: {
    //     'Authorization': `Basic ${process.env.WP_APP_PASS_B64}`, // Application Password của WP
    //   },
      cache: 'no-store',
    }
  );
  if (!subsRes.ok) {
    return NextResponse.json({ ok:false, error:'list_subs_failed' }, { status:500 });
  }
  const subsJson = await subsRes.json();
  const subs: Array<{endpoint:string, p256dh:string, auth:string}> = subsJson?.data || [];
  if (!subs.length) {
    return NextResponse.json({ ok:true, sent:0 });
  }

  // 4) Gửi push
  const payload = JSON.stringify({ title, options });
  const results = await Promise.allSettled(
    subs.map(async (s) => {
      const subscription = {
        endpoint: s.endpoint,
        keys: { p256dh: s.p256dh, auth: s.auth },
      };

      try {
        await webpush.sendNotification(subscription as any, payload, {
          TTL: 600,           // hết hạn sau 10 phút
          urgency: 'high',    // đẩy ưu tiên cao
          topic: 'newsflash', // optional
        });
      } catch (e: any) {
        // endpoint chết → nhờ WP xoá
        const status = e?.statusCode || e?.statusCode;
        if (status === 404 || status === 410) {
          await fetch(
            `${process.env.WP_API_BASE}/wp-json/nivex/v1/webpush_subscriptions?endpoint=${encodeURIComponent(s.endpoint)}`,
            {
              method: 'DELETE',
              headers: { 'Authorization': `Basic ${process.env.WP_APP_PASS_B64}` },
            }
          ).catch(() => {});
        }
      }
    })
  );

  return NextResponse.json({ ok:true, sent: results.length });
}
