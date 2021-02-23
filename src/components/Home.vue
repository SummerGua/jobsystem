<template>
  <div class="container">
    <div class="search">
      <el-input class="input-area" disabled :placeholder="placeholder[0]" prefix-icon="el-icon-search" v-model="search"></el-input>
      <div class="enter">确定</div>
    </div>
    <div class="title">
      <a>热门公司</a>
    </div>
    <div class="all-companies">
      <div @click="goCompany(item.cid)" class="one-company" v-for="item in coms" :key="item.cid">
        <div class="pic">
          <img :src="item.src">
        </div>
        <div class="one-right">
          <div class="com-name">{{item.companyName}}</div>
          <div class="info">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      search: '',
      placeholder: ['请输入你感兴趣的公司','请输入你感兴趣的职位'],
      coms:[]
    }
  },
  methods:{
    goCompany(x){
      this.$router.push({
        name: 'CompanyInfo',
        query: {
          cid: x
        }
      })
    }
  },
  beforeCreate(){
    this.$http.get("public/getComs").then(
      res=>{
        for(let i=0;i<res.data.data.length;i++){
          this.$set(this.coms,i,res.data.data[i])
        }
      }
    )
  },
  
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
.enter{
  width: 80px;
  line-height:40px;
  background-color: #e7e7e7;
}
/* .enter:hover{
  cursor: pointer;
} */
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
}
.one-company{
  height: 80px;
  width: 265px;
  padding: 20px 10px;
}
.one-company:hover{
  cursor: pointer;
  color: #409eff;
  background-color: #ebebeb;
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
  padding-top: 10px;
}
.info{
  overflow: hidden;
  margin-top: 10px;
  text-align: left;
  padding-left: 10px;
}
</style>