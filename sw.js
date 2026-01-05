// WaxAlert Service Worker (V6)
// - Deterministic updates (network-first for index.html)
// - Cache-first for static same-origin assets
// - Never caches cross-origin (Apps Script) or non-GET

const CACHE = "waxalert-v6";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Always prefer network for index.html so deploys show up immediately
  if (url.pathname === "/" || url.pathname === "/index.html") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req, { cache: "no-store" });
        cache.put("/index.html", res.clone());
        cache.put("/", res.clone());
        return res;
      } catch (e) {
        // offline fallback
        return (await cache.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

  // App shell files: cache-first
  if (APP_SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  // Static assets: cache-first then network
  const isStatic = ["style", "script", "image", "font"].includes(req.destination);
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

  // Everything else: network-only
});
