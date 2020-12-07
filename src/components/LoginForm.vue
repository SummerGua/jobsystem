<template>
  <div class="login-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      size="medium"
      :hide-required-asterisk=true
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button>
        <el-button @click="goRegister">没有账号？点此注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import axios from 'axios'
export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        name: "123",
        password: "123123",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          alert("登录失败");
          return false;
        }

        const { data: res } = await this.$http.post("api/login", {
          username: this.ruleForm.name,
          password: this.ruleForm.password
        });
        console.log(res);
        if (res.userInfo.code == 0) {
          this.$message.success("登录成功")
          Cookies.set("username", res.userInfo.username)
          let token = res.userInfo.uid;
          sessionStorage.setItem("token", token)
          sessionStorage.setItem("username",res.userInfo.username)
          axios.defaults.headers.common['Authorization'] = token
          this.$store.state.username = res.userInfo.username
          this.$store.state.isLogin = true
          this.$router.push("/");
        } else {
          this.$message.error("登录失败");
        }
      });
    },
    goRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form {
  width: 500px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
