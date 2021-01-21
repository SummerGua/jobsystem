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
      needLogin: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      needLogin: false
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
    path: '/process',
    name: 'Process',
    meta:{
      needLogin:true,
      needStu: true
    },
    component: ()=> import('../views/Process.vue')
  },

  //处理的简历
  {
    path: '/processedResumes',
    name: 'ProcessedResumes',
    meta:{
      needLogin: true,
      needStu: false
    },
    component: ()=> import('../views/ProcessedResumes.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
