import router from '../router/index'
import store from '../store/store.js'
const guards = router.beforeEach(function(to,from,next){
  if('needLogin' in to.meta === false){
    next()
  }
  if('needLogin' in to.meta && to.meta.needLogin){
    if(store.state.isLogin){ //需要登录+已经登录
      next()
    }else{ //需要登录+未登录，跳转登录
      next({
        name: 'Login'
      })
    }
  }
  if('needLogin' in to.meta && to.meta.needLogin==false){ //无需登录
    if(store.state.isLogin){
      next({
        name: 'Home' //不能重复登录
      })
    }else{
      next()
    }
  }
  
  if('needStu' in to.meta && to.meta.needStu){
    if(sessionStorage.getItem('isStu')==1){ //去学生的页面
      next()
    }else{
      alert("您不是学生，无访问权限")
      next({
        name: 'Home'
      })
    }
  }
  if('needStu' in to.meta && to.meta.needStu===false){
    if(store.state.isLogin&&store.state.isStu){
      alert("您不是企业，无访问权限")
      next({
        name: 'Home'
      })
    }
    else if(store.state.isLogin && !store.state.isStu){
      next()
    }else{
      alert("请先登录")
      next({
        name: 'Home'
      })
    }
  }
})
export default guards