import Vue from 'vue';
/*
 * Buefy Components
 * import Buefy from 'buefy';
 */
// import { Checkbox } from 'buefy/src/components/checkbox'
// Vue.component(Checkbox.name, Checkbox)
import { Dropdown, DropdownItem } from 'buefy/src/components/dropdown';
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
// import { Radio, RadioButton } from 'buefy/src/components/radio'
// import { Table, TableColumn } from 'buefy/src/components/table'
// import { Tabs, TabItem } from 'buefy/src/components/tabs'
// import { Tag, Taglist } from 'buefy/src/components/tag'
// import Autocomplete from 'buefy/src/components/autocomplete'
// import Collapse from 'buefy/src/components/Collapse'
// import Datepicker from 'buefy/src/components/datepicker'
// import Field from 'buefy/src/components/field'
import Icon from 'buefy/src/components/icon';
Vue.component(Icon.name, Icon);
// import Input from 'buefy/src/components/input'
// import Message from 'buefy/src/components/message'
// import Notification from 'buefy/src/components/notification'
// import Pagination from 'buefy/src/components/pagination'
// import Panel from 'buefy/src/components/panel'
// import Select from 'buefy/src/components/select'
// import Switch from 'buefy/src/components/switch'
// import Tooltip from 'buefy/src/components/tooltip'
// import Upload from 'buefy/src/components/upload'

// import Dialog from 'buefy/src/components/dialog'
// Vue.prototype.$dialog = Dialog
// import LoadingProgrammatic, { Loading } from 'buefy/src/components/loading'
// Vue.prototype.$loading = LoadingProgrammatic
// import ModalProgrammatic, { Modal } from 'buefy/src/components/modal'
// Vue.prototype.$modal = ModalProgrammatic
// import Snackbar from 'buefy/src/components/snackbar'
// Vue.prototype.$snackbar = Snackbar
// import Toast from 'buefy/src/components/toast'
// Vue.prototype.$toast = Toast;

// import config, { setOptions } from 'buefy/src/utils/config'
// console.log("setOptions", setOptions);
// setOptions(Object.assign(config, {
// 	defaultContainerElement: null,
//     defaultIconPack: 'mdi',
//     defaultSnackbarDuration: 3500,
//     defaultToastDuration: 2000,
//     defaultTooltipType: 'is-primary',
//     defaultTooltipAnimated: false,
//     defaultInputAutocomplete: 'on',
//     defaultDateFormatter: null,
//     defaultDateParser: null
// }));


import { zoom } from "@nishanths/zoom.js";
 
// var imgElem = new Image();
// imgElem.src = "tree.png";
// document.body.appendChild(imgElem);
 
// zoom.setup(imgElem);


//Disqus Comments
Vue.component('VueDisqus', require('vue-disqus/VueDisqus.vue'));

var app = new Vue({
	el: '#app',
	delimiters: ['{[', ']}'],
	data: {
		scrollPosition: 0,
		show: true
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