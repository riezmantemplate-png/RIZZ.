// Ubah VERSION setiap menerbitkan pembaruan aplikasi.
const VERSION = 'v1';
const PREFIX = 'rizz-dsg-' + self.registration.scope;
const CACHE = PREFIX + VERSION;
const CORE = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];
const CDN = ['https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        await cache.addAll(CORE);
        await Promise.allSettled(CDN.map(async url => {
            const response = await fetch(url, { mode: 'no-cors', signal: AbortSignal.timeout(8000) });
            if (response.ok || response.type === 'opaque') await cache.put(url, response);
        }));
        await self.skipWaiting();
    })());
});
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        for (const key of await caches.keys()) {
            if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
        }
        await self.clients.claim();
    })());
});
self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    const local = request.url.startsWith(self.registration.scope);
    const external = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname);
    if (!local && !external) return;
    event.respondWith((async () => {
        const cache = await caches.open(CACHE);
        try {
            const response = await fetch(request);
            if (response.ok || response.type === 'opaque') {
                await cache.put(request, response.clone()).catch(() => {});
            }
            return response;
        } catch (error) {
            const cached = await cache.match(request);
            if (cached) return cached;
            if (local && request.mode === 'navigate') {
                const shell = await cache.match(new URL('./index.html', self.registration.scope).href);
                if (shell) return shell;
            }
            return Response.error();
        }
    })());
});
