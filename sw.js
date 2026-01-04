// WaxAlert PWA Service Worker (safe + sync-friendly)
const CACHE = "waxalert-v7";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
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

  // Never cache non-GET (Apps Script calls are POST)
  if (req.method !== "GET") {
    event.respondWith(fetch(req));
    return;
  }

  const url = new URL(req.url);

  // Never cache Apps Script responses
  if (url.hostname === "script.google.com") {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first for app shell + icons
  if (APP_SHELL.includes(url.pathname) || url.pathname.startsWith("/icons/")) {
    event.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
