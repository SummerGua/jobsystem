<template>
  <div class="register">
    <RegisterForm></RegisterForm>
  </div>
</template>
<script>
import RegisterForm from "../components/RegisterForm.vue"
export default {
  components:{
    RegisterForm
  }
  
}
</script>
<style scoped>
.register{
  margin-top: 80px;
}
</style>