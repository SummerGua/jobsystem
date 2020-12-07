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
      placeholder: ['请输入你感兴趣的公司','请输入你感兴趣的职位']
    }
  },
  methods:{
    changeIsCom(){
      this.isCom = !this.isCom
      let tmp = this.placeholder[0]
      this.placeholder[0] = this.placeholder[1]
      this.placeholder[1] = tmp
    }
  }
}
</script>
<style scoped>
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
}

</style>