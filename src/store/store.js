import Vue from 'vue';
import Vuex from 'vuex';
import {getToken} from '../plugins/request'
Vue.use(Vuex)
let state = {
  username: '',
  isLogin: false,
  isStu: false,
}
if(getToken()){
  state.isLogin = true
}
export default new Vuex.Store({
  state,
  mutations:{
    storeLogout(state){
      state.isLogin = false
    },
    beStu(state){
      state.isStu = true
    },
    clearName(state){
      state.username = ''
    }
  }
	
})