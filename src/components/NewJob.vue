<template>
  <div class="container">
    <div v-if="ok" class="form-area">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="jobname">
          <el-input v-model="form.jobname" placeholder="岗位名称" clearable></el-input>
        </el-form-item>
        <el-form-item prop="city">
          <el-input v-model="form.city" placeholder="城市" clearable></el-input>
        </el-form-item>
        <el-form-item prop="diploma">
          <el-input v-model="form.diploma" placeholder="学历要求" clearable></el-input>
        </el-form-item>
        <el-form-item prop="exp">
          <el-input v-model="form.exp" placeholder="经验要求" clearable></el-input>
        </el-form-item>
        <el-form-item prop="salary">
          <el-input v-model="form.salary" placeholder="薪酬" clearable></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input v-model="form.description" placeholder="岗位职责" clearable></el-input>
        </el-form-item>
        <el-form-item prop="skills">
          <el-input v-model="form.skills" placeholder="技能要求" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn" type="primary" @click="submit('form')">提交</el-button>
    </div>
    <div v-else>
      <h2>请验证身份之后进行</h2>
      <el-input class="else-input" v-model="form.code" placeholder="请输入您的企业密钥"></el-input>
      <el-button @click="verify" class="else-btn" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ok: false,
      form: {
        code: '', //cid + code 相当于账号+密码，用于验证员工身份
        jobname: '工程师',
        city: '苏州',
        diploma: '本科',
        exp: '3年',
        salary: '3K',
        description: '负责xxx',
        skills: '熟练掌握CCCCCXXX'
      },
      rules: {
        jobname: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        city: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        diploma: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        exp: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        salary: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        description: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
        skills: [
          { required: true, message: '请填写', trigger: 'blur'},
          { min: 2, message: '长度不小于2', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submit(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$http.post('/users/newJob', this.form).then(
            data => {
              for(let key in this.form){
                this.form[key] = ''
              }
              this.$message.success("提交成功")
            }
          )
        }else{
          this.$message.warning("填写有误")
        }
      })
      
    },
    verify(){
      this.$http.post('/users/confirmComCode', {code: this.form.code}).then(
        data =>{
          if(data.data.code==0){
            this.ok = true
            this.$message.success("正确！")
          }else{
            this.$message.warning("错误T^T")
          }
          
        }
      )
    }
  },
  beforeCreate(){
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
  },
  beforeDestroy(){
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style scoped>
.container{
  width: 800px;
  padding: 10px;
  margin: 0 auto;
  background-color: white;
}
.else-btn{
  width: 120px;
}
.else-input{
  width: 200px;
  margin: 0 10px;
}
</style>