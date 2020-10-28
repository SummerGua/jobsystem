import Vue from 'vue'
import './assets/style/global.css'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store/store.js'

require('./mock')

Vue.prototype.$http = axios.create({
  baseURL: '/', //测试用
  timeout: 5000, //请求超时时间
  withCredentials: true
})
Vue.config.productionTip = false

router.beforeEach(function(to,from,next){
  if(to.meta.needLogin){
    if(localStorage.getItem("token")&&store.state.isLogin===true){
      next()
    }else{
      next({
        name: 'Login'
      })
    }
  }else{
    next()
  }
  if(to.meta.noNeedLogin){
    if(store.state.isLogin===false){
      next()
    }else{
      next({
        name: 'Home'
      })
    }
    
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
