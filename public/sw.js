// // /public/sw.js
// self.addEventListener('install', () => self.skipWaiting());
// self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// self.addEventListener('push', (event) => {
//   let data = {};
//   try { data = event.data ? event.data.json() : {}; } catch {}
//   const title = data.title || 'Tin nhanh';
//   const incoming = data.options || {};

//   // ép các giá trị giúp hiện banner rõ
//   const opts = {
//     body: incoming.body || '',
//     icon: incoming.icon || '/assets/images/icon/icon_menu_header.png',
//     badge: incoming.badge || '/assets/images/icon/icon_menu_header.png', // thêm file 72x72 trong /public/icons
//     data: incoming.data || {},
//     // tránh bị thay thế yên lặng
//     tag: (incoming.tag || 'newsflash') + '-' + Date.now(),
//     renotify: true,
//     // hiện cho tới khi user tương tác (ít nhất trong giai đoạn test)
//     requireInteraction: true,
//     // KHÔNG im lặng
//     silent: false,
//     timestamp: Date.now(),
//     // bạn có thể copy thêm các field khác từ incoming nếu muốn
//   };

//   event.waitUntil(self.registration.showNotification(title, opts));
// });

// self.addEventListener('notificationclick', (event) => {
//   event.notification.close();
//   const url = event.notification?.data?.url || '/';
//   event.waitUntil((async () => {
//     const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
//     for (const c of all) {
//       if ('focus' in c) { c.navigate(url); return c.focus(); }
//     }
//     if (clients.openWindow) return clients.openWindow(url);
//   })());
// });
// /public/sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting();               // update ngay khi có SW mới
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim()); // chiếm quyền tất cả client cùng origin
});

self.addEventListener('push', (event) => {
  // Nhớ: luôn bọc toàn bộ async trong waitUntil
  event.waitUntil((async () => {
    let p = {};
    try { p = event.data ? event.data.json() : {}; } catch {}
    const title = p.title || 'Tin mới';
    const opts = Object.assign({
      body: p.options?.body,
      icon: p.options?.icon ,
      badge: p.options?.badge,
      data: p.options?.data || {},
      tag: p.options?.tag || 'newsflash',
      renotify: true,
      // requireInteraction: true, // bật khi debug muốn giữ noti lâu trên desktop
    }, p.options || {});
    await self.registration.showNotification(title, opts);
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const u = new URL(url, location.origin).href;
    const hit = all.find(w => w.url === u);
    return hit ? hit.focus() : clients.openWindow(u);
  })());
});

