<template>
  <div class="box" :class="{sticky: isSticky}">
    <div class="box-header">
      <div>添加一条新回复</div>
      <div class="toTop">
        <a v-show="isSticky" @click="stop">取消底部停靠</a>
        <a v-show="!isSticky" @click="stop">底部停靠</a>
        <a style="margin-left: 10px" @click="toTop">回到顶部</a>
        </div>
    </div>
    <div class="textarea-box">
      <textarea v-model="content" class="textarea"></textarea>
    </div>
    <div class="post">
      <el-button @click="send" class="btn" plain>发送</el-button>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '../plugins/formatTime'
export default {
  props: {
    postid: {
      type: String,
      required: true
    },
    senderuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: '',
      isSticky: true,
    }
  },
  methods: {
    stop() {
      this.isSticky = !this.isSticky
    },
    toTop() {
      scrollTo(0, 0)
    },
    send() {
      if(this.content.split(' ').join('').split('\n').join('') === ''){
        this.$message.warning('请不要发送空消息')
        return true
      }
      this.$http.post('/bbs/makeReply',{
        content: this.content,
        postid: this.postid,
        senderuid: this.senderuid,
        date: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      }).then(
        res => {
          let { data } = res
          if(data.code === 0) {
            this.$parent.$refs.MyInfoBox.getMyCount()
            this.$message.success('发送成功')
            this.content = ''
            this.getNew()
          } else {
            this.$parent.$refs.MyInfoBox.getMyCount()
            this.$message.warning('出了点问题')
          }
          
        }
      )
    },
    getNew() {
      this.$emit('getNew')
    }
  }
}
</script>
<style scoped>
.textarea {
  resize: none;
  width: 98%;
  margin: 0 auto;
  height: 100%;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.box-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
}
.textarea-box {
  padding: 6px;
  height: 112px;
  margin-bottom: 10px;
}
.post {
  text-align: left;
  padding-left: 10px;
}
.btn {
  height: 30px;
}
.box {
  padding-bottom: 10px;
  box-shadow: 0 2px 20px rgb(0 0 0 / 35%);
}
.sticky {
  position: sticky;
  bottom: 6px;
}
::v-deep .el-button--default {
  padding-top: 8px;
}
.toTop {
  color: #778087
}
.toTop a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>