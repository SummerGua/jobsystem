<template>
  <div class="box">
    <div v-for="(item, index) in form" :key="'No.'+index">
      <PreviewNew v-show="haveResume&&active==index" class="left" :options="options" :form="item"></PreviewNew>
      <div v-show="haveResume&&active==index" class="btn-area">
        <div class="quntity">简历数量{{ length }}</div>
        <a class="quntity">当前第{{ active+1 }}个</a>
        <el-button @click="previous" class="btn one" type="primary">上一个</el-button>
        <el-button @click="next" class="btn two" :disabled="length<=1 ? true : false" type="primary">下一个</el-button>
        <el-button @click="want(item.rid)" class="btn four" type="primary">留下</el-button>
        <el-button @click="drop(item.rid)" class="btn four" type="primary">丢弃</el-button>
      </div>
    </div>

    <div v-show="!haveResume">暂无简历</div>
  </div>
</template>
<script>
import PreviewNew from "../components/PreviewNew"

export default {
  components:{
    PreviewNew
  },
  data(){
    return{
      dis: true,
      haveResume: false,
      quntity: 10,
      length: 0,
      rid: 0,
      active: 0,
      options: [
        {value: '1', salary: '面议'}, {value: '2', salary: '小于3k'}, 
        {value: '3', salary: '3~5k'}, {value: '4', salary: '5~7k'}, 
        {value: '5', salary: '7~10k'}, {value: '6', salary: '10~15k'},
        {value: '7', salary:'15~20k'}, {value: '8', salary: '20k+'}
      ],
      form:[]
    }
  },
  methods:{
    next(){
      if(this.active < this.form.length-1){
        this.active += 1
      }else{
        this.$message.warning("后面没有啦")
      }
    },
    previous(){
      if(this.active > 0){
        this.active -= 1
      }else{
        this.$message.warning("前面没有啦")
      }
    },
    getReceivedResume(){
      this.$http.get('users/getReceivedResume').then(
      res => {
        const data = res.data.data
        this.length = res.data.length
        if(this.length==0) {
          this.haveResume = false
          return false
        }
        this.haveResume = true
        for(let i=0;i<data.length;i++){
          this.form.push({
            rid: data[i].rid,
            name: data[i].name,
            sex: data[i].sex,
            birthday: data[i].birthday.split('T')[0],
            diploma: data[i].diploma,
            tele: data[i].tele,
            email: data[i].email,
            city: data[i].city,
            salary: data[i].salary,
            realSex: ['女','男'],
            job: data[i].job,
            eduinfo: [],
            workExp: [],
            project: [],
            skill: data[i].skills,
            evaluation: data[i].evaluation
          })
          if(data[i].oneSchool){
            this.form[i].eduinfo.push({
              name: data[i].oneSchool,
              rank: data[i].oneRank,
              lasttime: data[i].oneTime,
              degree: data[i].oneDiploma,
              info: data[i].oneExp
            })
          }
          if(data[i].twoSchool){
            this.form[i].eduinfo.push({
              name: data[i].twoSchool,
              rank: data[i].twoRank,
              lasttime: data[i].twoTime,
              degree: data[i].twoDiploma,
              info: data[i].twoExp
            })
          }
          if(data[i].threeSchool){
            this.form[i].eduinfo.push({
              name: data[i].threeSchool,
              rank: data[i].threeRank,
              lasttime: data[i].threeTime,
              degree: data[i].threeDiploma,
              info: data[i].threeExp
            })
          }
          if(data[i].fourSchool){
            this.form[i].eduinfo.push({
              name: data[i].fourSchool,
              rank: data[i].fourRank,
              lasttime: data[i].fourTime,
              degree: data[i].fourDiploma,
              info: data[i].fourExp
            })
          }
          if(data[i].fiveSchool){
            this.form[i].eduinfo.push({
              name: data[i].fiveSchool,
              rank: data[i].fiveRank,
              lasttime: data[i].fiveTime,
              degree: data[i].fiveDiploma,
              info: data[i].fiveExp
            })
          }
          if(data[i].sixSchool){
            this.form[i].eduinfo.push({
              name: data[i].sixSchool,
              rank: data[i].sixRank,
              lasttime: data[i].sixTime,
              degree: data[i].sixDiploma,
              info: data[i].sixExp
            })
          }
          if(data[i].one_work_name){
            this.form[i].workExp.push({
              name: data[i].one_work_name,
              time: data[i].one_work_time,
              info: data[i].one_work_info,
            })
          }
          if(data[i].two_work_name){
            this.form[i].workExp.push({
              name: data[i].two_work_name,
              time: data[i].two_work_time,
              info: data[i].two_work_info,
            })
          }
          if(data[i].three_work_name){
            this.form[i].workExp.push({
              name: data[i].three_work_name,
              time: data[i].three_work_time,
              info: data[i].three_work_info,
            })
          }
          if(data[i].four_work_name){
            this.form[i].workExp.push({
              name: data[i].four_work_name,
              time: data[i].four_work_time,
              info: data[i].four_work_info,
            })
          }
          if(data[i].five_work_name){
            this.form[i].workExp.push({
              name: data[i].five_work_name,
              time: data[i].five_work_time,
              info: data[i].five_work_info,
            })
          }
          if(data[i].one_pro_name){
            this.form[i].project.push({
              company: data[i].one_pro_name,
              time: data[i].one_pro_time,
              info: data[i].one_pro_info
            })
          }
          if(data[i].two_pro_name){
            this.form[i].project.push({
              company: data[i].two_pro_name,
              time: data[i].two_pro_time,
              info: data[i].two_pro_info
            })
          }
          if(data[i].three_pro_name){
            this.form[i].project.push({
              company: data[i].three_pro_name,
              time: data[i].three_pro_time,
              info: data[i].three_pro_info
            })
          }
          if(data[i].four_pro_name){
            this.form[i].project.push({
              company: data[i].four_pro_name,
              time: data[i].four_pro_time,
              info: data[i].four_pro_info
            })
          }
          if(data[i].five_pro_name){
            this.form[i].project.push({
              company: data[i].five_pro_name,
              time: data[i].five_pro_time,
              info: data[i].five_pro_info
            })
          }
          if(data[i].six_pro_name){
            this.form[i].project.push({
              company: data[i].six_pro_name,
              time: data[i].six_pro_time,
              info: data[i].six_pro_info
            })
          }
          if(data[i].seven_pro_name){
            this.form[i].project.push({
              company: data[i].seven_pro_name,
              time: data[i].seven_pro_time,
              info: data[i].seven_pro_info
            })
          }
        }
      }).catch( err=> {throw err})
    },
    drop(rid){
      this.$http.post('users/dropResume',{rid: rid}).then(
        res => {
          const data = res.data
          if(data.code==0) {
            this.next()
            this.$message.success("成功丢弃")
            return true
          }
        }
      )
    },
    want(rid){
      this.$http.post('users/wantResume',{rid: rid}).then(
        res => {
          const data = res.data
          if(data.code==0) {
            this.next()
            this.$message.success("成功留下")
            return true
          }
        }
      )
    }
  },
  mounted(){
    this.getReceivedResume()
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
  
}
</script>
<style scoped>
.box{
  width: 980px;
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
  margin-top: 80px;
  width: 130px;
  float:right;
  display: flex;
  align-content: center;
  flex-direction: column;
}
.quntity{
  font-size: 16px;
}
</style>