const CACHE = "waxalert-v4";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/sw.js",
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

  // Only handle same-origin (prevents caching script.google.com, etc.)
  if (url.origin !== self.location.origin) return;

  // App shell: cache-first
  if (APP_SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  // Navigations: stale-while-revalidate with fallback to cached index
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);

      // Try cached page for this exact navigation request
      const cached = await cache.match(req);

      const networkPromise = fetch(req)
        .then((res) => {
          // Cache the actual navigation response
          cache.put(req, res.clone());
          // Also refresh index.html as a fallback shell
          cache.put("/index.html", res.clone());
          return res;
        })
        .catch(() => null);

      return cached || (await networkPromise) || (await cache.match("/index.html")) || Response.error();
    })());
    return;
  }

  // Static assets: cache-first
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
