<template>
<div>
  上传头像(选中之后自动更改)： 
  <input class="file" name="file" type="file" accept="image/jpg" @change="update($event)"/>
  <div class="input-area">
    <a @click="changeN">{{changeName ? '取消修改用户名':'点我修改用户名'}}</a><br>
    <a @click="changeP">{{changePassword ? '取消修改密码' : '点我修改密码'}}</a>
    <el-input v-show="changeName" v-model="username" placeholder="新的用户名"></el-input>
    <el-input style="margin: 10px 0" v-show="changePassword" v-model="oldpassword" placeholder="原有密码"></el-input>
    <el-input v-show="changePassword" v-model="newpassword" placeholder="新密码"></el-input>
    <el-input v-show="changePassword" v-model="confirmPwd" placeholder="再次输入新密码"></el-input>
  </div>
  
  <el-button v-show="changeName || changePassword" style="margin: 10px 0" type="primary" @click="submit">确定更改</el-button>
</div>
  
</template>


<script>
  export default {
    data() {
      return {
        username: '',
        oldpassword: '',
        newpassword: '',
        confirmPwd: '',
        changeName: false,
        changePassword: false
      };
    },
    methods: {
      changeN() {
        this.changeName = !this.changeName
        this.username = ''
      },
      changeP() {
        this.changePassword = !this.changePassword
        this.oldpassword = ''
        this.newpassword = ''
        this.confirmPwd = ''
      },
      submit() {
        if(this.changeName) {
          this.$http.post('/users/changeName', { name: this.username }).then(
            res => {
              this.$message.success('修改用户名成功')
            }
          )
        }
        if(this.changePassword) {
          if(this.confirmPwd !== this.newpassword) {
            this.$message.warning('两次密码输入不一致')
            return false
          }
          if(this.oldpassword === this.newpassword) {
            this.$message.warning('新旧密码无变化')
            return false
          }
          this.$http.post('/users/changePassword', { oldPwd: this.oldpassword, newPwd: this.newpassword }).then(
            res => {
              let { code, data } = res.data
              code === 0 ? this.$message.success('修改密码成功') : this.$message.warning(data)
              this.changePassword = false
            }
          )
        }
      },
      update(e) {
        let file = e.target.files[0];           
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据  
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$http.post('/users/uploadPic', param, config).then(
          res => {
            if(res.data.code === 0) this.$message.success('成功')
          }
        )
      }
    }
  }
</script>

<style>
.input-area {
  width: 200px;
  margin: 0 auto;
}
a {
  text-decoration: underline;
}
</style>