const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'offline.html',
  'splash.html',
  'css/styles.css',
  'css/splash.css',
  'js/script.js',
  'images/icon.png',
  'images/splash.png'
];

self.addEventListener('fetch', event => {
  // Redirigir la raíz (/) a splash.html
  if (event.request.mode === 'navigate' && event.request.url.endsWith('/')) {
    event.respondWith(caches.match('splash.html'));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// Al instalar el Service Worker, cacheamos los archivos necesarios
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados correctamente.');
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptamos las solicitudes para servir desde el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// Limpiamos cachés antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
