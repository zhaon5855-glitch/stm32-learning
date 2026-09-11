// 纯透传模式：不缓存任何内容，保证更新即时生效
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  // 只在离线时回退到缓存，正常情况下始终走网络
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
