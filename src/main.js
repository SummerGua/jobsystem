import Vue from 'vue'
import './assets/style/global.css'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import instance from './axios'
import store from './store/store.js'
import guards from './router/guards.js'
import VueClipboard from 'vue-clipboard2'
import socketio from 'socket.io-client'
import 'font-awesome/css/font-awesome.min.css'


Vue.use(VueClipboard)

//require('./mock')
Vue.prototype.$http = instance
Vue.prototype.$io = socketio('http://localhost:3000',{
  transports: ['websocket']
})
Vue.config.productionTip = false

export default new Vue({
  router,
  guards,
  store,
  render: h => h(App)
}).$mount('#app')
