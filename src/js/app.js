
let app = new Vue({
	el: '#app',
	delimiters: ['${', '}'],
	data: {
		isMenuActive: false,
		scrollPosition: 0
	},

	methods: {
		//Tracks scroll position to add shadow on navbar
		updateScroll() {
			this.scrollPosition = window.scrollY;
		},

		registerServiceWorker() {
			if ('serviceWorker' in navigator) return;
		}
	},

	mounted() {
		window.addEventListener('scroll', this.updateScroll, {passive: true});

		// Init SW
		this.registerServiceWorker();
	},

	components: {
		VueDisqus: require('./components/VueDisqus.vue'),
		Database: require('./components/Database.vue')
	}
});

