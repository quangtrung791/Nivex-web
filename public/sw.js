// public/sw.js
const CACHE_NAME = 'nivex-crypto-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/assets/style.css',
  '/app/bootstrap/css/bootstrap.min.css'
];

const API_CACHE_DURATION = 5 * 60 * 1000; // 5 phút
const STATIC_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 giờ

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache API responses với thời gian ngắn
  if (url.pathname.startsWith('/api/coins')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get('date'));
          const now = new Date();
          
          if (now - cachedDate < API_CACHE_DURATION) {
            return cachedResponse;
          }
        }
        
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Fallback to cache if network fails
          return cachedResponse || new Response('Network error', { status: 503 });
        }
      })
    );
    return;
  }

  // Cache static assets lâu dài
  if (url.pathname.startsWith('/assets/') || url.pathname.includes('.css') || url.pathname.includes('.js')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
