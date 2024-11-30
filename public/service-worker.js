/* eslint-disable no-undef */
// Import Workbox CDN
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const CACHE_NAME = 'snowlog_1.0.3';
const offlineFallbackPage = '/offline.html';

// 리소스 캐싱 리스트
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

// Install Event
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing and caching assets...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // 즉시 활성화
});

// Activate Event
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating and cleaning old caches...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(
                            `[Service Worker] Deleting old cache: ${cacheName}`
                        );
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // 활성화 후 즉시 컨트롤
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    const networkResponse = await fetch(event.request);

                    // 리다이렉션된 경우, 최종 URL을 사용
                    if (networkResponse.redirected) {
                        const finalResponse = await fetch(networkResponse.url);
                        return finalResponse;
                    }

                    return networkResponse;
                } catch (error) {
                    console.log(
                        '[Service Worker] Fetch failed, serving cached fallback'
                    );
                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse =
                        await cache.match(offlineFallbackPage);
                    return cachedResponse;
                }
            })()
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

// // Push Notification Event
// self.addEventListener('push', (event) => {
//     const data = event.data.json();
//     const options = {
//         body: data.body,
//         icon: '192.png',
//         badge: '192.png',
//     };
//     event.waitUntil(self.registration.showNotification(data.title, options));
// });

// // Notification Permission
// if ('Notification' in window && 'serviceWorker' in navigator) {
//     Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') {
//             console.log('Notification permission granted.');
//         }
//     });
// }

// // Test Notification
// navigator.serviceWorker.ready.then((registration) => {
//     registration.showNotification('테스트 알림 제목', {
//         body: '이것은 푸시 알림 테스트입니다.',
//         icon: '/icon-192x192.png',
//     });
// });
