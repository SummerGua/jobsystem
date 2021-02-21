import axios from 'axios'
import router from './router'

let instance = axios.create({
  //baseURL: '/',  //mock用
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000, //请求超时时间
  //withCredentials: true, //跨域
})

//请求拦截 带上token
instance.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    if(token){

      config.headers['Authorization'] = token 
    }
    return config
  },
  err => Promise.reject(err)
)

instance.interceptors.response.use(
  response => response,
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default instance