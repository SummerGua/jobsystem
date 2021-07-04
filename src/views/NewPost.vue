<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <el-input class="title" v-model="title" placeholder="请输入标题"></el-input>
        <el-select class="type" v-model="value" placeholder="请选择分区">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="btn" @click="post">发布</el-button>
      </div>
      <code-area :input="content"></code-area>
    </div>
  </div>
</template>
<script>
import CodeArea from '../components/CodeArea.vue'
import { dateFormat } from '../plugins/formatTime'
export default {
  components: { CodeArea },
  data() {
    return {
      content: "请在此输入内容 可使用markdown语法 如：\n# 一级标题\n"+
      "```javascript\nconsole.log(1) // 代码块\n```\n**暂时不可上传图片**",
      title: '',
      value: '',
      options: [
        { value: '1', label: '笔经面经'},
        { value: '2', label: '杂谈'},
        { value: '3', label: '招聘信息'},
        { value: '4', label: '技术交流'}
      ]
    }
  },
  methods: {
    post() {
      if(this.content==="" || !this.title==="" || this.value==="") {
        this.$message.error("请输入完整！")
        return false
      }
      this.$http.post('/bbs/makePost',
      {
        title: this.title,
        content: this.content,
        type: this.value,
        date: dateFormat('YYYY-mm-dd HH:MM', new Date())
      }).then(
        res => {
          console.log(res.data)
        }
      )
      return 1
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  background-color: #e7e7e7;
  min-height: calc(100vh - 49px);
}
.box {
  padding: 10px;
  width: 1228px;
  margin: 0 auto;
  
}
.header {
  line-height: 62px;
  height: 62px;
  background-color: white;
}
.title {
  width: 260px;
  float: left;
  margin: 0 10px;
  
}
.type {
  float: left;
}
.btn {
  float: right;
  margin-right: 10px;
  margin-top: 11px;
}
</style>