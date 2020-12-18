<template>
  <div class="container">
  <div class="resume-form">
    <div class="top-menu">
      <div @click="dialogFormVisible = true" class="menu-name"><span>{{dataForm.menuName}}</span><i class="el-icon-edit edit-icon"></i></div>
      <el-dialog title="修改简历名称" :visible.sync="dialogFormVisible">

    
      <el-input v-model="dataForm.menuName" auto-complete="off"></el-input>


  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
      <div class="three-function">
        <div>
      <el-button class="btn" type="primary" @click="previewForm()">预览</el-button>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="saveForm('dataForm')">保存</el-button>
    </div>
    <div>
      <el-button class="btn" type="primary" @click="downloadForm()">下载</el-button>
    </div>
      </div>
    </div>
    <div class="form-box">
      <div class="index">
        <h3>简历目录</h3>
        <ul class="list">
          <li>个人信息</li>
          <li>工作经历</li>
          <li>教育经历</li>
          <li>自我评价</li>
        </ul>

      </div>
      <div class="resume-box">
    <el-form class="form-area" :model="dataForm" :rules="rules" ref="dataForm">
      <h3 class="title">编辑个人信息</h3>
      <div class="first-line">
        <div class="name ">
          <el-form-item prop="name">
            <el-input placeholder="姓名" v-model="dataForm.name" clearable></el-input>
          </el-form-item>
        </div>
        <div class="tele ">
          <el-input placeholder="电话" v-model="dataForm.tele" clearable></el-input>
        </div>
        <div class="email ">
          <el-input placeholder="电子邮件" v-model="dataForm.email" clearable></el-input>
        </div>
      </div>
      <div class="first-line">
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
      </div>
    <div class="first-line">
      <div class="job">
      <el-input placeholder="预期职位" v-model="dataForm.job" clearable></el-input>
    </div>
    <div class="city">
      <el-input placeholder="预期城市" v-model="dataForm.city" clearable></el-input>
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
    </div>
    
    <div class="self-value">
      <el-input type="textarea" v-model="dataForm.selfValue" placeholder="自我评价">

      </el-input>
    </div>
    
    <div v-show="dataForm.xueli>=1" class="exp-form exp-one">
      <div>
        <div class="exptit">{{ edubg.a }}阶段</div>
        <div class="school-name">
          <el-input v-model="dataForm.eduinfo.a.name" placeholder="校名"></el-input>
        </div>
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
        <div class="school-name">
          <el-input v-model="dataForm.eduinfo.b.name" placeholder="校名"></el-input>
        </div>
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
        <div class="school-name">
          <el-input v-model="dataForm.eduinfo.c.name" placeholder="校名"></el-input>
        </div>
        <el-input
          v-model="dataForm.eduinfo.c.info"
          placeholder="校园经历"
          class="exp"
          type="textarea"
          :rows="4"
        ></el-input>
      </div>
    </div>
    
    </el-form>
</div>
    </div>
    </div>
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
      dialogFormVisible: false,
      dataForm: {
        menuName: '请重命名简历',
        sex: '',
        selfValue: '',
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
    },
  },
  beforeCreate () {
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
  },
  beforeDestroy () {
	// 销毁背景色
    document.querySelector('body').removeAttribute('style')
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;

}
.exptit{
  float: left;
  margin-bottom: 10px;
}
.exp-form{
  margin: 0 10px 0 10px;
}
.school-name{
  margin-bottom: 10px;
  width: 220px;
}
.sex{
  width: 220px;
}
.top-menu{
  width: 1228px;
  height: 62px;
  margin: 20px auto 0 auto;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
}
.three-function{
  display: flex;
  justify-content: space-around;
  margin: auto 10px auto 0;
  width: 400px;
}
.menu-name{
  margin: auto 0 auto 30px;
}
.menu-name:hover{
  cursor: pointer;
  color: cornflowerblue;
}
.resume-form {
  width: 100%;
  position: absolute;
}
.form-box{
  margin: 20px auto 0 auto;
  width: 1228px;
  max-height: 1200px;
  display: -webkit-inline-box;
}
.man{
  width: 100px;
  margin-right: 10px;
}
.woman{
  width: 100px;
  margin-right: 0;
}
.index{
 background-color: white;
  width: 182px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 12px -10px;
  padding: 0;
  margin: 0;
  height: 250px;
}
.index h3{
  font-size: 18px;
  font-weight: 500;
  width: 182px;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid rgb(227, 231, 237);
}
.list{
  padding: 0;
}
.btn{
  width:100px
}
.list li{
  height: 38px;
}
.list li:hover{
  color: #409eff;
  cursor: pointer;
}
.title{
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0 16px;
}
.form-area{
  margin-top: 20px;
  width: 720px;
  background-color: white;
  display: inline;
}
.resume-box{
  width: 720px;
  margin-left: 16px;
  background-color: white;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.ok-width{
  width: 200px;
}
.first-line{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
}
.self-value{
  width: 700px;
  margin-left: 10px;
  margin-top: 20px;
   margin-bottom: 10px;
}
</style>