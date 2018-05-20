
let cachName = "v1";
let cachFiles = [
     '/',
     './index.html',
     './restaurant.html',
     'css/styles.css',
     'img/1.jpg',
     'img/2.jpg',
     'img/3.jpg',
     'img/4.jpg',
     'img/5.jpg',
     'img/6.jpg',
     'img/7.jpg',
     'img/8.jpg',
     'img/9.jpg',
     'js/main.js',
     'js/restaurantInfo.js',
     'js/dbhelper.js',
     'data/restaurants.json'
]

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Installed');

    event.waitUntil(

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


self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/restaurant.html')) {
      event.respondWith(
          caches.match('restaurant.html')
          .then(response => response || fetch(event.request))
      );
      return;
}
});
