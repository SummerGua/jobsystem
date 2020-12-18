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
            <li>已投简历</li>
            <li>已存简历</li>
          </ul>
        </div>
        
      </div>
      <div class="right">
        <el-table stripe border max-height="800" :data="resumeData">
          <el-table-column prop="coname" label="公司"></el-table-column>
          <el-table-column prop="jobname" label="岗位"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="progress" label="进度"></el-table-column>
          <el-table-column prop="time" label="提交时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <el-button type="text" size="small">查看</el-button>
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
      resumeData:[]
    }
  },
  methods:{
    toUpload(){
      this.$router.push('/upload')
    }
  },
  beforeCreate () {
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
    this.$http.get("api/getShortResume").then(
      res=>{
        for(let i=0;i<res.data.data.length;i++){
          this.$set(this.resumeData,i,res.data.data[i])
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