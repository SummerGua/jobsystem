<template>
  <div class="container">
    <h1>
      {{ ResumeData.name }}
    </h1>
    <ul>
      <li>年龄：{{ ResumeData.age }}</li>
      <li>学历：{{ ResumeData.xueli }}</li>
    </ul>
    <h2>教育经历</h2>
    <p>{{ ResumeData.education }}</p>
    <h2>在校经历</h2>
    <p>{{ ResumeData.schexp }}</p>
    <h2>求职意向</h2>
    <p>{{ ResumeData.city }}{{ ResumeData.job }}</p>
    <h2>项目经历</h2>
    <p>{{ ResumeData.proexp}}</p>
    <h2>获奖情况</h2>
    <p>{{ ResumeData.awards }}</p>
    <h2>个人技能</h2>
    <p>{{ ResumeData.skills }}</p>
    <h2>自我评价</h2>
    <p>{{ ResumeData.evaluation }}</p>
  </div>
</template>
<script>
export default {
  props: {
    ResumeData: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.container{
  width: 720px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: left;
  overflow: auto;
  background-color: #e7e7e7;
  padding-left: 10px;
  padding-right: 10px;
}
ul{
  padding: 0;
  margin-top: 0;
}
li{
  float: left;
  margin-right: 20px;
}
h1{
  margin-bottom: 6px;
}
h2{
  margin-top: 10px;
  margin-bottom: 10px;
}
p{
  margin-top: 6px;
}
</style>