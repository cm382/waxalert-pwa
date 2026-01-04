const CACHE = 'waxalert-v1';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // App shell: cache-first
  if (APP_SHELL.some(p => new URL(req.url).pathname === p)) {
    event.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }

  // Everything else: network-first, fallback to cache
  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req))
  );
});
