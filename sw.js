
let cachName = "v1";
let cachFiles = [
     '/',
     'css/',
     'js/',
     'img/'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(

    	// Open the cache
	    caches.open(cachName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cachFiles);
	    })
      .catch(function (data){
        console.log(data);
      })
	);

});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
      if (response) return response;
      return fetch(e.request);
    })
    .catch(function(data) {
      console.log(data);
    })
  )
});
