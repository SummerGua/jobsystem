<template>
  <div>
    <div class="title">为简历打分</div>
    <el-rate :show-score=true v-model="stars" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
  </div>
</template>
<script>
export default {
  data(){
    return{
      stars:0
    }
  },
  updated(){
      this.$emit('star',this.stars)
  }
}
</script>
<style scoped>

</style>