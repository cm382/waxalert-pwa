// WaxAlert PWA Service Worker
// - Cache the app shell for fast loads
// - NEVER cache POST requests (Apps Script API calls are POST)
// - NEVER cache script.google.com responses (avoid stale JSON)
// - Clean up old caches automatically

const CACHE = "waxalert-v6"; // bump this when you want to force an update

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Delete old caches
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)));

    // Take control immediately
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ IMPORTANT: Never attempt to cache non-GET (POST/PUT/etc.)
  // Your Apps Script calls use POST, and Cache API does not support cache.put() for POST.
  if (req.method !== "GET") {
    event.respondWith(fetch(req));
    return;
  }

  const url = new URL(req.u
::contentReference[oaicite:0]{index=0}
