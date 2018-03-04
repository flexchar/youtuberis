/* 
 * ----------------------------------------------------------------------
 * VueJS + Buefy handler for displaying toast and snackbar notifications
 * API: https://buefy.github.io/#/documentation/toast
 * depends on VueJS and Buefy (and Bulma)
 * 
 * inspired by JACurtis notifiation.blade.php/LaraFlash Package
 * https://gist.github.com/jacurtis/9fa687e8f7512bb197decce7ffc30091
 *
 * ----------------------------------------------------------------------
 */

// Import options for granular application. 
// Remember: Bulma and Buefy _notices styles are also neccessary.
// import Vue from 'vue';

// import Snackbar from 'buefy/src/components/snackbar'
// Vue.prototype.$snackbar = Snackbar
// import Toast from 'buefy/src/components/toast'
// Vue.prototype.$toast = Toast;

/**
 * 
 * Shows notification (toast or snackbar).
 *
 * @use notify.{method_here}(params...)
 *
 * --------------------------------------------------------
 *
 * @method (accepts msg only) simple | primary | success | danger | warning | link | info | light
 * @method toast
 * 
 * @param {str}		msg 	Message text.
 * @param {str}		typ	 	Type (color) of the toast. Optional.
 * @param {int} 	dur 	Visibility in miliseconds. Optional.
 * @param {str}		pos 	Position toast appear. Optional.
 * 
 * --------------------------------------------------------
 *
 * @method snackbar
 *
 * @param {str}		msg 	Message text.
 * @param {obj}		opt 	Snackbar options. Optional.
 *
 * 		@param {int} 	duration 	Visibility in miliseconds.
 * 		@param {str}	position 	Position toast appear.
 * 		@param {str}	type 	 	Type (color) of the toast.
 * 		@param {str}	actionText 	Snackbar's button text.
 *
 * @param {func}	func 	Callback function. Optional.
 *
 * --------------------------------------------------------
 *
 * @return void
 *
 */

let notify = new Vue({
	methods: {
		open(msg) { 
			this.toast(msg) 
		},
		primary(msg) {
			this.toast(msg, 'primary');
		},
		info(msg) {
			this.toast(msg, 'info');
		},
		success(msg) {
			this.toast(msg, 'success');
		},
		warning(msg) {
			this.toast(msg, 'warning');
		},
		danger(msg) {
			this.toast(msg, 'danger');
		},
		link(msg) {
			this.toast(msg, 'link');
		},
		light(msg) {
			this.toast(msg, 'light');
		},
		toast(msg, typ = 'dark', dur = 3500, pos = 'top') {
			this.$toast.open({
				type: `is-${typ}`,
				message: msg,
				position: `is-${pos}`,
				duration: dur,
			});
		},
		snackbar(msg, opt = {}, func) {
			let defaults = {
				position: 'is-bottom-left',
				duration: 5000,
				type: 'is-success',
				actionText: null
			};
			let options = Object.assign({}, defaults, opt);

			this.$snackbar.open({
				type: options.type,
				message: msg,
				position: options.position,
				duration: options.duration,
				actionText: options.actionText,
				onAction: () => {
					if ( typeof func === 'function' ) func();
				}
			})
		}
	},
	created() {
		// this.success( 'notify.toast(\'It works!\')' );
	}

});
window.notify = notify;