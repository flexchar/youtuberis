/**
 * --------------------------------------
 * Sophisticated Worker | Youtuberis.lt
 * Designed to be updated with new release
 * --------------------------------------
 */

const date = '2018-04-12';

const cachePrefix = 'Youtuberis';

// Website/mandatory assets
const assetsCache = cachePrefix + '::assets::' + date;
// Images
const imagesCache = cachePrefix + '::images::' + date;
// Pages and everything else
const dynamicCache = cachePrefix + '::dynamic::' + date;

// Mandatory assets has to be caches before installation completes
// Correct pathname is important
const assetsList = [
	'/styles.css',
	'/loader.css',
	'/scripts.js',
	'/manifest.json',
	'/img/brand.svg',
	'/offline/',
	'/'
];

// List of new articles for example
const wantedList = [
	'/kaip-vienas-zodis-gali-padvigubinti-youtube-perziuras/'
];

// SVG fallback for images
let offlineFigure = `
<svg role="img" aria-labelledby="neprisijungęs-nuotrauka" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto; width: 80%">
	<title>neprisijungęs</title>
	<g fill="none" fill-rule="evenodd">
		<path fill="#000" fill-opacity="0.1" d="M0 0h200v150H0z"/>
		
		<g fill="#ccc" transform="translate(75,30) scale(2,2)">
			<path d="M23.7 22.3l-16.9-16.9c0 0 0 0 0 0l-5.1-5.1c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l4.1 4.1c-1.3 0.7-2.5 1.5-3.6 2.5-0.4 0.4-0.5 1-0.1 1.4 0.2 0.2 0.4 0.3 0.7 0.3 0.2 0 0.5-0.1 0.7-0.3 1.1-1 2.4-1.8 3.8-2.4l2.3 2.3c-1.4 0.5-2.7 1.2-3.9 2.1-0.4 0.4-0.5 1-0.1 1.4 0.2 0.2 0.5 0.4 0.8 0.4 0.2 0 0.5-0.1 0.6-0.2 1.2-1 2.7-1.7 4.2-2.1l2.8 2.8c-1.6-0.1-3.3 0.3-4.6 1.3-0.5 0.3-0.6 0.9-0.2 1.4 0.3 0.4 0.9 0.6 1.4 0.2 1.7-1.2 4.1-1.2 5.8 0 0.2 0.1 0.4 0.2 0.6 0.2 0.1 0 0.1 0 0.2 0l6.6 6.6c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.3-0.4 0.3-1-0.1-1.4z"></path>
			<path d="M15.8 10.6c-0.2 0.5 0 1.1 0.5 1.3 0.7 0.4 1.4 0.8 2.1 1.4 0.2 0.2 0.4 0.2 0.6 0.2 0.3 0 0.6-0.1 0.8-0.4 0.4-0.4 0.3-1.1-0.1-1.4-0.8-0.6-1.6-1.2-2.5-1.6-0.5-0.2-1.1 0-1.4 0.5z"></path>
			<path d="M10.8 6c4-0.3 8.1 1 11.1 3.7 0.2 0.2 0.4 0.2 0.7 0.2s0.6-0.1 0.8-0.3c0.4-0.4 0.3-1-0.1-1.4-3.4-3-8-4.6-12.6-4.2-0.6 0-1 0.5-0.9 1.1 0 0.6 0.4 1 1 0.9z"></path>
			<path d="M11.3 19.3c-0.2 0.2-0.3 0.4-0.3 0.7s0.1 0.5 0.3 0.7c0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.2-0.2 0.3-0.5 0.3-0.7s-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4 0z"></path>
		</g>

		<text fill="#bbb" transform="translate(60,100)" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="12" font-weight="bold">
			<tspan>neprisijungęs</tspan>
		</text>
	</g>
</svg>
`


/**
 * --------------------------------------
 * CACHE MANAGEMENT
 * --------------------------------------
 */

// Cache static assets on install, (into assetsCache)
// Inlcuding cookies for Netlify split feature
function precache() { 
	caches.open(assetsCache)
		.then(cache => cache.addAll( assetsList.map( entry => new Request(entry, {credentials: 'include'})) ) );
}
// Try to cache wanted resources, non-blocking (into dynamicCache)
function precacheWanted() { 
	caches.open(dynamicCache)
		.then(cache => cache.addAll( wantedList.map( entry => new Request(entry, {credentials: 'include'})) ) );
}

// Prevent caches from blowing user's device
function trimCaches(name, size = 31) {
	caches.open(name).then(c => c.keys()).then(keys => {
			if (keys.length > size) return;
			c.delete[keys[0]].then( trimCaches(name, size) );
		}
	)
}

// Remove old caches
function cleanCaches() {
	return caches.keys().then( keys => {
		keys.forEach(key => {
			let keyParts = key.split('::');
			// Skip if not ours
			if (keyParts[0] !== cachePrefix) return;

			if (keyParts[2] !== date) {
				caches.delete(key);
			}
		});
	});
}

// Cache given resource
function cacheAdd(req, res, cache) {
	caches.open(cache).then(
		c => c.put(req, res)
	)
}

// Check if resource belongs to assetCache
function isAsset(url) {
	// Look if belongs to primary
	if (assetsList.indexOf(url.pathname) !== -1) return true;
	// In case slash at the end is forgotten
	if (assetsList.indexOf(url.pathname + '/') !== -1) return true;
	return false;
}

/**
 * --------------------------------------
 * EVENT LISTENERS
 * --------------------------------------
 */

self.addEventListener('message', evt => {
	if (evt.data === 'trimCaches') {
		trimCaches(imagesCache, 20);
		trimCaches(dynamicCache, 30);
	}
});

self.addEventListener('install', evt => {
	// Skip waiting once installed
	self.skipWaiting();
	// Cache mandatory assets
	evt.waitUntil(precache());
	// Start caching wanted resources
	precacheWanted();
});

self.addEventListener('activate', evt => {
	// Remove old caches
	evt.waitUntil(cleanCaches());
	// Take control over all clients
	self.clients.claim();
});

self.addEventListener('fetch', evt => {
	let request = evt.request;
	let url = new URL(request.url);

	// console.log('url.hostname', url.hostname)
	// console.log('self.location.hostname', self.location.hostname)
	// console.log('url',url)
	
	// Skip non default requests 
	if (request.method !== "GET" && request.method !== "HEAD") {
		return;
	}

	// Ignore Disqus requests
	if (/.*disqus(cdn)?.com/.test(url.host)) {
		// console.log('[fetch] skipped on disqus.com');
		return;
	}

	// For fonts CacheFirst
	if (/.*materialdesignicons\.com/.test(url.host)) {
		// console.log('[fetch] exec cacheFirst on materialdesignicons');
		return cacheFirst(evt);
	}

	// For images CacheFirst
	if (/\.(?:png|gif|jpg|jpeg|svg)$/.test(url.pathname)) {
		// Find which cache it belongs
		return cacheFirst(evt, imagesCache);
	}

	// For local manifest file
	if (/.*\/manifest\.json&/.test(url.pathname) && self.location.hostname === url.hostname) {
		return cacheFirst(evt, assetsCache);
	}

	// For css, js stale-w-update
	if (/\.(?:js|css)$/.test(url.pathname)) {
		// Do NOT cache service worker
		if (/.*sw.js/.test(url.pathname)) return;
		// Check for appropriate cache
		if (isAsset(url)) return cacheFirst(evt, assetsCache);
		return staleRevalidate(evt);
	}

	// For HTML requests stale-w-update
	if (request.headers.get('Accept').indexOf('text/html') !== -1) {
		// Check for appropriate cache
		if (isAsset(url)) return cacheFirst(evt, assetsCache);
		return staleRevalidate(evt);
	}

	// For all other
	return networkFirst(evt);

})


/**
 * --------------------------------------
 * FETCH HANDLERS
 * --------------------------------------
 */

function fallback(evt) {
	let headers = evt.request.headers.get('Accept');
	// It's tricky, beacause headers can have both and image, and html
	// only checking for image would lead image response being returned instead html
	// only return image if headers does NOT accept html
	if (headers.indexOf('image') !== -1 && headers.indexOf('text/html') === -1) {
        return new Response(offlineFigure, {
        	headers: {
        		'Content-Type': 'image/svg+xml',
        		"Cache-Control": "no-store"
        	}
        });
	}
	// If headers do accept html, go ahead for /offline/ page.
	if (headers.indexOf('text/html') !== -1) {
		return caches.match('/offline/').then(res => {
			return res;
		});
	}
	// This should not happen, but if so- give at least something
	return new Response('Įvyko kažkas neplanuoto...', {
        	headers: {'Content-Type': 'text/html'}
        });
}

// Stale-while-revalidate (fetch from cache, then update cached with one from network) concept implementation
function staleRevalidate(evt, cache = dynamicCache) {
	evt.respondWith(
		// Look in cache first
		caches.match(evt.request).then(res => {
			// Start fetch promise for an update or a fallback if not found in cache
			let fetchHandler = fetch(evt.request).then(res => {
				if (res.type === 'basic' && res.status === 200) cacheAdd(evt.request, res.clone(), cache);
				return res;
			}).catch( () => {return fallback(evt)} );
			return res || fetchHandler;
		})
	)
}

function cacheFirst(evt, cache = dynamicCache) {
	evt.respondWith(
		caches.match(evt.request).then(res => {
			// If not cached, try to fetch and cache
			return res || fetch(evt.request).then(res => {
				if (res.type === 'basic' && res.status === 200) cacheAdd(evt.request, res.clone(), cache);
				return res;
			}).catch( () => fallback(evt) );
		})
	)
}

function networkFirst(evt) {
	// Fetch, check in cache or fallback, won't cache response
	evt.respondWith(
		fetch(evt.request).catch(() =>
			caches.match(evt.request) || fallback(evt)
		)
	)
}

// Not in-use, Commented-out for minification
// function cacheOnly(evt) {
// 	evt.respondWith(
// 		caches.match(evt.request).then( res => res || fallback(evt)	);
// 	)
// }

// function networkOnly(evt) {
// 	evt.respondWith(
// 		fetch(evt.request)
// 			.then(res => res)
// 			.catch(err => err)
// 	)
// }

