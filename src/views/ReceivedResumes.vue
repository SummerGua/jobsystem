<template>
  <div class="box">
    <LeftResume class="left" :ResumeData="resumedata"></LeftResume>
    <Stars class="right" @star="getstar"></Stars>
    <div class="btn-area">
    <a class="quntity">剩余简历：{{ quntity }}</a>
    <el-button :disabled="dis" class="btn one" type="primary">上一个</el-button>
    <el-button class="btn two" type="primary">下一个</el-button>
    <el-button class="btn three" type="primary">留下</el-button>
    <el-button class="btn four" type="primary">丢弃</el-button>

    </div>
    

  </div>
</template>
<script>
import LeftResume from "../components/checkResumes/LeftResume"
import Stars from "../components/checkResumes/Stars"
import {getReceivedResumes} from "../plugins/request"
export default {
  components:{
    LeftResume,
    Stars
  },
  data(){
    return{
      dis: true,
      quntity: 10,
      stars: 0,
      resumedata: {}
    }
  },
  methods:{
    getstar(data){
      this.stars = data
    }
  },
  mounted(){
    getReceivedResumes().then(res=>{
      if(res.data) this.resumedata = res.data.data
    }
    ).catch(err=>console.log(err))
  }
  
}
</script>
<style scoped>
.box{
  width: 900px;
  height: 760px;
  margin: 0 auto;
}
.left{
  float: left;
}
.right{
  float: right;
  margin-top: 100px;
}
.btn{
  width: 130px;
  margin: 20px 0 0 0;
}
.btn-area{
  width: 130px;
  float:right;
}
.quntity{
  font-size: 14px;
}
</style>