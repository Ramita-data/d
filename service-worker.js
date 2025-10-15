const cacheName = 'dreampop-cache-v1';
const assets = [
  'index.html',
  'style.css',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Install: cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// Fetch: serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(k => caches.delete(k)))
    )
  );
});
