'use client';
import { useEffect, useState } from 'react';
import { getClientMessaging, messagingSupported } from '../../lib/firebaseClient';
import { getToken, onMessage } from 'firebase/messaging';

export default function NewsFlashNotifier() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [reason, setReason] = useState<'default'|'denied'|'insecure'|'unsupported'|null>(null);

  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined') return;

      if (!(await messagingSupported())) { setReason('unsupported'); setShowPrompt(true); return; }
      if (!window.isSecureContext)       { setReason('insecure');   setShowPrompt(true); return; }

      const perm = Notification.permission;
      if (perm === 'granted') {
        await ensureFcmRegistered();
        return;
      }
      if (perm === 'denied') { setReason('denied'); setShowPrompt(true); return; }
      setReason('default'); setShowPrompt(true);
    })();
  }, []);

  async function askPermission() {
    if (Notification.permission === 'denied') { setReason('denied'); setShowPrompt(true); return; }
    const p = await Notification.requestPermission();
    if (p === 'granted') { setShowPrompt(false); await ensureFcmRegistered(); }
    else if (p === 'denied') { setReason('denied'); setShowPrompt(true); }
    else { setReason('default'); setShowPrompt(true); }
  }

  async function ensureFcmRegistered() {
    // 1) Đăng ký đúng SW hiện có
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

    // 2) Lấy/ghi FCM token
    const messaging = getClientMessaging();
    const vapidKey  = process.env.NEXT_PUBLIC_FCM_VAPID_KEY!;
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: reg });
    if (token) {
      // Gửi token về WP (endpoint mới - xem mục 7)
      await fetch(`${process.env.NEXT_PUBLIC_WP_BASE ?? 'https://nivexhub.learningchain.vn'}/wp-json/nivex/v1/fcm_tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(process.env.WP_APP_PASS_B64 ? { Authorization: process.env.WP_APP_PASS_B64 } : {}) },
        body: JSON.stringify({ token }),
      }).catch(() => {});
    }

    // 3) Foreground message (tab đang mở)
    onMessage(messaging, (payload) => {
      const n = payload.notification || {};
      const body = n.body || '';
      try {
        new Notification(n.title || 'Tin mới', { body, icon: n.icon || 'https://nivexhub.learningchain.vn/wp-content/uploads/2025/11/icon-nivex-for-notify-web-push_3x.webp' });
      } catch {
      }
    });
  }

  if (!showPrompt) return null;

  return (
    <div className="nvx-notif-bar">
      <span>
        {reason === 'unsupported' ? 'Trình duyệt không hỗ trợ Notifications.'
        : reason === 'insecure'   ? 'Thông báo cần chạy trên HTTPS.'
        : reason === 'denied'     ? 'Bạn đã chặn thông báo cho website này.'
        : 'Cho phép Nivex gửi tin mới nhất?'}
      </span>
      {(reason !== 'unsupported' && reason !== 'insecure') && (
        <button className="nvx-allow" onClick={askPermission}>Cho phép</button>
      )}
      <button className="nvx-deny" onClick={() => setShowPrompt(false)}>Để sau</button>
      {/* CSS rút gọn */}
      <style jsx>{`
        .nvx-notif-bar { position:fixed; top:10px; left:50%; transform:translateX(-50%); z-index:999999;
          display:flex; gap:12px; align-items:center; background:#1e1f22; color:#fff; border:1px solid #fff; padding:10px 14px; border-radius:14px; }
        .nvx-allow { background:linear-gradient(90deg,#bcfe08,#86f969); color:#000; border:1px solid #000; border-radius:999px; padding:6px 12px; }
        .nvx-deny { border:1px solid #333; border-radius:999px; padding:6px 12px; background:#2b2b2b; color:#fff; }
      `}</style>
    </div>
  );
}
