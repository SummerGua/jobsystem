<template>
  <div class="container">
    <div class="top-menu">
      <div class="menu-title">
        <span>我的简历</span>
      </div>
      <div class="function">
        <el-button type="primary" @click="toUpload">新建简历</el-button>
      </div>
    </div>
    <div class="info-box">
      <div class="left">
        <div class="index">
          <h3>简历目录</h3>
          <ul class="list">
            <li @click="goNoSaved">已投简历</li>
            <li @click="goSaved">已存简历</li>
          </ul>
        </div>
      </div>
      <div class="right" v-show="!isSavedData">
        <el-table stripe border max-height="800" :data="sendedResumeData">
          <el-table-column prop="companyName" label="公司"></el-table-column>
          <el-table-column prop="job" label="岗位"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="progress" label="进度"></el-table-column>
          <el-table-column prop="upTime" label="提交时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope"> 
              <el-button @click="seeResume(scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right" v-show="isSavedData">
        <el-table stripe border max-height="800" :data="resumeData">
          <el-table-column prop="job" label="岗位"></el-table-column>
          <el-table-column prop="upTime" label="提交时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="seeSavedResume(scope.$index)" type="text" size="small">查看</el-button>
              <el-button disabled @click="edit" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data(){
    return{
      resumeData:[],
      sendedResumeData: [],
      isSavedData: false,
    }
  },
  methods:{
    toUpload(){
      this.$router.push('/upload')
    },
    goNoSaved(){
      this.isSavedData = false
    },
    goSaved(){
      this.isSavedData = true
    },
    seeResume(x){
      this.$router.push({
        name: 'Preview',
        query: {
          rid: this.sendedResumeData[x].rid
        }
      })
    },
    seeSavedResume(x){
      this.$router.push({
        name: 'Preview',
        query: {
          rid: this.resumeData[x].rid
        }
      })
    },
    edit(){
      console.log('edit btn')
    }
  },
  beforeCreate () {
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
    this.$http.get("users/getShortResume").then(
      res=>{
        for(let i=0;i<res.data.data.length;i++){
          res.data.data[i].upTime = res.data.data[i].upTime.split('.')[0]
          res.data.data[i].upTime = res.data.data[i].upTime.replace(/T/,' ')
          if(res.data.data[i].type==0) res.data.data[i].type='实习'
          if(res.data.data[i].type==1) res.data.data[i].type='校招'
          if(res.data.data[i].type==2) res.data.data[i].type='社招'
          if(res.data.data[i].progress==0) res.data.data[i].progress='未查看'
          if(res.data.data[i].progress==1) res.data.data[i].progress='已接收'
          if(res.data.data[i].progress==2) res.data.data[i].progress='已拒绝'
          if(res.data.data[i].sended==0){
            this.resumeData.push(res.data.data[i])
          }
          if(res.data.data[i].sended==1){
            this.sendedResumeData.push(res.data.data[i])
          }
        }
      }
    )
  },
  beforeDestroy () {
	// 销毁背景色
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style scoped>
.container{
  height: 100%;
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
.info-box{
  margin: 20px auto 0 auto;
  width: 1228px;
  max-height: 1200px;
  display: -webkit-inline-box;
}
.menu-title{
  height: 100%;
  margin-left: 50px;
}
.menu-title span{
  line-height: 62px;
  font-size: 20px;
  font-weight: 600;
}
.function{
  margin: auto 40px auto 0;
}

.index{
 background-color: white;
  width: 182px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 12px -10px;
  padding: 0;
  margin: 0;
  height: 150px;
}
.index h3{
  font-size: 18px;
  font-weight: 500;
  width: 182px;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid rgb(227, 231, 237);
  margin: 0;
}
.list{
  padding: 0;
}
.list li{
  height: 38px;
}
.list li:hover{
  color: #409eff;
  cursor: pointer;
}
.right{
  width: 1026px;
  margin-left: 20px;
  background-color: white;
}
</style>