<template>
  <div class="content">
    <el-button class="btn" type="primary" @click="back">返回</el-button>
    <PreviewNew class="white" :options="options" :form="form"></PreviewNew>
  </div>
</template>
<script>
import PreviewNew from '../components/PreviewNew'

export default {
  data(){
    return{
      rid: '',
      options: [
        {value: '1', salary: '面议'}, {value: '2', salary: '小于3k'}, 
        {value: '3', salary: '3~5k'}, {value: '4', salary: '5~7k'}, 
        {value: '5', salary: '7~10k'}, {value: '6', salary: '10~15k'},
        {value: '7', salary:'15~20k'}, {value: '8', salary: '20k+'}
      ],
      form:{
        name: '',
        sex: '',
        birthday: '',
        diploma: '',
        tele: '',
        email: '',
        city: '',
        salary: '',
        realSex: ['女','男'],
        eduinfo: [],
        workExp: [],
        project: [],
        skill: '',
        evaluation: ''
      }
    }
  },
  components:{
    PreviewNew
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  created(){
    this.rid = this.$route.query.rid
    this.$http.get('users/getFullResume?rid='+this.rid).then(
      res => {
        const data = res.data.data[0]
        this.form.name = data.name
        this.form.sex = data.sex
        this.form.birthday = data.birthday.split('T')[0]
        this.form.email = data.email
        this.form.tele = data.tele
        const diploma = ['本科','硕士','博士']
        this.form.diploma = diploma[data.edu]
        this.form.city = data.city
        this.form.job = data.job
        this.form.salary = data.salary
        this.form.skill = data.skills
        this.form.evaluation = data.evaluation
        if(data.oneSchool){
          this.form.eduinfo.push({
            name: data.oneSchool,
            rank: data.oneRank,
            lasttime: data.oneTime,
            degree: data.oneDiploma,
            info: data.oneExp
          })
        }
        if(data.twoSchool){
          this.form.eduinfo.push({
            name: data.twoSchool,
            rank: data.twoRank,
            lasttime: data.twoTime,
            degree: data.twoDiploma,
            info: data.twoExp
          })
        }
        if(data.threeSchool){
          this.form.eduinfo.push({
            name: data.threeSchool,
            rank: data.threeRank,
            lasttime: data.threeTime,
            degree: data.threeDiploma,
            info: data.threeExp
          })
        }
        if(data.fourSchool){
          this.form.eduinfo.push({
            name: data.fourSchool,
            rank: data.fourRank,
            lasttime: data.fourTime,
            degree: data.fourDiploma,
            info: data.fourExp
          })
        }
        if(data.fiveSchool){
          this.form.eduinfo.push({
            name: data.fiveSchool,
            rank: data.fiveRank,
            lasttime: data.fiveTime,
            degree: data.fiveDiploma,
            info: data.fiveExp
          })
        }
        if(data.sixSchool){
          this.form.eduinfo.push({
            name: data.sixSchool,
            rank: data.sixRank,
            lasttime: data.sixTime,
            degree: data.sixDiploma,
            info: data.sixExp
          })
        }
        if(data.one_work_name){
          this.form.workExp.push({
            name: data.one_work_name,
            time: data.one_work_time,
            info: data.one_work_info,
          })
        }
        if(data.two_work_name){
          this.form.workExp.push({
            name: data.two_work_name,
            time: data.two_work_time,
            info: data.two_work_info,
          })
        }
        if(data.three_work_name){
          this.form.workExp.push({
            name: data.three_work_name,
            time: data.three_work_time,
            info: data.three_work_info,
          })
        }
        if(data.four_work_name){
          this.form.workExp.push({
            name: data.four_work_name,
            time: data.four_work_time,
            info: data.four_work_info,
          })
        }
        if(data.five_work_name){
          this.form.workExp.push({
            name: data.five_work_name,
            time: data.five_work_time,
            info: data.five_work_info,
          })
        }
        if(data.one_pro_name){
          this.form.project.push({
            name: data.one_pro_name,
            time: data.one_pro_time,
            info: data.one_pro_info
          })
        }
        if(data.two_pro_name){
          this.form.project.push({
            name: data.two_pro_name,
            time: data.two_pro_time,
            info: data.two_pro_info
          })
        }
        if(data.three_pro_name){
          this.form.project.push({
            name: data.three_pro_name,
            time: data.three_pro_time,
            info: data.three_pro_info
          })
        }
        if(data.four_pro_name){
          this.form.project.push({
            name: data.four_pro_name,
            time: data.four_pro_time,
            info: data.four_pro_info
          })
        }
        if(data.five_pro_name){
          this.form.project.push({
            name: data.five_pro_name,
            time: data.five_pro_time,
            info: data.five_pro_info
          })
        }
        if(data.six_pro_name){
          this.form.project.push({
            name: data.six_pro_name,
            time: data.six_pro_time,
            info: data.six_pro_info
          })
        }
        if(data.seven_pro_name){
          this.form.project.push({
            name: data.seven_pro_name,
            time: data.seven_pro_time,
            info: data.seven_pro_info
          })
        }
      }
    )
  }
}
</script>
<style scoped>
.btn{
  margin: 10px 0;
  width: 120px;
}
.content{
  background-color: #e7e7e7;
}
.white{
  background-color: white;
}
</style>