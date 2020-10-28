import router from '../router/index'
import store from '../store/store.js'
const guards = router.beforeEach(function(to,from,next){
  if(to.meta.needLogin){
    if(store.state.isLogin===true){
      next()
    }else{
      next({
        name: 'Login'
      })
    }
  }
  else if(to.meta.noNeedLogin){
    if(store.state.isLogin===true){
      next({
        name: 'Home'
      })
    }else{
      next()
    }
  }
  else{
    next()
  }
})
export default guards