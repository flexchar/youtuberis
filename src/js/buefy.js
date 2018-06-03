/*
 * Buefy Components
 * https://buefy.github.io/#/documentation/customization
 * import Buefy from 'buefy';
 */
 

/* 
 * ----------
 *  DEFAULTS
 * ----------
 */

import config, { setOptions } from 'buefy/src/utils/config'
setOptions(Object.assign(config, {
    // defaultContainerElement: null,
    defaultIconPack: null,
    // defaultDialogConfirmText: null,
    // defaultDialogCancelText: null,
    // defaultSnackbarDuration: 3500,
    // defaultToastDuration: 2000,
    // defaultTooltipType: 'is-primary',
    // defaultTooltipAnimated: false,
    // defaultInputAutocomplete: 'on',
    // defaultDateFormatter: null,
    // defaultDateParser: null,
    // defaultDayNames: null,
    // defaultMonthNames: null,
    // defaultFirstDayOfWeek: null,
    // defaultUnselectableDaysOfWeek: null,
    // defaultTimeFormatter: null,
    // defaultTimeParser: null,
    // defaultModalScroll: null,
    // defaultDatepickerMobileNative: true,
    // defaultTimepickerMobileNative: true,
    defaultNoticeQueue: false	
}));


/* 
 * ------------
 *  COMPONENTS
 * ------------
 */

// import { Checkbox, CheckboxButton } from 'buefy/src/omponents/checkbox'
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
// import Taginput from 'buefy/src/components/taginput'
// import Timepicker from 'buefy/src/components/timepicker'
// import Tooltip from 'buefy/src/components/tooltip'
// import Upload from 'buefy/src/components/upload'

// import Dialog from 'buefy/src/components/dialog'
// Vue.prototype.$dialog = Dialog
// import LoadingProgrammatic, { Loading } from 'buefy/src/components/loading'
// Vue.prototype.$loading = LoadingProgrammatic
// import ModalProgrammatic, { Modal } from 'buefy/src/components/modal'
// Vue.prototype.$modal = ModalProgrammatic
import Snackbar from 'buefy/src/components/snackbar'
Vue.prototype.$snackbar = Snackbar
import Toast from 'buefy/src/components/toast'
Vue.prototype.$toast = Toast;