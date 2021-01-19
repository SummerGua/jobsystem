import Vue from 'vue'
import './assets/style/global.css'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store/store.js'
import guards from './router/guards.js'
import { getToken } from './plugins/request'
require('./mock')

Vue.prototype.$http = axios.create({
  baseURL: '/',  //测试用
  timeout: 5000, //请求超时时间
  withCredentials: true, //跨域
  headers: { 'token': getToken() }
})

Vue.config.productionTip = false

export default new Vue({
  router,
  guards,
  store,
  render: h => h(App)
}).$mount('#app')
