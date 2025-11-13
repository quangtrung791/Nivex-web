'use client';
import { useEffect, useState } from 'react';

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

// ==== Helpers: iOS / Standalone detection ====
function isIOSUA() {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function inStandalone() {
  if (typeof window === 'undefined') return false;
  // iOS Safari cũ: navigator.standalone; hiện đại: display-mode: standalone
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

type Reason =
  | 'default'
  | 'denied'
  | 'insecure'
  | 'unsupported'
  | 'ios-a2hs'
  | null;

export default function NewsFlashNotifier() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [reason, setReason] = useState<Reason>(null);

  // A2HS banners / Android install
  const [showIOSA2HS, setShowIOSA2HS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showAndroidInstall, setShowAndroidInstall] = useState(false);

  // 1) Android/desktop: hứng beforeinstallprompt để chủ động hiển thị nút "Cài đặt"
  useEffect(() => {
    const onBIP = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowAndroidInstall(true);
    };
    window.addEventListener('beforeinstallprompt', onBIP);
    const onInstalled = () => setDeferredPrompt(null);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  async function handleAndroidInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice; // { outcome: 'accepted' | 'dismissed' }
    setDeferredPrompt(null);
    setShowAndroidInstall(false);
  }

  // 2) Kiểm tra ngữ cảnh để chọn thông điệp phù hợp
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // iOS: nếu chưa standalone (chưa Add to Home Screen) ⇒ hướng dẫn A2HS
    if (isIOSUA() && !inStandalone()) {
      setReason('ios-a2hs');
      setShowIOSA2HS(true);
      setShowPrompt(true);
      return;
    }

    // Bình thường: kiểm tra hỗ trợ Notification & secure context
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

    // Nếu đã granted ⇒ đăng ký/đồng bộ sub
    if (Notification.permission === 'granted') {
      subscribeIfNeeded().catch(() => {});
      return;
    }

    if (Notification.permission === 'denied') {
      setReason('denied');
      setShowPrompt(true);
      return;
    }

    // default: hỏi người dùng cho phép
    setReason('default');
    setShowPrompt(true);
  }, []);

  // 3) Xin quyền (bị denied thì hiện hướng dẫn)
  async function askPermission() {
    try {
      if (Notification.permission === 'denied') {
        setReason('denied');
        setShowPrompt(true);
        return;
      }
      const p = await Notification.requestPermission();
      if (p === 'granted') {
        setShowPrompt(false);
        subscribeIfNeeded().catch(() => {});
      } else if (p === 'denied') {
        setReason('denied');
        setShowPrompt(true);
      } else {
        setReason('default');
        setShowPrompt(true);
      }
    } catch {
      // ignore
    }
  }

  // 4) Đăng ký Push nếu chưa có
  async function subscribeIfNeeded() {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const applicationServerKey = base64urlToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY_BASE64URL as string
      );
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
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

  // ===== UI =====
  const message =
    reason === 'ios-a2hs'
      ? 'Để bật thông báo trên iPhone/iPad, bạn cần cài ứng dụng web (Add to Home Screen).'
      : reason === 'unsupported'
      ? 'Trình duyệt không hỗ trợ Notifications.'
      : reason === 'insecure'
      ? 'Thông báo cần chạy trên HTTPS.'
      : reason === 'denied'
      ? 'Bạn đã chặn thông báo cho website này.'
      : 'Cho phép Nivex gửi tin mới nhất?';

  return (
    <div className="nvx-notif-bar" role="dialog" aria-live="polite">
      <span>{message}</span>

      {/* ANDROID / DESKTOP: cài PWA */}
      {showAndroidInstall && reason !== 'ios-a2hs' && (
        <button className="nvx-allow" onClick={handleAndroidInstall}>
          Cài đặt ứng dụng
        </button>
      )}

      {/* iOS: hướng dẫn Add to Home Screen */}
      {showIOSA2HS && reason === 'ios-a2hs' && (
        <div className="nvx-helpbox">
          <b>Cài ứng dụng web trên iPhone/iPad:</b>
          <ul>
            <li>Mở menu <i>Share</i> (biểu tượng ⬆️ trong Safari).</li>
            <li>Chọn <b>Add to Home Screen</b>.</li>
            <li>Mở lại từ icon ngoài màn hình, sau đó bấm <b>Cho phép</b> để bật thông báo.</li>
          </ul>
        </div>
      )}

      {/* Quy trình xin quyền chuẩn */}
      {(reason === 'default' || reason === 'denied') && (
        <div className="nvx-actions">
          <button className="nvx-allow" onClick={askPermission}>Cho phép</button>
          <button className="nvx-deny" onClick={() => setShowPrompt(false)}>Để sau</button>
        </div>
      )}

      {(reason === 'unsupported' || reason === 'insecure') && (
        <div className="nvx-actions">
          <button className="nvx-deny" onClick={() => setShowPrompt(false)}>Đã hiểu</button>
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
        .nvx-notif-bar .nvx-allow {
          background: linear-gradient(90deg, #bcfe08, #86f969);
          color: #000;
          border-color: #000;
        }
        .nvx-notif-bar .nvx-deny {
          color: rgb(197, 197, 197);
        }
        .nvx-helpbox {
          width: 100%;
          background: #111;
          border: 1px solid #2b2b2b;
          border-radius: 10px;
          padding: 10px 12px;
        }
        .nvx-helpbox ul { margin: 8px 0 0 18px; }
      `}</style>
    </div>
  );
}
