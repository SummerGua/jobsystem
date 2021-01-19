<template>
  <div>
    <el-rate v-model="stars" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
  </div>
</template>
<script>
export default {
  props: {
    stars:{
      type: Number,
      required: true
    }
  }  
}
</script>
<style scoped>

</style>