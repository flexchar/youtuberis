const app = new Vue({
	el: '#app',
	delimiters: ['${', '}'],
	data: {
		isMenuActive: false,
		scrollPosition: 0
	},
	methods: {
		// Tracks scroll position to add shadow on navbar
		updateScroll() {
			this.scrollPosition = window.scrollY;
		},

		registerServiceWorker() {
			if (! 'serviceWorker' in navigator) return;
			if ( window && window.location && window.location.hostname === 'localhost' ) return;

			// If loaded offline, shows notification when comes online and offers refresh
			if (!navigator.onLine) {
				window.addEventListener('online', () => {
					notify.snackbar('Atsirado internetas, ar tęsti?', {actionText: 'TAIP'}, () => { 
						window.location.reload();
					});
				}, {passive: true})
			}

			// Does all the beauty
			navigator.serviceWorker.register('/sw.js').then( reg => {
				
				window.addEventListener('load', () => {
					// Notifies on successful registration
					if (reg.installing) {
						reg.installing.onstatechange = e => {
							if (reg.active) {
								if (e.currentTarget.onstatechange) e.currentTarget.onstatechange = null;
								notify.primary('Svetainė veiks ir be interneto. 😎');
							}
						};
					}
					// Trim Caches
					if ('active' in reg && reg.active) reg.active.postMessage('trimCaches');
				}, {passive: true, once: true});
			}).catch( err => {
				// notify.danger('SW Klaida.');
				console.log('Service Worker not installed. |', err);
			});
		},

		userExperience() {
			// Adds shadow to navbar
			window.addEventListener('scroll', this.updateScroll, {passive: true});
			
			// Shows online/offline notification
			window.addEventListener('online', () => { notify.toast('Prisijungta.', 'link', 2000, 'top-right'); }, {passive: true});
			window.addEventListener('offline', () => { notify.toast('Atsijungta.', 'link', 2000, 'top-right'); }, {passive: true});

			// PNG Fallback for SVG brand image
			document.getElementById('brand').addEventListener('error', () => {this.src='/img/brand.png'}, {passive: true, once: true});
		},

		bannerImage() {
			try {
				const pageData = JSON.parse(document.getElementById('pageData').innerText);
				const images = pageData.image;
				const banner = document.getElementById('bannerImage');
				Object.assign(banner.style, {
					background: `url('${images[0]}')`,
				});
			} catch(e) {
				// console.log('Banner image not available.');
			}
		}	
	},

	mounted() {
		this.userExperience();
		this.registerServiceWorker();
		this.bannerImage();
	},

	components: {
		VueDisqus: require('./components/VueDisqus.vue'),
		Database: require('./components/Database.vue')
	}
});
