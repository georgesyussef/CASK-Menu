self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('cask-app-cache-v2').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './clients.html',
        './admin.html',
        './logo.png',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});