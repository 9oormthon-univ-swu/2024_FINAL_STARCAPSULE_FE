/* eslint-disable no-undef */
// This is the "Offline page" service worker
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const CACHE = 'pwabuilder-page';

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = 'offline.html';

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
    );
});
// eslint-disable-next-line no-undef
if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const preloadResp = await event.preloadResponse;

                    if (preloadResp) {
                        return preloadResp;
                    }

                    const networkResp = await fetch(event.request);
                    return networkResp;
                } catch (error) {
                    const cache = await caches.open(CACHE);
                    const cachedResp = await cache.match(offlineFallbackPage);
                    return cachedResp;
                }
            })()
        );
    }
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '192.png',
        badge: '192.png',
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

//콘솔창에 넣기_1
if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    });
}

//콘솔창에 넣기_2
navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification('테스트 알림 제목', {
        body: '이것은 푸시 알림 테스트입니다.',
        icon: '/icon-192x192.png',
    });
});
