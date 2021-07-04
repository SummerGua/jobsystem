import vue from "../main"
export function getToken() {
  if(sessionStorage.getItem('token')) {    //判断是否有token
    return sessionStorage.getItem("token")
  }else{
    return
  }
}

export function getMessageSenders() {
  return vue.$http.get("/users/getMessageSenders")
}

export function getReceivedResumes(query) {
  return vue.$http.get('/users/getReceivedResumes?' + query)
}

export function sendMessage(x) {
  return vue.$http.post('/users/sendMessage', x)
}
