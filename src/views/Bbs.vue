<template>
  <div class="bbs">
    <div class="container">
      <div class="header">
        <p class="bbs-title">
          讨论区
        </p>
        <div class="btn">
          <el-button
            @click="newPost()"
            type="primary">我要发布
          </el-button>
        </div>
      </div>

      <div class="type">
        <div class="group">
          <div
            v-for="item in types"
            :key="item.label"
            @click="chooseType(item.label)"
            :class="{'choosed': item.label===activeType}">
            {{ item.value }}
          </div>
        </div>

      </div>
      <div v-if="this.loadContent" class="content">
        <div
        class="post"
        v-for="post in posts"
        :key="post.id">
          <div class="avator"><img alt="avator" height="50px" width="50px" :src="post.avatorUrl"></div>
          <div class="post-title" @click="seeContent(post.id)">{{ post.title }}</div>
          
          <div class="other-info">
            <div class="date">{{ post.date }}</div>
            <div class="counts">
              <i
                class="fa fa-star-o"
                aria-hidden="true">{{ post.collectsNumber }}</i>
              <i
                class="fa fa-thumbs-o-up"
                aria-hidden="true">{{ post.likesNumber }}</i>
              <i 
              class="fa fa-commenting-o"
              aria-hidden="true">
              {{ post.repliesNumber }}</i>
            </div>
          </div>
          <div class="post-username">{{ post.name }}</div>
        </div>
        <!-- <div class="pagi">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div> -->
      </div>
      <div class="right">
        <MyInfoBox></MyInfoBox>
      </div>
    </div>
  </div>
</template>
<script>
import MyInfoBox from '../components/MyInfoBox.vue'
export default {
  components: { MyInfoBox },
  name: 'Bbs',
  data() {
    return {
      activeType: 0,
      loadContent: false,
      picUrl: '',
      myName: '',
      total: 1,
      choosedType: 0,
      posts: [
        {
          id: 0,
          date: '',
          title: '',
        }
      ],
      types: [
        { label: 0, value: '全部' },
        { label: 1, value: '笔经面经' },
        { label: 2, value: '杂谈' },
        { label: 3, value: '招聘信息' },
        { label: 4, value: '技术交流' }
      ],
      hots: [
        { label: 0, value: '#1#' },
        { label: 1, value: '#2#' },
        { label: 2, value: '#3#' },
      ]
    }
  },
  methods: {
    newPost() {
      this.$router.push({
        name: 'NewPost',
      })
    },
    chooseType(x) {
      this.activeType = x
      this.getPosts(x) 
    },
    getPosts(type) {
      this.loadContent = false
      this.$http.get(`/bbs/getPosts?type=${type}`).then(
        res => {
          this.posts = []
          for(let i=0; i<res.data.length;i++){
            res.data[i].date = res.data[i].date.split('T')[0]
            this.$http.get(`/bbs/getAllCount?id=${res.data[i].id}`).then(
              response => { // 点赞数
                Object.assign(res.data[i],
                  response.data.data,
                  { avatorUrl: `http://localhost:3000/avators/${res.data[i].uid}.jpg` }
                )
                this.$set(this.posts,i,res.data[i])
               
              }
            )
          }
          this.$nextTick(() => this.loadContent=true)
        }
      )
      
    },
    seeContent(id) {
      this.$router.push({
        name: 'Post',
        query: {
          postId: id,
        }
      })
    }
  },
  mounted(){
    this.loadContent = false
    this.myName = sessionStorage.getItem('name')
    this.getPosts(0)
  }
}
</script>
<style scoped>
.choosed {
  background-color: #409EFF;
  color: white;
}
.group div:hover {
  cursor: pointer;
}
.group div {
  padding: 4px 0;
}
.bbs {
  min-height: calc(100vh - 49px);
  background-color: #e7e7e7;
}
.container {
  width: 1228px;
  margin: 0 auto;
  padding-top: 20px;
  overflow: hidden;
}
.header {
  width: 1188px;
  height: 62px;
  padding: 0 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.btn, .bbs-title {
  line-height: 62px;
  margin: 0;
}
.type {
  width: 182px;
  background-color: white;
  margin-right: 20px;
  float: left;
}
.group {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  background-color: white;
}
::v-deep .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0;
}
::v-deep .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 0;
}
::v-deep .el-radio-button__inner {
  border: none;
}
::v-deep .el-radio-button:first-child .el-radio-button__inner{
  border: none;
}
.content {
  float: left;
  width: 750px;
  background-color: white;
}
.post {
  height: 52px;
  border-bottom: 1px solid grey;
  padding: 10px;
}
.post-title {
  color: #778087;
  font-size: 17px;
  width: 500px;
  float: left;
  text-overflow: ellipsis;
  text-decoration: none;
  text-align: left;
}
.post-title:hover {
  text-decoration: underline;
  cursor: pointer;
  color: black;
}
.date {
  color: #999999;
  font-size: 12px;
  height: 14px;
  text-align: right;
}
.right {
  width: 250px;
  float: right;
}
.avator {
  float: left;
  margin-right: 10px;
}
.post-username {
  width: 100px;
  float: left;
  text-align: left;
  margin-top: 10px;
  text-overflow: ellipsis;
}
.other-info {
  height: 100%;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  float: right;
}
.counts {
  display: flex;
  justify-content: space-evenly;
}
</style>