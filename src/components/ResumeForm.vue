<template>
  <div class="container">
    <div v-show="!pre" class="resume-form">
      <div class="top-menu"> 
        <div @click="dialogFormVisible = true" class="menu-name">
          <span>创建于 {{time.toLocaleString()}}</span>
        </div>
        <div class="three-function">
          <div>
            <el-button class="btn" type="primary" @click="preview()">预览</el-button>
          </div>
          <div>
            <el-button class="btn" type="primary" @click="saveForm('dataForm')">保存</el-button>
          </div>
          <div>
            <el-button class="btn" type="primary" @click="downloadForm()" disabled>下载</el-button>
          </div>
        </div>
      </div>
      <div class="form-box">
        <div class="index">
          <h3>简历目录</h3>
          <ul class="list">
            <li>个人信息</li>
            <li>自我评价</li>
            <li>教育经历</li>
            <li>工作经历</li>
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
          <div class="tele">
            <el-form-item prop="tele">
              <el-input placeholder="电话" v-model="dataForm.tele" clearable></el-input>
            </el-form-item>
          </div>
          <div class="email ">
            <el-form-item prop="email">
              <el-input placeholder="电子邮件" v-model="dataForm.email" clearable></el-input>
            </el-form-item>
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
          <el-form-item prop="birthday">
            <el-date-picker  value-format="yyyy-MM-dd" v-model="dataForm.birthday" type="date" placeholder="选择生日"></el-date-picker>
          </el-form-item>
      </div>
      <div class="money">
        <el-select v-model="dataForm.salary" placeholder="选择预期薪资">
          <el-option v-for="item in options" :key="item.value" :label="item.salary" :value="item.value"></el-option>
        </el-select>
      </div>
        </div>
      <div class="ab-job">
        <div class="job">
          <el-form-item prop="job">
            <el-input placeholder="预期职位" v-model="dataForm.job" clearable></el-input>
          </el-form-item>
      </div>
      <div class="city">
        <el-form-item prop="city">
          <el-input placeholder="预期城市" v-model="dataForm.city" clearable></el-input>
        </el-form-item>
      </div>
      <div class="city">
        <el-form-item prop="diploma">
          <el-input placeholder="最高学历(本科/硕士/博士)" v-model="dataForm.diploma" clearable></el-input>
        </el-form-item>
      </div>
      </div>
      
      <div class="self-value">
        <el-input type="textarea" v-model="dataForm.evaluation" placeholder="自我评价">
        </el-input>
      </div>
      <div class="self-value">
        <el-input type="textarea" v-model="dataForm.skill" placeholder="个人技能、证书等">
        </el-input>
      </div>
      <div v-for="(item,index) in dataForm.project" :key="index" class="self-value ">
        <div v-if="index==0" class="need-border-top"></div>
        <div v-if="index==0" class="exptit">项目经历</div>
        <el-input class="pro-tit" v-model="item.name" placeholder="项目名称"></el-input>
        <el-input class="pro-tit" v-model="item.time" placeholder="时间(如2020.1-2020.6)"></el-input>
        <el-input type="textarea" v-model="item.info" placeholder="项目详情">
        </el-input>
      </div>
      <i @click="addPro" class="plus el-icon-circle-plus"><a class="plus">添加项目经历</a></i>
      <i v-show="dataForm.project.length>0" @click="removePro" class="plus el-icon-circle-close">移除项目</i>
      <div v-for="(item,index) in dataForm.workExp" :key="index+'we'" class="self-value">
        <div v-if="index==0" class="need-border-top"></div>
        <div v-if="index==0" class="exptit">工作经历</div>
        <el-input class="pro-tit" v-model="item.company" placeholder="单位名称"></el-input>
        <el-input class="pro-tit" v-model="item.time" placeholder="时间(如2020.1-2020.6)"></el-input>
        <el-input type="textarea" v-model="item.info" placeholder="工作经历">
        </el-input>
      </div>
      <i @click="addWork" class="plus el-icon-circle-plus"><a class="plus">添加工作经历</a></i>
      <i v-show="dataForm.workExp.length>0" @click="removeWork" class="plus el-icon-circle-close">移除工作</i>
      <div class="exp-form exp-one need-border-top">
        <div v-for="(item, index) in dataForm.eduinfo" :key="index+'ei'">
          <div v-if="index==0" class="exptit">教育经历</div>
          <div class="school-name">
            <el-input class="school-item" v-model="item.name" placeholder="校名"></el-input>
            <el-input class="school-item" v-model="item.major" placeholder="专业"></el-input>
            <el-input class="school-item" v-model="item.rank" placeholder="排名或绩点"></el-input>
            <el-input class="school-item-over" v-model="item.lasttime" placeholder="入学和毕业时间(如2020.9-2024.7)"></el-input>
            <el-input class="school-item-over" v-model="item.degree" placeholder="所属学历(本科/硕士/博士)"></el-input>
            
          </div>
          <el-input v-model="item.info" placeholder="校园经历" class="exp" type="textarea" :rows="4"></el-input>
        </div>
        <i @click="addEdu" class="plus el-icon-circle-plus"><a class="plus">添加更多教育经历</a></i>
        <i v-show="dataForm.eduinfo.length>1" @click="removeEdu" class="plus el-icon-circle-close">移除</i>
      </div>
      
      </el-form>
  </div>
      </div>
    </div>
    <Preview v-on:close="preview()" :options="options" :form="dataForm" v-show="pre" />
  </div>
  
</template>
<script>
import Preview from './Preview.vue'
export default {
  name: 'ResumeForm',
  components: { Preview },
  data() {
    return {
      pre: false,
      time:new Date(),
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, message: '长度不小于2', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别'}
          ],
          tele: [
            { required: true, message: '请输入电话号码', trigger: 'blur'},
            { min: 11, max:11, message: '请输入11位电话号码', trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur'},
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'blur'}
          ],
          job: [
            { required: true, message: '请输入职位', trigger: 'blur'}
          ],
          city:[
            { required: true, message: '请输入城市', trigger: 'blur'}
          ],
          diploma:[
            { required: true, message: '请输入文凭', trigger: 'blur'}
          ]
      },
      dialogFormVisible: false,
      dataForm: {
        job: '',
        sex: '',
        realSex: ['女','男'],
        email: '',
        tele: '',
        skills: '',
        diploma: '',
        project: [
          //{time:'', info:'', name:''}
        ],
        name: '',
        birthday: '',
        salary: '',
        city: '',
        edu: '',
        evaluation: '',
        eduinfo: [
          { name:'', major: '', rank: '', info:'', lasttime: '', degree: '' },
        ]
        ,
        workExp: [
          // {company:'', info:'', time:''}
        ]
      },
      //薪资
      options: [
        {value: '1', salary: '面议'}, {value: '2', salary: '小于3k'}, 
        {value: '3', salary: '3~5k'}, {value: '4', salary: '5~7k'}, 
        {value: '5', salary: '7~10k'}, {value: '6', salary: '10~15k'},
        {value: '7', salary:'15~20k'}, {value: '8', salary: '20k+'}
      ]
    }
  },
  
  methods: {
    preview(){
      this.pre=!this.pre
    },
    saveForm(formName){
      let eduinfos = this.dataForm.eduinfo[0]
      if(eduinfos.name==''||eduinfos.major==''||eduinfos.rank==''||eduinfos.info==''||eduinfos.lasttime=='') {
        this.$message.error("第一段教育信息请填写完整")
      }else{
        this.$refs[formName].validate(async(valid) => {
          if(valid) {
            const { data: res } = await this.$http.post("users/saveResume", this.dataForm)
            if(res.code === 0){
              this.$message.success("保存成功")
              this.$router.push("myresumes");
            }
          }else{
            this.$message.error("保存失败")
            return false
          }
        })
      }
    },
    addWork(){
      let exp = this.dataForm.workExp
      if(exp.length>=5){
        this.$message.error("无法添加五个以上工作经历")
      }else{
        exp.push({
          company:'', info: '', time: ''
        })
      }
    },
    removeWork(){
      let exp = this.dataForm.workExp
      if(exp[exp.length-1].info.length>0){
        this.$message.error("信息不为空，请先删除")
      }else{
        exp.pop()
      } 
    },
    addPro(){
      let pro = this.dataForm.project
      if(pro.length>=7){
        this.$message.error("无法添加七个以上项目经历")
      }else{
        pro.push({
          name: '', info: '', time: ''
        })
      }
    },
    removePro(){
      let pro = this.dataForm.project
      if(pro[pro.length-1].info.length>0){
        this.$message.error("信息不为空，请先清空")
      }else{
        pro.pop()
      }
    },
    addEdu(){
      let edu = this.dataForm.eduinfo
      if(edu.length>=6){
        this.$message.error("无法添加六个以上教育经历")
      }else{
        edu.push({
          name:'', major: '',rank: '', info:'', lasttime: ''
        })
      }
    },
    removeEdu(){
      let edu = this.dataForm.eduinfo
      if(edu.length==1) this.$message.error("至少拥有一段教育经历")
      else if(edu[edu.length-1].info.length>0){
        this.$message.error("信息不为空，请先清空")
      }else{
        edu.pop()
      }
    }
  },
  beforeCreate () {
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
    // if(this.$route.query.rid){
    //   let rid = this.$route.query.rid
    //   this.$http.post("users/getEditResume",{rid: rid}).then(
    //     data => {
    //       console.log(data.data)
    //     }
    //   )
    // }
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
.clear{
  clear: both;
}
.exptit{
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}
.exp{
  width: 98%;
  margin-bottom: 10px;
}
.exp-form{
  margin: 0 10px 0 10px;
}
.school-name{
  border-top: 1px silver solid;
  padding: 10px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.pro-tit{
  margin-bottom: 6px;
}
.sex{
  width: 220px;
}
.school-item{
  margin-right: 8px;
  width: 30%;
}
.need-border-top{
  border-top: 2px black solid;
  margin-top: 10px;
  padding-top: 6px;
}
.school-item-over{
  width: 36%;
  margin: 10px 0px
}
.plus{
  font-size: 20px;
  margin-right: 10px;
}
.plus:hover{
  cursor: pointer;
  color: #78a2d8;
}
.ab-job{
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  justify-content: left;
}
.job{
  margin-left: 10px;
}
.city{
  margin-left: 14px;
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
  max-height: 12000px;
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
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
}
.self-value{
  width: 700px;
  margin-left: 10px;
  margin-top: 10px;
   margin-bottom: 10px;
}
</style>