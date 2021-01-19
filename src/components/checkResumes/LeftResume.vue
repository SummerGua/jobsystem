<template>
  <div>
    <h1>
      {{ data.name }}
    </h1>
    <ul>
      <li>年龄：{{ data.age }}</li>
      <li>学历：{{ data.xueli }}</li>
    </ul>
    <h2>教育经历</h2>
    <p>{{ data.education }}</p>
    <h2>在校经历</h2>
    <p>{{ data.schexp }}</p>
    <h2>求职意向</h2>
    <p>{{ data.city }}{{ data.job }}</p>
    <h2>项目经历</h2>
    <p>{{ data.proexp}}</p>
    <h2>获奖情况</h2>
    <p>{{ data.awards }}</p>
    <h2>个人技能</h2>
    <p>{{ data.skills }}</p>
    <h2>自我评价</h2>
    <p>{{ data.evaluation }}</p>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>

</style>