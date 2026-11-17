/* Functional, user-requested blank-record storage only. Never cache article HTML,
 * application chunks, account/API responses, analytics or visitor-entered data. */
const CACHE = 'lwa-blank-records-v1';
const FILES = ['/offline.html', '/resources/gp-appointment-symptom-medication-tracker.pdf', '/resources/flare-up-daily-log.pdf'];
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'SAVE_BLANK_RECORDS') return;
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => event.ports[0]?.postMessage({ saved: true })).catch(() => event.ports[0]?.postMessage({ saved: false })));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('lwa-blank-records-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (FILES.includes(url.pathname) && !url.search) {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) { const copy = response.clone();event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy))); }
      return response;
    }).catch(() => caches.match(url.pathname).then(cached => cached || Response.error())));
    return;
  }
  if (request.mode === 'navigate') {
    // Always fetch fresh clinical pages. Offline never means an old medical guide.
    event.respondWith(fetch(request).catch(() => caches.match('/offline.html').then(cached => cached || Response.error())));
  }
});
