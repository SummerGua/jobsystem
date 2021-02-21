<template>
  <div class="container">
    <div class="top-menu">
      <div class="menu-title">
        <span>已处理简历</span>
      </div>
    </div>
    <div class="info-box">
      <div class="left">
        <div class="index">
          <h3>简历目录</h3>
          <ul class="list">
            <li :class="{color: !rubbish}" @click="goWant">留下的简历</li>
            <li :class="{color: rubbish}" @click="goRubbish">丢弃的简历</li>
          </ul>
        </div>
      </div>
      <div class="right" v-show="!rubbish">
        <el-table :default-sort = "{prop: 'upTime', order: 'descending'}" stripe border max-height="800" :data="wantData">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="oneSchool" label="本科学校"></el-table-column>
          <el-table-column prop="job" label="岗位"></el-table-column>
          <el-table-column prop="type" label="类型" width="80"></el-table-column>
          <el-table-column sortable prop="upTime" width="160" label="提交时间"></el-table-column>
          <el-table-column prop="email" width="200" label="联系方式"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="seeResume(scope.$index)" type="text" size="small">查看</el-button>
              <el-button v-clipboard:copy="wantData[scope.$index].email" type="text" size="small" v-clipboard:success="onCopy">复制email</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right" v-show="rubbish">
        <el-table :default-sort = "{prop: 'upTime', order: 'descending'}" stripe border max-height="800" :data="rubbishData">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="oneSchool" label="本科学校"></el-table-column>
          <el-table-column prop="job" label="岗位"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column sortable prop="upTime" width="160" label="提交时间"></el-table-column>
          <el-table-column prop="email" width="200" label="联系方式"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="seeRubbishResume(scope.$index)" type="text" size="small">查看</el-button>
              <el-button v-clipboard:copy="wantData[scope.$index].email" type="text" size="small" v-clipboard:success="onCopy">复制email</el-button>
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
      rubbish: false,
      rubbishData: [],
      wantData: [],
    }
  },
  methods: {
    getProcessedResumes: function(){
      this.$http.get('/users/getProcessedResumes').then(
        res => {
          for(let i=0;i<res.data.data.length;i++){
          res.data.data[i].upTime = res.data.data[i].upTime.split('.')[0]
          res.data.data[i].upTime = res.data.data[i].upTime.replace(/T/,' ')
          if(res.data.data[i].type==0) res.data.data[i].type='实习'
          if(res.data.data[i].type==1) res.data.data[i].type='校招'
          if(res.data.data[i].type==2) res.data.data[i].type='社招'
          if(res.data.data[i].progress==2){
            this.wantData.push(res.data.data[i])
          }
          if(res.data.data[i].progress==1){
            this.rubbishData.push(res.data.data[i])
          }
          
        }
        }
      )
    },
    goWant(){
      this.rubbish = false
    },
    goRubbish(){
      this.rubbish = true
    },
    onCopy: function (e) {
      this.$message.success(e.text+" 已复制到剪贴板")
    },
    seeResume(x){
      this.$router.push({
        name: 'Preview',
        params: {
          rid: this.wantData[x].rid
        }
      })
    },
    seeRubbishResume(x){
      this.$router.push({
        name: 'Preview',
        params: {
          rid: this.rubbishData[x].rid
        }
      })
    },
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
  },
  mounted(){
    this.getProcessedResumes()
  },
  beforeDestroy() {
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
.menu-title{
  height: 100%;
  margin-left: 50px;
}
.menu-title span{
  line-height: 62px;
  font-size: 20px;
  font-weight: 600;
}
.info-box{
  margin: 20px auto 0 auto;
  width: 1228px;
  max-height: 1200px;
  display: -webkit-inline-box;
}
.right{
  width: 1026px;
  margin-left: 20px;
  background-color: white;
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
.color{
  color: #409eff;
}
.list li:hover{
  color: #409eff;
  cursor: pointer;
}
</style>