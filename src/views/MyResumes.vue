<template>
  <div class="view">
    <MyResumes></MyResumes>
  </div>
</template>
<script>
import MyResumes from '../components/MyResumes'

export default {
  components:{
    MyResumes
  }
}
</script>
<style scoped>
.view {
  height: calc(100vh - 49px);
}
</style>