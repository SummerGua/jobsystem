<template>
  <div class="container">
    <div class="info-box">
      <div class="left">
        <div class="index">
          <h3>简历目录</h3>
          <ul class="list">
            <li @click="myP">我的创作</li>
            <li @click="myC">我的收藏</li>
            <li @click="myR">我的回复</li>
          </ul>
        </div>
      </div>
      <div class="right" v-show="active===0">
        <el-table stripe border max-height="800" :data="posts">
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="goPost(0, scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right" v-show="active===1">
        <el-table stripe border max-height="800" :data="collects">
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="goPost(0, scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right" v-show="active===2">
        <el-table stripe border max-height="800" :data="replies">
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="content" label="评论内容"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="goPost(1, scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data(){
    return{
      collects: [],
      posts: [],
      replies: [],
      active: 0,
    }
  },
  methods:{
    myP() {
      this.active = 0
    },
    myC() {
      this.active = 1
    },
    myR() {
      this.active = 2
    },
    getData() {
      this.$http.get('/bbs/getMyCollectsReplies').then(
        res => {
          let { data } = res.data
          this.collects = data[0]
          this.replies = data[1]
        }
      )
    },
    goPost(type, index) {
      this.$router.push({
        name: 'Post',
        query: {
          postId: 
            type === 0
            ? this.posts[index].id
            : type===1
            ? this.collects[index].postid : this.replies[index].postid,
        }
      })
    },
    getMyPosts() {
      this.$http.get('/bbs/getMyPosts').then(
        res => {
          let { data } = res.data
          this.posts = data
        }
      )
    }
  },
  beforeCreate () {
	// 修改背景色
    document.querySelector('body').setAttribute('style', 'background-color:#f1f1f1')
  },
  beforeDestroy () {
	// 销毁背景色
    document.querySelector('body').removeAttribute('style')
  },
  mounted() {
    this.getData()
    this.getMyPosts()
  }
}
</script>

<style scoped>
.container{
  height: 100%;
}
.top-menu{
  width: 1228px;
  height: 62px;
  margin: 20px auto 0 auto;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
}
.info-box{
  margin: 20px auto 0 auto;
  width: 1228px;
  max-height: 1200px;
  display: -webkit-inline-box;
}
.menu-title{
  height: 100%;
  margin-left: 50px;
}
.menu-title span{
  line-height: 62px;
  font-size: 20px;
  font-weight: 600;
}
.function{
  margin: auto 40px auto 0;
}

.index{
 background-color: white;
  width: 182px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 12px -10px;
  padding: 0;
  margin: 0;
  height: 180px;
}
.index h3{
  font-size: 18px;
  font-weight: 500;
  width: 182px;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid rgb(227, 231, 237);
  margin: 0;
}
.list{
  padding: 0;
}
.list li{
  height: 38px;
}
.list li:hover{
  color: #409eff;
  cursor: pointer;
}
.right{
  width: 1026px;
  margin-left: 20px;
  background-color: white;
}
</style>