<template>
  <div class="container">
    <div class="head">
      <div class="img"><img alt="pic" :src="companyInfo.src"></div>
      <h1 class="name">{{ companyInfo.companyName }}</h1>
      <div class="des">公司描述：{{ companyInfo.description }}</div>
      <div class="detail">{{ companyInfo.detail }}</div>
    </div>

    <div class="positons">
      <el-table border stripe width="100%" :data="jobs">
        <el-table-column prop="jobname" label="岗位名称"></el-table-column>
        <el-table-column prop="salary" label="薪水"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="diploma" label="学历要求"></el-table-column>
        <el-table-column prop="exp" label="经验要求"></el-table-column>
        <el-table-column prop="description" label="岗位职责"></el-table-column>
        <el-table-column prop="skills" label="技能要求"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="submit(scope.$index)" type="text" size="small">投递简历</el-button>
            <el-button @click="chat(scope.$index)" type="text" size="small">联系</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="content" v-show="showChat">
        <el-input type="textarea" v-model="content"></el-input>
        <el-button class="send" type="primary" @click="send">发送</el-button>
        <el-button class="send" type="primary" @click="closebtn">关闭</el-button>
      </div>
      <el-dialog title="选择简历" :visible.sync="bool">
        <el-table stripe width="60%" :data="resumes">
        <el-table-column prop="upTime" label="保存时间"></el-table-column>
        <el-table-column prop="job" label="预期岗位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="select(scope.$index)" type="text" size="small">投递</el-button>
            <el-button @click="preview(scope.$index)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-dialog>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      companyInfo: {},
      showChat: false,
      content : '',
      jobs: [],
      cid: '',
      bool: false,
      cache: {
        rid: '',
        uid: '',
        jid: '',
        companyName: ''
      },
      resumes: [],
      toUid: ''
    }
  },
  methods: {
    closebtn(){
      this.showChat = false
      this.message = ''
      this.toUid = ''
    },
    submit(x){ //点击之后跳出dialog并获取数据
      if(!this.$store.state.isLogin||this.$store.state.isStu==0){
        this.$message.warning("未登录或没有权限")
        return false
      }
      this.resumes = []
      this.$http.get('/users/getShortResume').then(
        res => {
          for(let i=0;i<res.data.data.length;i++){
            if(res.data.data[i].sended==0){
              res.data.data[i].upTime = res.data.data[i].upTime.split('.')[0]
              res.data.data[i].upTime = res.data.data[i].upTime.replace(/T/,' ')
              this.resumes.push(res.data.data[i])
            }
          }
        }
      )
      this.bool = true
      this.cache.uid = this.jobs[x].uid
      this.cache.jid = this.jobs[x].jid
    },
    close(){
      this.cache.rid = ''
      this.cache.uid = ''
      this.cache.jid = ''
      this.cache.companyName = ''
      this.bool = false
      this.resumes = []
    },
    chat(index){
      if(!this.$store.state.isLogin||this.$store.state.isStu==0){
        this.$message.warning("未登录或没有权限")
        return false
      }
      this.showChat = true
      this.toUid = this.jobs[index].uid

    },
    send(){
      this.$http.post('/users/sendMessage',{message: this.content,toUid: this.toUid}).then(
        info => {
          if(info.data.code==0) this.$message.success("发送成功")
        }
      )
      this.closebtn()
    },
    preview(index){
      this.$router.push({
        name: 'Preview',
        query: {
          rid: this.resumes[index].rid
        }
      })
    },
    select(x){
      this.$confirm('投递之后将无法撤回', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cache.rid = this.resumes[x].rid
        this.cache.companyName = this.companyInfo.companyName
        this.$http.post('/users/sendResume',this.cache).then(
          res => {
            if(res.data.code ==0) this.$message.success("成功")
            else{
              this.$message.error("失败")
            }
          }
        )
      })
    },
    getJobs(x){
      this.$http.get('/public/userGetJobs?cid='+x).then(
        res => {
          this.jobs = res.data.data
        }
      )
    },
    getCompanyInfo(x){
      this.$http.get('/public/getOneCom?cid='+x).then(
        res => {
          this.companyInfo = res.data.data[0]
        }
      )
    }
  },
  created(){
    this.cid = this.$route.query.cid
  },
  mounted(){
    this.getJobs(this.cid)
    this.getCompanyInfo(this.cid)
  }
}
</script>

<style scoped>
.container{
  width: 1200px;
  margin: 0 auto;
}
.content{
  z-index: 100;
  width: 320px;
  background-color: forestgreen;
  padding: 10px;
  position: absolute;
  left: 1000px;
  top: 200px;
}
.des{
  margin-bottom: 20px;
}
.img{
  margin-top: 20px;
}
</style>