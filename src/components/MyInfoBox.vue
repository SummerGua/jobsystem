<template>
<div class="info-box">
  <div class="my-info">
    <img :src="myAvatorUrl"
    width="48px"
    height="48px"
    alt="avator">
    <div class="myname">{{ myName }}</div>
  </div>
  <div class="count">
    <div class="item">
      <p>创作</p><div @click="go" class="number">{{ myPostsCount }}</div>
    </div>
    <div class="item">
      <p>收藏</p><div @click="go" class="number">{{ myCollectsCount }}</div>
    </div>
    <div class="item">
      <p>回复</p><div @click="go" class="number">{{ myRepliesCount }}</div>
    </div>
  </div>
</div>
  
</template>
<script>
export default {
  data(){
    return {
      myPostsCount: '',
      myRepliesCount: '',
      myCollectsCount: '',
      myName: '',
      myAvatorUrl: ''
    }
  },
  methods: {
    getMyCount() {
      this.$http.post('/bbs/getMyCount').then(
        res => {
          let { data } = res.data
          this.myPostsCount = data.myPostsCount
          this.myRepliesCount = data.myRepliesCount
          this.myCollectsCount = data.myCollectsCount
        }
      )
    },
    go() {
      this.$router.push('/myCRs')
    }
  },
  mounted(){
    this.myName = sessionStorage.getItem('name')
    this.myAvatorUrl =
    `http://localhost:3000/avators/${sessionStorage.getItem('uid')}.jpg`
    this.getMyCount()
  }
}
</script>
<style scoped>
.info-box {
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
}
.my-info {
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 4px 6px;
}
.my-info .myname {
  height: 48px;
  line-height: 48px;
}
.count {
  background-color: white;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  padding: 6px;
}
.count .item {
  border-right: 1px solid black;
  padding-right: 4px;
  width: 60px;
}
.item:last-child {
  border-right: none;
}
p {
  margin: 0 0 8px 0;
}
.number:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>