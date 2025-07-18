const CACHE_NAME = "fiche-hebdo-cache-v1";
const ASSETS_TO_CACHE = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "icons/icon-192.svg",
  "icons/icon-512.svg"
];

// 📦 Installation : mise en cache des fichiers essentiels
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ♻️ Activation : nettoyage ancien cache si nécessaire
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// 🌐 Interception des requêtes : chargement depuis cache ou web
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("index.html") // fallback offline
        )
      );
    })
  );
});
