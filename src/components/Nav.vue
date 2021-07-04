<template>
  <div id="top" class="nav">
    <div class="nav-inner">
      <h2 class="logo">
        <router-link to="/"><a>招聘系统</a></router-link>
      </h2>
      <div v-show="!this.$store.state.isLogin" class="function">
        <router-link v-for="item in funcs" v-bind:key="item.id" :to="item.to">{{
          item.name
        }}</router-link>
      </div>
      
      <div v-show="this.$store.state.isLogin&&(this.$store.state.isStu==1)" class="info">
        <router-link to="/bbs"><a>讨论区</a></router-link>
        <router-link to="/message"><a>消息</a></router-link>
        <router-link to="/upload"><a>上传简历</a></router-link>
        <div class="my">
          <el-dropdown trigger="click">
            <span  class="el-dropdown-link drop-stu">
              {{this.$store.state.username}}
            </span>
            <el-dropdown-menu  slot="dropdown">
              <router-link to="myresumes">
                <el-dropdown-item class="item">
                我的简历
                </el-dropdown-item>
              </router-link>
              <router-link to="myInfo">
                <el-dropdown-item class="item">
                修改资料
                </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <a @click="logout">退出登录</a>
      </div>
      <div v-show="this.$store.state.isLogin&&(this.$store.state.isStu==0)" class="info-two">
        <router-link to="/newjob"><a>发布职位</a></router-link>
        <router-link to="/myjob"><a>我的职位</a></router-link>
        <router-link to="/message"><a>消息</a></router-link>
        <router-link to="/receivedResumes"><a>收到的简历</a></router-link>
        <router-link to="/processedResumes"><a>已处理简历</a></router-link>
        <span class="el-dropdown-link">{{this.$store.state.username}}</span>
        <a @click="logout">退出登录</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      funcs: [
        { id: 1, name: "登录", to: "/login" },
        { id: 2, name: "注册", to: "/signup" },
      ],
      username: ''
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$store.commit('storeLogout')
      this.$router.push("/login");
    }
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
.info,.info-two {
  float: right;
  display: flex;
  justify-content: space-around;
  height: 49px;
}
.info{
  width: 300px;
}
.info-two{
  width: 480px;
}
.function a {
  margin-left: 20px;
}

.info a:hover {
  cursor: pointer;
}
.my{
  height: 100%;
}
.el-dropdown-link{
  color: white;
  font-size: 16px;
}
.drop-stu:hover{
  cursor: pointer;
}
.item{
  width: 60px;
}

</style>