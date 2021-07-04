<template>
  <div class="reply">
    <div class="info">
      <img alt="avator" width="48px" height="48px" :src="avatorUrl" class="avator">
      <div class="username">{{ username }}</div>
    </div>
    <div class="content">{{ replyText }}</div>
    <div class="date">
      <div class="time">{{ date }}</div>
      <div class="number">#{{ number }}</div>
    </div>
    
  </div>
</template>
<script>
export default {
  props: {
    avatorUrl: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    replyText: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped>
.reply {
  overflow: hidden;
  background-color: white;
  padding: 10px 0px;
  width: 100%;
  border-top: 1px solid grey;

}
.content {
  width: 700px;
  float: left;
  text-align: left;
}
.info {
  width: 48px;
  float: left;
  margin-right: 20px;
  margin-left: 10px;
  font-weight: bold;
  color: grey;
}
.date {
  width: 149px;
  float: right;
  margin-right: 10px;
}
.date .time {
    font-size: 14px;
    text-align: right;
}
.number {
  color: #a6a6a6;
  text-align: right;
  text-decoration: underline;
}
</style>