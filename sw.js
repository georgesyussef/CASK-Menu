// GHayyarna l-isem la v2 khermal l-browser y-m7i l-cache l-2adeem fawran
const CACHE_NAME = 'cask-cache-v2'; 

const urlsToCache = [
  './',
  'index.html',
  'clients.html',
  'admin.html',
  'manifest.json',
  'logo.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate & Delete Old Caches (Bi-m7i ayy Cache 2adeem)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network First strategy (y-jeb men l-Internet awwal, law ma fi net y-jeb men l-cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});