<template>
  <div class="container">
    <div class="top-menu">
      <div class="menu-title">
        <span>我的职位</span>
      </div>
    </div>
    <div class="info-box">
      <div class="left">
        <div class="index">
          <h3>目录</h3>
          <ul class="list">
            <li>已发布</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <el-table stripe border max-height="800" :data="jobData">
          <el-table-column prop="jobname" label="职位名称"></el-table-column>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="salary" label="薪水"></el-table-column>
          <el-table-column prop="diploma" label="学历要求"></el-table-column>
          <el-table-column prop="exp" label="经验要求"></el-table-column>
          <el-table-column prop="upTime" width="170" label="上传时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeJob(scope.$index)" type="text" size="small">删除</el-button>
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
      jobData: [],
    }
  },
  methods: {
    getJobData(){
      this.$http.get('/users/getJobs').then(
        data => {
          let datas = data.data.data
          for(let i=0;i<datas.length;i++){
            datas[i].upTime = datas[i].upTime.split('.')[0]
            datas[i].upTime = datas[i].upTime.replace(/T/,' ')
            this.$set(this.jobData,i,datas[i])
          }
          console.log(this.jobData)
        }
      )
    },
    removeJob(x){
      console.log(x)
      this.$confirm('您确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( () => {
        this.$http.post('/users/removeJob', {jid: this.jobData[x].jid}).then(
          res => {
            if(res.data.code == 0){
              this.getJobData()
              this.$message.success("成功删除")
            }else{
              this.$message.error("失败")
            }
          }
        )
      })
    }
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
    
  },
  mounted(){
    this.getJobData()
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
  height: 110px;
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
  color: #409eff;
}
</style>