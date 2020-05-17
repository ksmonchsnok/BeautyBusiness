var CACHE_NAME = "Beauty-Business";
var urlsToCache = [ '/',
'/public/index.html',
'../src/index.js',
'../src/style.css',
'../src/serviceWorker.js',
'../src/route/route.js',
'../src/service/firebase/createReduxStore.js',
'../src/service/firebase/firebase-config.js',
'../src/service/firebase/firebase-index.js',
'../src/pages/home/home.js',
'../src/pages/admin/loginForAdmin.js',
'../src/pages/register/register.js'];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["Beauty-Business"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
