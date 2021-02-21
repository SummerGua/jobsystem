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
        <el-button @click="goSignup">没有账号？点此注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        name: "zhangsan",
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

        const { data: res } = await this.$http.post("users/login", {
          name: this.ruleForm.name,
          password: this.ruleForm.password
        });
        if (res.code == 0) {
          this.$message.success("登录成功")
          let token = res.token
          sessionStorage.setItem("token", token)
          sessionStorage.setItem("uid",res.uid)
          sessionStorage.setItem("isStu",res.isStu)
          sessionStorage.setItem("name",res.name)
          axios.defaults.headers.common['Authorization'] = token
          this.$store.commit('updateName',res.name)
          this.$store.commit('updateUid',res.uid)
          this.$store.commit('storeLogin')
          if(res.isStu==1) this.$store.commit('beStu')
          if(res.isStu==0) this.$store.commit('noStu')
          this.$router.push("/")
        } else {
          this.$message.error(res.data)
        }
      });
    },
    goSignup() {
      this.$router.push("/Signup")
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
