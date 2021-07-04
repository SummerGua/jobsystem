import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Table,Pagination,Button,Dialog,MessageBox,Form,FormItem,
  Input,Alert,Message,Radio,RadioButton,DatePicker,Select,Option,Switch,Dropdown,
  DropdownItem,DropdownMenu,TableColumn,Rate, RadioGroup, Upload } from 'element-ui'

Vue.use(mavonEditor)
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
Vue.use(Rate)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm