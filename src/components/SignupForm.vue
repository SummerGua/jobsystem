<template>
  <div class="register-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      size="medium"
      :hide-required-asterisk=true
    >
    <el-form-item label="身份">
      <el-switch v-model="role" active-text="求职者" inactive-text="招聘者"></el-switch>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm.realName"></el-input>
      </el-form-item>
      <el-form-item v-show="!role" label="公司代码" prop="companyName">
        <el-input v-model="ruleForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input :show-password=true type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="checkpassword">
        <el-input :show-password=true type="password" v-model="ruleForm.checkpassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button>
        <el-button @click="goLogin">已有账号？点此登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'SignupForm',
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return {
      ruleForm: {
          name: '123',
          realName: '李四',
          password: '123123',
          checkpassword: '123123',
          companyName: ''
      },
      role: true,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        realName:[
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        checkpassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司代码', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    goLogin(){
      this.$router.push('/login');
    },
    submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if(!valid){
          alert("表单错误")
          return false
        }
        const { data: res } = await this.$http.post("users/signup",{
          name: this.ruleForm.name,
          password: this.ruleForm.password,
          realName: this.ruleForm.realName,
          companyName: this.ruleForm.companyName,
          isStu: this.role ? 1 : 0
        })
        if(res.code == 0){
          this.$message.success("注册成功")
          this.$router.push("/login");
        }else {
          this.$message.error(res.data);
        }
      })
    }
  }
    
}
</script>
<style scoped>
.register-form{
  width: 500px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>