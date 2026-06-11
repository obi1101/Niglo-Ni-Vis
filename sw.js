const CACHE = 'niglo-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/images/logo.png',
  '/images/banniere.png',
  '/images/bg-hero.jpeg',
  '/images/logo-mode-niglo.png',
  '/images/niglo-halloween.jpeg',
  '/images/niglo-ni-fist.png',
  '/images/niglo-ni-fist-2.png',
  '/images/niglo-univers-sale.png',
  '/images/niglo-colle-ateral.jpeg',
  '/images/niglo-ni-spike.png',
  '/images/niglo-ni-mix.png',
  '/images/sweat-univers-sale.jpg',
  '/images/sweat-zip-collateral.jpg',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
