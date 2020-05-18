if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../src/serviceWorker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  var cacheName = 'Beauty Business';
var filesToCache = [
  '/',
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
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });

  var dataCacheName = 'Beauty Business';

  if (key !== cacheName && key !== dataCacheName) { 
    self.addEventListener('fetch', function(e) {
        console.log('[Service Worker] Fetch', e.request.url);
        var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
        if (e.request.url.indexOf(dataUrl) > -1) {
          e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
              return fetch(e.request).then(function(response){
                cache.put(e.request.url, response.clone());
                return response;
              });
            })
          );
        } else {
          e.respondWith(
            caches.match(e.request).then(function(response) {
              return response || fetch(e.request);
            })
          );
        }
      })
    }

    if ('caches' in window) {
        caches.match(url).then(function(response) {
          if (response) {
            response.json().then(function updateFromCache(json) {
              var results = json.query.results;
              results.key = key;
              results.label = label;
              results.created = json.query.created;
              app.updateForecastCard(results);
            });
          }
        });
      }

      var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }