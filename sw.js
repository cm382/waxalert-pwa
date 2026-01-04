const CACHE = "waxalert-v3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install: cache shell
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

// Activate: clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

// Fetch strategy:
// - Never cache non-GET
// - Never cache cross-origin (e.g., script.google.com)
// - Stale-while-revalidate for navigations / same-origin docs
// - Cache-first for same-origin static assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== "GET") return;

  // Only cache same-origin requests (your domain)
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return;

  // App shell always served from cache first
  if (APP_SHELL.includes(url.pathname)) {
    event.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }

  // Navigations (loading pages) => stale-while-revalidate
  if (req.mode === "navigate" || (req.destination === "document")) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match("/index.html");
      const networkFetch = fetch(req)
        .then((res) => {
          // Optionally refresh cached index.html if it’s same-origin
          cache.put("/index.html", res.clone());
          return res;
        })
        .catch(() => null);

      // Prefer cached for speed, fall back to network
      return cached || (await networkFetch) || Response.error();
    })());
    return;
  }

  // Static assets (css/js/images/fonts) => cache-first, then network
  const isStatic =
    ["style", "script", "image", "font"].includes(req.destination);

  if (isStatic) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;

      const res = await fetch(req);
      cache.put(req, res.clone());
      return res;
    })());
    return;
  }

  // Everything else => network-only (no caching surprises)
  // (This keeps you safe if you later add /api endpoints, etc.)
  return;
});
