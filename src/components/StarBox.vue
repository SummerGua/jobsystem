<template>
  <div class="mani-box">
    <div class="real-box">
      <div @click="like(postid, senderuid)">
        <i
          title="点个赞吧"
          @mouseover="bigger($event, 'like')"
          @mouseout="smaller($event, 'like')"
          :class="[hasLiked ?
          'icon fa fa-thumbs-up fa-2x' :
          'icon fa fa-thumbs-o-up fa-2x'
          ]"
          aria-hidden="true">
        </i>
      </div>
      <div @click="collect(postid)">
        <i
          title="收藏这篇文章"
          :class="[hasCollected ?
          'icon fa fa-star fa-2x' :
          'icon fa fa-star-o fa-2x'
          ]"
          aria-hidden="true"
          @mouseover="bigger($event, 'star')"
          @mouseout="smaller($event, 'star')">
        </i>
      </div>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '../plugins/formatTime'
export default {
  props: {
    senderuid: {
      type: String,
      required: true
    },
    postid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hasLiked: true,
      hasCollected: false
    }
  },
  methods: {
    bigger($event, type){
      if(type === 'star') {
        $event.currentTarget.className =
        this.hasCollected ?
        "icon fa fa-star fa-3x" : // 收藏过了是实心
        "icon fa fa-star-o fa-3x"
      } else {
        $event.currentTarget.className =
        this.hasLiked ? // 点赞过了是实心
        "icon fa fa-thumbs-up fa-3x" :
        "icon fa fa-thumbs-o-up fa-3x"
      }
    },
    smaller($event, type){
      if(type === 'star') {
        $event.currentTarget.className =
        this.hasCollected ?
        "icon fa fa-star fa-2x" :
        "icon fa fa-star-o fa-2x"
      } else {
        $event.currentTarget.className =
        this.hasLiked ?
        "icon fa fa-thumbs-up fa-2x" :
        "icon fa fa-thumbs-o-up fa-2x"
      }
    },
    like(postid, senderuid) {
      this.$http.post('bbs/likeThis',
      {
        senderuid: senderuid,
        postid: postid,
        date: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      }).then(
        res => {
          let { data } = res
          if( data.code === 0) {
            this.check(this.postid)
            this.$message.success(data.data)
          } else {
            this.check(this.postid)
            this.$message.warning(data.data)
          }
        }
      )
    },
    collect(postid) {
      this.$http.post('bbs/collectThis',
      {
        postid: postid,
        date: dateFormat('YYYY-mm-dd HH:MM:SS',new Date())
      }).then(
        res => {
          let { data } = res
          if( data.code === 0) {
            this.check(this.postid)
            this.$parent.$refs.MyInfoBox.getMyCount()
            this.$message.success(data.data)
          } else {
            this.check(this.postid)
            this.$parent.$refs.MyInfoBox.getMyCount()
            this.$message.warning(data.data)
          }
        }
      )
    },
    check(postid) {
      this.$http.post('/bbs/checkLike', { postid: postid }).then(
        res => {
          let { data } = res.data
          this.hasLiked = data.hasLiked
          this.hasCollected = data.hasCollected
        }
      )
    }
  },
  mounted() {
    this.check(this.postid)
  }
}
</script>
<style scoped>
.icon:hover {
  cursor: pointer;
}
.mani-box {
  
}
.real-box {
  background-color: white;
  border-radius: 3px;
  float: left;
  width: 80px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>