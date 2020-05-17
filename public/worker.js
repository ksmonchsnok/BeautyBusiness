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
'../src/pages/admin/admin.js',
'../src/pages/admin/storeList.js',
'../src/pages/admin/userList.js',
'../src/pages/admin/report.js',
'../src/pages/manager/manager.js',
'../src/pages/store/allStores.js',
'../src/pages/store/store-detail.js',
'../src/pages/user/discountCode.js',
'../src/pages/user/user.js',
'../src/pages/nearby/nearby.js',
'../src/pages/regisStore/regisStore.js',
'../src/pages/register/register.js',
'../src/pages/contact/contact.js',
'../src/components/filter/filter.js',
'../src/components/navbar/navbar.js',
'../src/components/navbar/navbar-Admin.js',
'../src/components/popup/popupLogin.js',
'../src/assets/logo/logo2.jpg',
];

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
