self.addEventListener("install", event => {
  console.log("Service Worker installed");
  event.waitUntil(
    caches.open("gps-app-cache").then(cache => {
      return cache.addAll([
        "gps_map.html",
        "manifest.json",
        "sw.js",
        "https://unpkg.com/leaflet/dist/leaflet.css",
        "https://unpkg.com/leaflet/dist/leaflet.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
