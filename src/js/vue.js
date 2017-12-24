import Vue from 'vue';

var app = new Vue({
	el: '#app',
	delimiters: ['${', '}'],
	data: {
		isMenuActive: false,
		scrollPosition: 0,
		visible: false
	},

	methods: {
		//Tracks scroll position to add shadow on navbar
		updateScroll() {
			this.scrollPosition = window.scrollY
		},
		toggleShow() {
			this.show = !this.show;
		}
	},

	mounted() {
		window.addEventListener('scroll', this.updateScroll);
	},
	components: {
		VueDisqus: require('./components/VueDisqus.vue'),
		Database: require('./components/Database.vue')
	}
});

