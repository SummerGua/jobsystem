<template>
  <div class="nav">
    <div class="nav-inner">
      <h2 class="logo">
        <router-link to="/"><a>招聘系统</a></router-link>
      </h2>
      <div v-show="!this.$store.state.isLogin" class="function">
        <router-link v-for="item in funcs" v-bind:key="item.id" :to="item.to">{{
          item.name
        }}</router-link>
      </div>
      
      <div v-show="this.$store.state.isLogin" class="info">
        <router-link to="/message"><a>消息</a></router-link>
        <router-link to="/upload"><a>上传简历</a></router-link>
        <a>{{this.$store.state.username}}</a>
        <div class="my">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          我的<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >我的简历</el-dropdown-item>
          <el-dropdown-item >投递进度</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
        <a @click="logout">退出登录</a>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie"
export default {
  name: "Nav",
  data() {
    return {
      funcs: [
        { id: 0, name: "上传简历", to: "/upload" },
        { id: 1, name: "登录", to: "/login" },
        { id: 2, name: "注册", to: "/register" },
      ]
    };
  },
  methods: {
    getName() {
      let username = Cookies.get('username')
      if(username){
        this.$store.state.username = username
        this.$store.state.isLogin = true
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.$store.state.isLogin = false;
      Cookies.remove('username');
      this.$router.push("/login");
    },
  },
  created() {
    this.getName();
  },
};
</script>
<style scoped>
* {
  margin: 0 auto;
  padding: 0;
}
.nav {
  
  width: 100%;
  height: 49px;
  background-color: #409eff;
  text-decoration-line: none;
}

.nav-inner {
  padding-right: 20px;
  line-height: 49px;
  position: relative;
}
a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: #dcdfe6;
}
.logo {
  float: left;
  padding-left: 20px;
}
.function {
  float: right;
}
.info {
  float: right;
}
.function a {
  margin-left: 20px;
}
.info a {
  margin-left: 20px;
}
.info a:hover {
  cursor: pointer;
}
.my{
  width: 80px;
  margin: 0;
}
</style>