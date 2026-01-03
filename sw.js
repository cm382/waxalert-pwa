const CACHE = "waxalert-v5"; // bump when you deploy
const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ Never try to cache non-GET requests (POST/PUT/etc.)
  if (req.method !== "GET") {
    event.respondWith(fetch(req));
    return;
  }

  const url = new URL(req.url);

  // ✅ Never cache Apps Script API calls (optional but recommended)
  // This prevents stale JSON and weird behavior.
  if (url.hostname === "script.google.com") {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for app shell + static assets
  if (APP_SHELL.includes(url.pathname) || url.pathname.startsWith("/icons/")) {
    event.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }

  // Network-first for everything else, fallback to cache
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
