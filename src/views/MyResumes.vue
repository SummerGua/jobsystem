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
.view{
  height: cacl(100vh-49px);
}
</style>