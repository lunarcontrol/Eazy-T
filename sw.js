// var CACHE_NAME = 'version-one';
// var urlsToCache = [
//   './index.html',
//   './about.html',
//   './settings.html',
//   './css/bars.css',
//   './css/index.css',
//   './js/alertify.js'
// ];
//v1.0.2

self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open(' cache-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        '/Eazy-T/index.html',
        '/Eazy-T/css/index.css',
        '/Eazy-T/css/bars.css',
        '/Eazy-T/js/alertify.js',
        '/Eazy-T/js/jsonQ/jsonQ.min.js',
        '/Eazy-T/css/css/fontawesome-all.css',
        '/Eazy-T/js/pulltorefresh-js-0.1.14/dist/pulltorefresh.js',
        '/Eazy-T/css/webfonts/fa-solid-900.woff2',
        'https://unpkg.com/hammer-touchemulator@0.0.2/touch-emulator.js',
        '/Eazy-T/manifest.json',
        '/Eazy-T/images/icons/icon-144x144.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, which
  // will result in default browser behavior
  'https://api.torn.com/user/'
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});
