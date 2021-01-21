import Cookies from "js-cookie"
import vue from "../main"
export function getToken(){
  if(Cookies.get('token')){    //判断是否有token
    return Cookies.get("token")
  }else{
    return
  }
}

export function getMessageSenders(){
  return vue.$http.get("/api/getMessageSenders")
}

export function getReceivedResumes(){
  return vue.$http.get('/api/getReceivedResumes')
}