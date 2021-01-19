import Vue from 'vue';
import Vuex from 'vuex';
import {getToken} from '../plugins/request'
Vue.use(Vuex)
let state = {
  username: '',
  isLogin: false,
  isStu: undefined,
}
if(getToken()){
  state.isLogin = true
}
export default new Vuex.Store({
	
	state
	
})