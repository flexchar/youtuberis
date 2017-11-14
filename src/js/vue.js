import Vue from 'vue';
//Disqus Comments
Vue.component('VueDisqus', require('./components/VueDisqus.vue'));

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
});