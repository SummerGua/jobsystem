<template>
  <div class="content">
    <el-button class="btn" type="primary" @click="noPre">返回</el-button>
    <div class="detail">
      <div class="name">{{ form.name }}</div>
    <div class="item sex">{{ form.realSex[form.sex] }}</div>
    <div class="item bir">生日：{{ form.birthday }}</div>
    <div class="item diploma">{{ form.diploma  }}</div>
    <div class="clear contact">
      <div class="item tele">{{ form.tele }}</div>
      <div class="item email">{{ form.email }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">求职意向</div>
    <div class="want">
      <div class="item want-city">{{ form.city }}</div>
      <div class="item want-job">{{ form.job }}</div>
      <div class="item want-salary" v-if="options[form.salary-1]">{{ options[form.salary-1].salary }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">教育经历</div>
    <div class="edu-exp" v-for="(item,index) in form.eduinfo" :key="index">
      <div class="item bold edu-schoolname">{{ item.name }}</div>
      <div class="item bold edu-time">时间：{{ item.lasttime }}</div>
      <div class="item bold edu-degree">{{ item.degree }}</div>
      <div class="item bold edu-rank">成绩：{{ item.rank }}</div>
      <div class="item clear info">{{ item.info }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">项目经历</div>
    <div class="pro-exp" v-for="(item, index) in form.project" :key="index+'exp'">
      <div class="item bold pro-name">{{ item.name }}</div>
      <div class="item bold pro-time">{{ item.time }}</div>
      <div class="info clear">{{ item.info }}</div>
    </div>

    <div class="title">工作经历</div>
    <div class="work-exp" v-for="(item, index) in form.workExp" :key="index+'w'">
      <div class="item bold work-name">{{ item.company }}</div>
      <div class="item bold work-time">{{ item.time }}</div>
      <div class="clear info">{{ item.info }}</div>
    </div>

    <div class="title">个人技能</div>
    <div class="skills">{{ form.skill }}</div>

    <div class="title">自我评价</div>
    <div class="evaluation">{{ form.evaluation }}</div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    noPre(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.content{
  background-color: white;
  width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 40px 20px;
}
.btn{
  width: 120px;
}
.name{
  font-size: 45px;
  margin-bottom: 16px;
}
.title{
  font-size: 30px;
  margin: 10px 0;
  border-top: 1px solid silver;
}
.item{
  float: left;
  margin-right: 20px;
  vertical-align: bottom;
}
.clear{
  clear: both;
}

.info{
  margin-top: 6px;
  margin-bottom: 10px;
}
.bold{
  font-weight: bold;
}
</style>