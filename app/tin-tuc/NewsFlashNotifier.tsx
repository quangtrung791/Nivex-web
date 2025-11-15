'use client';
import { useEffect, useState } from 'react';

// const NEWS_API =
//   'https://nivexhub.learningchain.vn/wp-json/nivex/v1/news_flash?status=active&per_page=1';

// Cho TS chấp nhận các field phổ biến khi showNotification
type NotificationOptionsCompat = NotificationOptions & {
  renotify?: boolean;
  requireInteraction?: boolean;
  data?: any;
};

function base64urlToUint8Array(base64url: string) {
  const padding = '='.repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

// function stripHtmlToText(html: string): string {
//   const div = document.createElement('div');
//   div.innerHTML = html || '';
//   return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
// }
// function oneLineEllipsis(input: string, maxChars = 120): string {
//   const s = (input || '').replace(/\r?\n|\r/g, ' ');
//   return s.length > maxChars ? s.slice(0, maxChars - 1).trimEnd() + '…' : s;
// }

// --- NEW: phát hiện trình duyệt và sinh hướng dẫn bật lại thông báo
function buildEnableNotifSteps(): string[] {
  if (typeof navigator === 'undefined') return generic();
  const ua = navigator.userAgent.toLowerCase();

  const chromeLike = /chrome|crios/.test(ua) && !/edg\//.test(ua) && !/opr\//.test(ua);
  const edge = /edg\//.test(ua);
  const firefox = /firefox|fxios/.test(ua);
  const safari = /safari/.test(ua) && !/chrome|crios|android/.test(ua);

  if (chromeLike) {
    return [
      'Nhấn vào biểu tượng ổ khóa (trên thanh địa chỉ).',
      'Chọn “Cài đặt trang” (Site settings).',
      'Tìm mục “Notifications” (Thông báo) → chuyển sang “Allow”.',
      `Đảm bảo domain: ${location.origin}`,
    ];
  }
  if (edge) {
    return [
      'Nhấn vào biểu tượng ổ khóa (trên thanh địa chỉ).',
      'Chọn “Permissions for this site”.',
      'Tìm “Notifications” → đặt thành “Allow”.',
      `Đảm bảo domain: ${location.origin}`,
    ];
  }
  if (firefox) {
    return [
      'Vào Settings → Privacy & Security.',
      'Trong phần Permissions → Notifications → Settings…',
      `Tìm ${location.origin} và đặt “Allow”.`,
    ];
  }
  if (safari) {
    return [
      'Safari → Settings (Preferences) → Websites → Notifications.',
      `Tìm ${location.origin} → chọn “Allow”.`,
      'Trên iOS: Settings của iOS → Safari → Notifications → Allow.',
    ];
  }
  return generic();

  function generic() {
    return [
      'Mở cài đặt quyền thông báo của trình duyệt.',
      `Tìm website ${location.origin} và bật “Allow/Cho phép”.`,
    ];
  }
}

export default function NewsFlashNotifier() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [reason, setReason] = useState<'default' | 'denied' | 'insecure' | 'unsupported' | null>(null);

  // NEW: hộp hướng dẫn bật lại thông báo
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpSteps, setHelpSteps] = useState<string[]>([]);

  // 1) Đăng ký SW
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/sw.js').catch(() => {});
  //   }
  // }, []);

  // 2) Kiểm tra quyền → gợi ý xin phép hoặc hướng dẫn
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
      setReason('unsupported');
      setShowPrompt(true);
      return;
    }
    if (!window.isSecureContext) {
      setReason('insecure');
      setShowPrompt(true);
      return;
    }

    const perm = Notification.permission;
    if (perm === 'granted') {
      subscribeIfNeeded().catch(() => {});
      return;
    }

    // Nếu đang denied, mở luôn hộp hướng dẫn
    if (perm === 'denied') {
      setReason('denied');
      setHelpSteps(buildEnableNotifSteps());
      setHelpOpen(true);
      setShowPrompt(true);
      return;
    }

    // default
    setReason('default');
    setShowPrompt(true);
  }, []);

  // 3) Xin quyền (bị denied thì hiện hướng dẫn)
  async function askPermission() {
    try {
      // Nếu đã bị denied rồi, khỏi gọi requestPermission; mở hướng dẫn luôn
      if (Notification.permission === 'denied') {
        setReason('denied');
        setHelpSteps(buildEnableNotifSteps());
        setHelpOpen(true);
        setShowPrompt(true);
        return;
      }

      const p = await Notification.requestPermission();
      if (p === 'granted') {
        setShowPrompt(false);
        subscribeIfNeeded().catch(() => {});
        // await pingOnceForNow();
      } else if (p === 'denied') {
        setReason('denied');
        setHelpSteps(buildEnableNotifSteps());
        setHelpOpen(true);
        setShowPrompt(true);
      } else {
        setReason('default');
        setShowPrompt(true);
      }
    } catch {
      // ignore
    }
  }

  // Đăng ký Push nếu chưa có
  async function subscribeIfNeeded() {
    // đăng ký SW (scope gốc)
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    let sub = await reg.pushManager.getSubscription();

    if (!sub) {
        const applicationServerKey = base64urlToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY_BASE64URL as string
        );
        sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
        // GỬI THẲNG subscription (không bọc { sub })
        await fetch('https://nivexhub.learningchain.vn/wp-json/nivex/v1/subscribe_web_notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.WP_APP_PASS_B64 ? { Authorization: `Basic ${process.env.WP_APP_PASS_B64}` } : {}),
          },
          body: JSON.stringify(sub),
          cache: 'no-store',
        });
    }
  }

  if (!showPrompt) return null;

  const message =
    reason === 'unsupported'
      ? 'Trình duyệt không hỗ trợ Notifications.'
      : reason === 'insecure'
      ? 'Thông báo cần chạy trên HTTPS.'
      : reason === 'denied'
      ? 'Bạn đã chặn thông báo cho website này.'
      : 'Cho phép Nivex gửi tin mới nhất?';

  return (
    <div className="nvx-notif-bar" role="dialog" aria-live="polite">
      <span>{message}</span>

      <div className="nvx-actions">
        {reason !== 'unsupported' && reason !== 'insecure' && (
          <button className="nvx-allow" onClick={askPermission}>
            Cho phép
          </button>
        )}
        {reason === 'denied' && (
          <button
            className="nvx-help"
            onClick={() => {
              setHelpSteps(buildEnableNotifSteps());
              setHelpOpen((v) => !v);
            }}
          >
            Cách bật lại
          </button>
        )}
        <button className="nvx-deny" onClick={() => setShowPrompt(false)}>
          Để sau
        </button>
      </div>

      {helpOpen && (
        <div className="nvx-helpbox">
          <b>Hướng dẫn bật lại thông báo:</b>
          <ul>
            {helpSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <button className="nvx-close" onClick={() => setHelpOpen(false)}>
            Đã hiểu
          </button>
        </div>
      )}

      <style jsx>{`
        .nvx-notif-bar {
          position: fixed;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999999;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          background: #1e1f22;
          border: 1px solid #fff;
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 6px 20px rgba(24, 114, 51, 0.25);
          max-width: 90%;
          color: #fff;
          font-size: 14px;
          flex-direction: column;
        }
        .nvx-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nvx-notif-bar button {
          cursor: pointer;
          border: 1px solid #333;
          border-radius: 999px;
          padding: 6px 12px;
          background: #2b2b2b;
          color: #fff;
        }
        .nvx-notif-bar button.nvx-allow {
          background: linear-gradient(90deg, #bcfe08, #86f969);
          color: #000;
          border-color: #000;
          margin-right: 0;
        }
        .nvx-notif-bar button.nvx-deny {
          color:rgb(197, 197, 197);
        }
        .nvx-helpbox {
          width: 100%;
          background: #111;
          border: 1px solid #2b2b2b;
          border-radius: 10px;
          padding: 10px 12px;
        }
        .nvx-helpbox ul {
          margin: 8px 0 0 18px;
        }
        .nvx-close {
          margin-top: 8px;
          background: #2b2b2b;
        }
      `}</style>
    </div>
  );
}