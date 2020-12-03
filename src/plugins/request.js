export function getToken(){
  return localStorage.getItem("token")
}

export function getOthersName(){
  return this.$http.get("/api/getothersname")
}