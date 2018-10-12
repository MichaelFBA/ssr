(function () {
    'use strict';

    var CACHE_NAME = 1538465177034;
    var urlsToCache = ["/","/home/home.js","/manifest.json"];

    self.addEventListener("install", event => {
        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(cache => cache.addAll(urlsToCache))
                .then(() => self.skipWaiting())
        );
    });

    self.addEventListener("activate", event => {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                ).then(() => self.clients.claim());
            })
        );
    });

    self.addEventListener("fetch", event => {
        // const req = event.request.url.replace(self.location.origin, '').startsWith('/') ?
        // 	'/' :
        // 	event.request;
        // console.log('Handling fetch event for', event.request.url);

        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    // console.log('Found response in cache:', response);
                    return response;
                }
                // console.log('No response found in cache. About to fetch from network...');
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // console.log('Response from network is:', response);
                    // Check if we received a valid response
                    if (
                        !response ||
                        response.status !== 200 ||
                        response.type !== "basic"
                    ) {
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                });
            })
        );
    });

    self.addEventListener("notificationclick", event => {
        event.notification.close();

        event.waitUntil(
            self.clients.openWindow("https://my-custom.firebaseapp.com")
        );
    });

}());
