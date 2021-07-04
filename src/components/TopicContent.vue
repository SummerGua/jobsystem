<template>
  <div class="topic-box">
    <div class="info">
      <div>
        <img :src="avatorUrl" width="72px" height="72px">
        <div class="username">{{ username }}</div>
      </div>
      
    </div>
    <h1 :title="title" class="title">{{ title }}</h1>
    <div class="content" v-html="compiledContent"></div>
    <div class="date"> {{ date }} </div>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/dark.css'
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    avatorUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    compiledContent() {
      return marked(this.content, {
        highlight: code => {
          return hljs.highlightAuto(code).value
      }}).replace(/<pre>/g, "<pre class='hljs'>")
    }
  }
}
</script>
<style scoped>
.content {
  text-align:left;
  width: 850px;
  border-left: 1px solid black;
  padding-left: 6px;
}
.topic-box {
  overflow: hidden;
  padding-top: 10px;
}
.title {
  font-weight: bolder;
  float: left;
  width: 850px;
  height: 42px;
  text-align: left;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid black;
  border-left: 1px solid black;

  margin-bottom: 0;
}
.info {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
.username {
  color: grey;
}
.content {
  float: left;
  text-align: left;
  margin: 0;
}
.date {
  float: right;
  margin-right: 10px;
  font-size: 14px;
  text-align: right;
}
</style>