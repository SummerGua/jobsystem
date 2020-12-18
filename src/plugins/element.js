import Vue from 'vue'
import { Table,Pagination,Button,Dialog,MessageBox,Form,FormItem,
  Input,Alert,Message,Radio,DatePicker,Select,Option,Switch,Dropdown,
  DropdownItem,DropdownMenu,TableColumn } from 'element-ui'

Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Alert)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox