import Vue from 'vue';
import Vuex from 'vuex';
import {getToken} from '../plugins/request'
Vue.use(Vuex)
let state = {
  username: '',
  isLogin: false,
  isStu: undefined,
  uid: undefined
}
if(getToken()){
  state.isLogin = true
}
export default new Vuex.Store({
  state,
  mutations:{
    storeLogout(state){
      state.isLogin = undefined
      state.uid = ''
      state.isStu = ''
      state.username = ''
      
    },
    beStu(state){
      state.isStu = 1
    },
    noStu(state){
      state.isStu = 0
    },
    clearName(state){
      state.username = ''
    },
    updateName(state,x){
      state.username = x
    },
    updateUid(state,x){
      state.uid = x
    },
    storeLogin(state){
      state.isLogin = true
    }
  }
	
})