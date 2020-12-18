<template>
  <div class="container">
    <div class="search">
      <div @click="changeIsCom()" class="choose">
        <div class="to-com" :class="[isCom?'active':'noactive']">职位</div>
        <div class="to-job" :class="[!isCom?'active':'noactive']">公司</div>
      </div>
      <el-input class="input-area" :placeholder="placeholder[0]" prefix-icon="el-icon-search" v-model="search"></el-input>
      <div class="enter">确定</div>
    </div>
    <div class="title">
      <a v-show="isCom">热门公司</a>
      <a v-show="!isCom">热门职位</a>
    </div>
    <div class="all-companies">
      <div class="one-company" v-for="item in coms" :key="item.id">
        <div class="pic">
          <img :src="item.src">
        </div>
        <div class="one-right">
          <div class="com-name">{{item.name}}</div>
          <div class="info">{{item.info}}</div>
        </div>
      </div>
    <div class="page">
      <el-pagination layout="prev, pager, next"
      :page-size=12
      :total=12>
      </el-pagination>  
    </div>
    </div>
    
    <!-- <div class="jobs">
      <div class="job-box" v-for="item in jobs" :key="item.id">

      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      search: '',
      isCom: true,
      placeholder: ['请输入你感兴趣的公司','请输入你感兴趣的职位'],
      coms:[]
    }
  },
  methods:{
    changeIsCom(){
      this.isCom = !this.isCom
      let tmp = this.placeholder[0]
      this.placeholder[0] = this.placeholder[1]
      this.placeholder[1] = tmp
    }
  },
  beforeCreate(){
    this.$http.get("api/getComs").then(
        res=>{
          console.log(res.data.data[0])
          for(let i=0;i<res.data.data.length;i++)
            this.$set(this.coms,i,res.data.data[i])
          }
        )
  },
  mounted(){
    console.log('coms[1]',this.coms[1])
  } 
}
</script>
<style scoped>
.page{
  margin: 0 auto;
}
.search{
  display: flex;
  font-size: 14px;
  margin: 0 auto;
}
.choose{
  display: flex;
  line-height: 40px;
  border: #409eff 1px solid;
  border-radius: 3px;
}
.choose:hover{
  cursor: pointer;
}
.enter{
  width: 80px;
  line-height:40px;
  background-color: #e7e7e7;
}
.enter:hover{
  cursor: pointer;
}
.input-area input{
  border-radius: 0;
}
.choose div{
  float: left;
  width: 42px;
  border-radius: 3px;
}
.active{
  background-color: #409eff;
  color: white;
}
.noactive{
  background-color: white;
  color: #409eff;
}
.container{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 20px;
}
.title{
  margin-top: 20px;
  color: black;
  font-size: 20px;
  font-weight: 700;
}
.all-companies{
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  margin: 16px auto 0 auto;
  overflow: hidden;
}
.one-company{
  height: 80px;
  width: 265px;
  padding: 20px 10px;
}
.one-company:hover{
  cursor: pointer;
  color: #409eff;
}
.one-company div{
  display: block;
}
.pic{
  float: left;
  width: 80px;
  height: 80px;
}
.com-name{
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding-left: 10px;
}
.one-right{
  width: 185px;
  overflow: hidden;
  height: 100%;
}
.info{
  overflow: hidden;
  margin-top: 10px;
  text-align: left;
  padding-left: 10px;
}
</style>