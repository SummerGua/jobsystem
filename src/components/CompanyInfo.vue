<template>
  <div class="container">
    <div class="head">
      <div class="img">{{ companyInfo.src }}</div>
      <div class="name">{{ companyInfo.name }}</div>
      <div class="des">{{ companyInfo.description }}</div>
      <div class="detail">{{ companyInfo.detail }}</div>
    </div>
    <div class="positons">
      <div class="position" v-for="(item, index) in details" :key="index+'pos'">
        <div class="job-name">{{ item.jobname }}</div>
        <div class="salary">{{ item.salary }}</div>
        <div class="city">{{ item.city }}</div>
        <div class="diploma">{{ item.diploma }}</div>
        <!-- 经验要求 -->
        <div class="exp">{{ item.exp }}</div>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Array,
      required: true
    },
    companyInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>