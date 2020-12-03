<template>
  <div class="resume-form">
    <div class="title">
      <h1>编辑简历</h1>
    </div>
    <el-form :model="dataForm" :rules="rules" ref="dataForm">
    <div class="name">
      <el-form-item prop="name">
        <el-input placeholder="姓名" v-model="dataForm.name" clearable></el-input>
      </el-form-item>
    </div>
    <div class="tele">
      <el-input placeholder="电话" v-model="dataForm.tele" clearable></el-input>
    </div>
    <div class="email">
      <el-input placeholder="电子邮件" v-model="dataForm.email" clearable></el-input>
    </div>
    <div class="sex">
      
      <el-form-item prop="sex">
        <el-radio class="man" v-model="dataForm.sex" label="1" border>男</el-radio>
        <el-radio class="woman" v-model="dataForm.sex" label="2" border>女</el-radio>
      </el-form-item>
      
    </div>
    <div class="birthday">
        <el-date-picker v-model="dataForm.birthday" type="date" placeholder="选择生日"></el-date-picker>
    </div>
    <div class="money">
      <el-select v-model="dataForm.salary" placeholder="选择预期薪资">
        <el-option v-for="item in options" :key="item.value" :label="item.salary" :value="item.salary"></el-option>
      </el-select>
    </div>
    <div class="job">
      <el-input placeholder="预期职位" v-model="dataForm.job" clearable></el-input>
    </div>
    <div class="city">
      <el-input placeholder="预期城市" v-model="dataForm.city" clearable></el-input>
    </div>
    <div class="education-experience">
    </div>
    <div class="xueli">
      <el-select v-model="dataForm.xueli" placeholder="最高学历">
        <el-option
          v-for="item in xuelis"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-show="dataForm.xueli>=1" class="exp-form exp-one">
      <div>
        <div class="exptit">{{ edubg.a }}阶段</div>
        <div>
          <el-input v-model="dataForm.eduinfo.a.name" placeholder="校名"></el-input>
        </div><br>
        <el-input
          v-model="dataForm.eduinfo.a.info"
          placeholder="校园经历"
          class="exp"
          type="textarea"
          :rows="4"
        ></el-input>
      </div>
    </div>
    <div v-show="dataForm.xueli>=2" class="exp-form exp-two">
      <div>
        <div class="exptit">{{ edubg.b }}阶段</div>
        <div>
          <el-input v-model="dataForm.eduinfo.b.name" placeholder="校名"></el-input>
        </div><br>
        <el-input
          v-model="dataForm.eduinfo.b.info"
          placeholder="校园经历"
          class="exp"
          type="textarea"
          :rows="4"
        ></el-input>
      </div>
    </div>
    <div v-show="dataForm.xueli===3" class="exp-form exp-three">
      <div>
        <div class="exptit">{{ edubg.c }}阶段</div>
        <div>
          <el-input v-model="dataForm.eduinfo.c.name" placeholder="校名"></el-input>
        </div><br>
        <el-input
          v-model="dataForm.eduinfo.c.info"
          placeholder="校园经历"
          class="exp"
          type="textarea"
          :rows="4"
        ></el-input>
      </div>
    </div>
    <div class="preview">
      <el-button class="previewbtn" type="primary" @click="previewForm()">预览</el-button>
    </div>
    <div class="save">
      <el-button class="savebtn" type="primary" @click="saveForm('dataForm')">保存</el-button>
    </div>
    <div class="download">
      <el-button class="downloadbtn" type="primary" @click="downloadForm()">下载</el-button>
    </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ResumeForm',
  data() {
    return {
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, message: '长度不小于2', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别'}
          ]
      },
      dataForm: {
        sex: '',
        name: '',
        birthday: '',
        tele: '',
        email: '',
        xueli: '',
        salary: '',
        job: '',
        city: '',
        eduinfo: {
        a:{
          name:'', info:''
        },
        b:{
          name:'', info:''
        },
        c:{
          name:'', info:''
        },
      },
      },
      
      edubg: { //本科 硕士 博士
        a: '本科',
        b: '硕士',
        c: '博士'
      },
      options: [
        {value: '1',salary: '面议'}, {value: '2',salary: '2k'}, 
        {value: '3',salary: '3k'}, {value: '4',salary: '4k'}, 
        {value: '5',salary: '5k'},{value: '6',salary: '6k'},
        {value: '7',salary: '7k'},{value: '8',salary: '8k'},
        {value: '9',salary: '9k'},{value: '10',salary: '10k'},
        {value: '11',salary: '11k'},{value: '12',salary: '12k'},
        {value: '13',salary: '13k'},{value: '14',salary: '14k'},
        {value: '15',salary: '15k'},{value: '16',salary: '16k'},
        {value: '17',salary: '17k'},{value: '18',salary: '18k'},
        {value: '19',salary: '19k'},{value: '20',salary: '20k'},
        {value: '21',salary: '21k+'}
      ],
      xuelis: [
        {value: 1, label: '本科'}, {value: 2, label: '硕士'},{value: 3, label: '博士'}
      ],
    }
  },
  
  methods: {
    saveForm(formName){
      this.$refs[formName].validate(async(valid) => {
        if(valid) {
          const { data: res } = await this.$http.post("api/saveResume", this.dataForm)
          console.log(res)
          if(res.saveResult.code === 0){
            this.$message.success("保存成功")
            this.$router.push("/");
          }
          
        }else{
          this.$message.error("保存失败")
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
h1{
  width: 160px;
}
.resume-form {
  
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.title {
  margin-left: 20px;
  margin-top: 20px;
  width: 160px;
  height: 60px;
  float: left;
}
.sex{
  height: 42px;
  width: 260px;
  position: absolute;
  left: 520px;
  top: 50px;
}
.man{
  width:95px;
  margin-right : 0;
}
.woman{
  width: 95px;
}
.name{
  width: 200px;
  position: absolute;
  left: 300px;
  top: 50px;
}
.tele{
  width: 200px;
  position: absolute;
  top: 120px;
  left: 300px;
}
.email{
  width: 200px;
  position: absolute;
  top: 120px;
  left: 550px;
}
.money{
  position: absolute;
  top: 190px;
  left: 300px;
  width: 200px;
}
.birthday{
  position: absolute;
  top: 190px;
  left: 550px;
  width: 200px;
}
.birthday div{
  width: 200px;
}
.job{
  position: absolute;
  top: 260px;
  left: 550px;
  width: 200px;
}
.city{
  position: absolute;
  top: 260px;
  left: 300px;
  width: 200px;
}
.exp-form {
  width: 450px;
}
.exp-one{
  position: absolute;
  top: 400px;
  left: 300px;
}
.exp-two{
  position: absolute;
  top: 570px;
  left: 300px;
}
.exp-three{
  position: absolute;
  top: 770px;
  left: 300px;
}
.xueli{
  position: absolute;
  top: 330px;
  left: 300px;
  width: 450px;
}
.exptit{
  font-size: 20px;
}
.save{
  position: absolute;
  
  top: 160px;
  right: 190px;
}
.savebtn{
  width: 200px;
}
.preview{
  position: absolute;
  top: 240px;
  right: 190px;
}
.previewbtn{
  width: 200px;
}
.download{
  position: absolute;
  top: 320px;
  right: 190px;
}
.downloadbtn{
  width: 200px;
}
</style>