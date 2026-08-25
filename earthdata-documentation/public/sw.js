const cacheName = self.location.pathname
const pages = [

  "/categories/",
    "/",
    "/tags/",
    "/fr/categories/",
    "/fr/",
    "/fr/tags/",
    "/de/categories/",
    "/de/",
    "/de/tags/",
    "/book.min.4d77e98d764f495b145946ef9260681bab38aaf7bc01f96a6f61a3a0fea19dbf.css",
  "/en.search-data.min.4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945.json",
  "/en.search.min.10f5f416a6685a4a575730eff31c0e50e4d2d49459e9cdc16cf4735de61f62e6.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
