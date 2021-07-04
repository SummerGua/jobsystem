<template>
  <div class="container">
    
    <div class="min-one">
      <div class="left">
        <TopicContent
        class="topic"
        :title="top.topTitle"
        :avatorUrl="top.topAvatorUrl"
        :username="top.topUsername"
        :date="top.topDate"
        :content="top.topContent">
        </TopicContent>
        <div v-if="!noreply">
          <div class="reply-header">共{{replys.length}}条回复</div>
        <OneReply v-for="(item, index) in replys"
          :key="index"
          :number="item.number"
          :avatorUrl="item.avatorUrl"
          :date="item.date"
          :replyText="item.content"
          :username="item.name"
          ></OneReply>
        </div>
        <div v-else>
        暂无评论
        </div>
        <ReplyBox @getNew="getReplies(postId)" :senderuid="top.topUid.toString()" :postid="postId.toString()" class="replybox"></ReplyBox>
      </div>
      <div class="right">
        <my-info-box ref="MyInfoBox" class="info-box"></my-info-box>
        <StarBox :senderuid="top.topUid.toString()" :postid="postId.toString()"></StarBox>
      </div>
    </div>
  </div>
</template>
<script>
import StarBox from '../components/StarBox.vue'
import MyInfoBox from '../components/MyInfoBox.vue'
import OneReply from '../components/OneReply.vue'
import ReplyBox from '../components/ReplyBox.vue'
import TopicContent from '../components/TopicContent.vue'
import { makeSqlResTime } from '../plugins/utils'
export default {
  components: { StarBox, OneReply, TopicContent, MyInfoBox, ReplyBox },
  data() {
    return {
      top: {
        topUsername: '',
        topUid: '',
        topDate: '',
        topContent: '',
        topAvatorUrl: '',
        topTitle: ''
      },
      noreply: true,
      replys: []
    }
  },
  methods: {
    getTop(postId) {
      this.$http.post('/bbs/getTopicInfo', { postId: postId }).then(
        info => {
          let { data }  = info.data
          this.top.topUsername = data.name
          this.top.topDate = makeSqlResTime(data.date)
          this.top.topContent = data.content
          this.top.topTitle = data.title
          this.top.topUid = data.uid
          this.top.topAvatorUrl = 
          `http://localhost:3000/avators/${data.uid}.jpg`
        }
      )
    },
    getReplies(postId) {
      this.$http.get(`/bbs/getReplies?id=${postId}`).then(
        info => {
          let { data }  = info
          if( data.code === 0) {
            let { data } = info.data
            for(let i=0; i<data.length; i++) {
              data[i].date = makeSqlResTime(data[i].date)
                this.$set(this.replys, i, data[i])
            }
            this.noreply = false
          } else {
            this.noreply = true
          }
          
        }
      )
    }
  },
  mounted() {
    this.getTop(this.$route.query.postId)
    this.getReplies(this.$route.query.postId)
  },
  computed: {
    postId: function() {
      return this.$route.query.postId.toString()
    }
  }
}
</script>
<style scoped>
.container {
  background-color: #e7e7e7;
  min-height: calc(100vh - 49px);
}
.container .min-one {
  width: 1228px;
  margin: 0 auto;
  padding-top: 20px;
}
.min-one:after {
  display:block;
  clear: both;
  content:'';
  height: 0;
}
.left {
  width: 952px;
  float: left
}
.reply-header {
  background-color: white;
  text-align: left;
  padding: 10px 5px;
  color: #999999;
}
.topic {
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
}
.right {
  float: right;
  width: 250px;
  position: sticky;
  top: 10px;
}
.replybox {
  width: 100%;
  margin-top: 10px;
  background-color: white;
}
</style>