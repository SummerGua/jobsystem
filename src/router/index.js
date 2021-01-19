import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      noNeedLogin: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      noNeedLogin: true
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    meta: {
      needLogin: true,
      needStu: true
    },
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      needLogin: true
    },
    component: () => import('../views/Message.vue')
  },
  {
    path: '/myresumes',
    name: 'MyResumes',
    meta:{
      needLogin: true,
      needStu: true
    },
    component: ()=> import('../views/MyResumes.vue')
  },
  {
    path: '/receivedResumes',
    name: 'ReceivedResumes',
    meta:{
      needLogin: true,
      needStu: false
    },
    component: ()=> import('../views/ReceivedResumes.vue')
  },
  {
    path: '/okTipProgress',
    name: 'OkTipProgress',
    meta:{
      needLogin:true,
      needStu: true
    },
    component: ()=> import('../views/Progress.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
