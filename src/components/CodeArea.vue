<template>
  <div class="codearea">
    <mavon-editor
      class="editor"
      v-model="input"
      :toolbarsFlag="false">
    </mavon-editor>
  </div>
</template>
<script>
export default {
  props: {
    input: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.codearea {
  padding-top: 10px;
  
}
.editor {
  height: 500px;
}
</style>