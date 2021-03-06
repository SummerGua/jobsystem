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
    path: '/signup',
    name: 'Signup',
    meta: {
      needLogin: false
    },
    component: () => import('../views/Signup.vue')
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
    component: () => import('../views/MyResumes.vue')
  },
  {
    path: '/receivedResumes',
    name: 'ReceivedResumes',
    meta:{
      needLogin: true,
      needStu: false
    },
    component: () => import('../views/ReceivedResumes.vue')
  },
  //处理的简历
  {
    path: '/processedResumes',
    name: 'ProcessedResumes',
    meta: {
      needLogin: true,
      needStu: false
    },
    component: () => import('../views/ProcessedResumes.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    meta: {
      needLogin: true,
    },
    component: () => import('../views/Preview.vue')
  },
  {
    path: '/newjob',
    name: 'NewJob',
    meta: {
      needLogin: true,
      needStu: false
    },
    component: () => import('../views/NewJob.vue')
  },
  {
    path: '/myjob',
    name: 'MyJob',
    meta: {
      needLogin: true,
      needStu: false
    },
    component: () => import('../views/MyJob.vue')
  },
  {
    path: '/companyInfo',
    name: 'CompanyInfo',
    component: () => import('../views/CompanyInfo.vue')
  },
  {
    path: '/bbs',
    name: 'Bbs',
    meta: {
      needLogin: true,
    },
    component: () => import('../views/Bbs.vue')
  },
  {
    path: '/post',
    name: 'Post',
    meta: {
      needLogin: true,
    },
    component: () => import('../views/Post.vue')
  },
  {
    path: '/newPost',
    name: 'NewPost',
    meta: {
      needLogin: true
    },
    component: () => import('../views/NewPost.vue')
  },
  {
    path: '/myCRs', //我的收藏回复等
    name: 'MyCRs',
    meta: {
      needLogin: true
    },
    component: () => import('../views/MyCRs.vue')
  },
  {
    path: '/myInfo',
    name: 'MyInfo',
    meta: {
      needLogin: true
    },
    component: () => import('../views/MyInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
