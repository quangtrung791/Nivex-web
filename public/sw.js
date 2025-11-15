// --- SW cơ bản của bạn ---
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// ==================== FCM (compat) ====================
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js');

// Only need projectId & messagingSenderId here; full config cũng được
firebase.initializeApp({
  projectId: 'nivex-hub',
  messagingSenderId: '302794987102',
});

const messaging = firebase.messaging();

// Nhận message nền do FCM đẩy (app đang background/đóng)
// Payload có thể chứa notification & data
messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  const data = payload.data || {};
  const title = n.title || 'Tin mới';
  const body  = n.body  || '';
  // Link ưu tiên theo fcmOptions.link (browser tự xử), fallback data.url
  const url = data.url || '/';

  self.registration.showNotification(title, {
    body,
    icon: n.icon || '/icons/icon-192.png',
    badge: n.badge || '/icons/badge-72.png',
    tag: data.tag || 'newsflash',
    data: { url }
  });
});

// Click mở đúng trang
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const u = new URL(url, location.origin).href;
    const hit = all.find(w => w.url === u);
    return hit ? hit.focus() : clients.openWindow(u);
  })());
});

// Optional: offline HTML đơn giản
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(event.request); }
      catch { return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } }); }
    })());
  }
});
