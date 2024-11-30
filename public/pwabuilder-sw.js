/* eslint-disable no-undef */
// This is the "Offline page" service worker
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const CACHE = 'snowlog_1.0.1';

const offlineFallbackPage = '/offline.html';

const ASSETS_TO_CACHE = [
    offlineFallbackPage,
    '/manifest.json',
    '/assets/calendar/image.png',
    '/assets/calendar/triangle.png',
    '/assets/object/christmas_tree.svg',
    '/assets/object/gingerbread_house.svg',
    '/assets/object/lamplight.svg',
    '/assets/object/moon.svg',
    '/assets/object/santa_sleigh.svg',
    '/assets/object/santa.svg',
    '/assets/object/snowflake.svg',
    '/assets/object/snowman.svg',
    '/assets/object/default_snowball.svg',
    '/assets/object/selected_snowball.svg',
    '/assets/background_bottom.svg',
    '/assets/Frame_1321315804.svg',
    '/assets/Popup.svg',
    '/assets/snowball_image.svg',
];

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    console.log('[Service Worker] Installing and caching assets...');
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log('[Service Worker] Caching offline page and assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // 즉시 활성화
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
                    console.log(
                        '[Service Worker] Fetch failed, serving cached fallback'
                    );
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

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating and cleaning old caches...');
    const allowedCaches = [CACHE]; // 현재 캐시 이름만 유지

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!allowedCaches.includes(cacheName)) {
                        console.log(
                            '[Service Worker] Deleting old cache:',
                            cacheName
                        );
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    return self.clients.claim(); // 활성화 후 즉시 컨트롤
});
