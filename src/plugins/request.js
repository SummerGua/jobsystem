import Cookies from "js-cookie"

export function getToken(){
  if(Cookies.get('token')){    //判断是否有token
    return Cookies.get("token")
  }else{
    return
  }
}

export function getOthersName(){
  return this.$http.get("/api/getothersname")
}