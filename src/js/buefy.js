import Vue from 'vue';
/*
 * Buefy Components
 * import Buefy from 'buefy';
 */
import config, { setOptions } from 'buefy/src/utils/config'
setOptions(Object.assign(config, {
	defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultSnackbarDuration: 3500,
    defaultToastDuration: 2000,
    defaultTooltipType: 'is-primary',
    defaultTooltipAnimated: false,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null
}));

// import { Checkbox } from 'buefy/src/components/checkbox'
// Vue.component(Checkbox.name, Checkbox)
import { Dropdown, DropdownItem } from 'buefy/src/components/dropdown';
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
// import { Radio, RadioButton } from 'buefy/src/components/radio'
import { Table, TableColumn } from 'buefy/src/components/table'
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
// import { Tabs, TabItem } from 'buefy/src/components/tabs'
// import { Tag, Taglist } from 'buefy/src/components/tag'
// import Autocomplete from 'buefy/src/components/autocomplete'
// import Collapse from 'buefy/src/components/Collapse'
// import Datepicker from 'buefy/src/components/datepicker'
import Field from 'buefy/src/components/field'
Vue.component(Field.name, Field);
import Icon from 'buefy/src/components/icon';
Vue.component(Icon.name, Icon);
import Input from 'buefy/src/components/input'
Vue.component(Input.name, Input);
// import Message from 'buefy/src/components/message'
// import Notification from 'buefy/src/components/notification'
import Pagination from 'buefy/src/components/pagination'
Vue.component(Pagination.name, Pagination);
// import Panel from 'buefy/src/components/panel'
import Select from 'buefy/src/components/select'
Vue.component(Select.name, Select);
import Switch from 'buefy/src/components/switch'
Vue.component(Switch.name, Switch);
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