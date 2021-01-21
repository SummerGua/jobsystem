<template>

  <div class="container">
    <div class="msg-container">
    <div class="side-bar">
      <div class="title">消息中心</div>
      <ul>
        <li class="font-active">我的消息</li>
        <li v-if="this.$store.state.isStu==1">收到的赞</li>
        <li v-if="this.$store.state.isStu==1">回复我的</li>
        <li>系统通知</li>
      </ul>
    </div>
    <div class="right-part">
      <div class="msg-top-bar">
        <span>我的消息</span>
        <span>设置</span>
      </div>
      <div class="msg-box">
        <div class="left">
        <div class="recent-msg">
          <span>近期消息</span>
        </div>
        <div v-for="(item) in nameList" :key="item.id" :class="{active:item.id===isActive}" @click="changeClass(item.id)" class="list-item">
          <div class="left-imgs">
            <img :src="item.src">
          </div>
          <a class="left-names">
            {{ item.name }}
          </a>
        </div>
        </div>
        <div class="right">
          <div class="msg-title">
            <span>{{nameList[isActive].name}}</span>
            </div>
          <!-- 聊天内容 -->
          <div ref="win" class="msg-list">
            <div v-if="texts[isActive]">

            
            <div v-for="(text,index) in texts[isActive]" :key="index">
              <div class="line" v-if="!text.mine">
                <div class="friend">{{text.content}}</div>
                </div>
              <div class="line" v-else>
                <div class="me">{{text.content}}</div>
              </div>
            </div>
</div>
          </div>

          <div class="send-box">
            <div class="input-box">
              <el-input type="textarea" :rows="4" resize="none" placeholder="回复一下吧" v-model="textarea[isActive]">
              </el-input>
            </div>
            <div class="send-area">
              <a>{{textarea[isActive].length}}/500</a>
              <el-button @click="sendMessage" class="send-btn">发 送</el-button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  </div>

</template>
<script>
import {getMessageSenders} from '../plugins/request'
export default {
  data(){
    return{
      nameList: [],
      isActive: 0,
      textarea: ['','','','','','',''],
      texts:[
        [
        {mine:1,content:"我的第一条消息"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        {mine:0,content:"对面的hello!!"},
        ],
        [],
        []
        ]

    }
  },
  methods: {
    changeClass(ind){
      this.isActive = ind
    },
    sendMessage(){
      if(this.textarea[this.isActive].split(' ').join('') !== ""
      &&
      this.textarea[this.isActive].split('\n').join('')!==""){
        this.texts[this.isActive].push({mine:1,content:this.textarea[this.isActive]})
        this.textarea[this.isActive] = ''
      }else{
        alert("输入为空无法发送")
      }
    }
  },
  created(){
  getMessageSenders().then(res=>{
      if(res.data){
        this.nameList = res.data.data
      }
    }).catch(err=>{
      alert("获取聊天失败"+err)
    })
  },
  updated(){
    this.$refs.win.scrollTop = this.$refs.win.scrollHeight
  }
}
</script>
<style scoped>
.container{
  max-width: 1143px;
  margin: 0 auto;
  font-weight: 700;
  height: calc(100vh - 49px);
  color: #666;
}
.msg-container{
  display: flex;
  height: calc(100vh - 49px);
  position: absolute;
}
.title{
  color: #333;
  height: 62px;
  text-align: center;
  line-height: 62px;
}
.side-bar{
  background-color: rgba(255,255,255,0.8);
  width: 140px;
  font-size: 14px;
  color: #666;
}
ul{
  width: 100%;
  padding: 0;
}
li{
  margin-bottom: 20px;
}
li:hover{
  cursor: pointer;
  color: #2faee3;
}
.right-part{
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255,0.5);
  padding: 10px 10px 0;
}
.msg-top-bar{
  padding: 0 16px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left{
  width: 240px;
  height: 100%;
  overflow: auto;
  border-right: #666 1px solid;

}
.right{
  flex: 1;
  width: 743px;

}
.recent-msg{
  display: flex;
  font-size: 12px;
  padding: 0 0 0 16px;
  margin: 0 auto 10px;
}
.list-item{
  height: 60px;
  line-height: 60px;
  position: relative;
}
.list-item:hover{
  cursor: pointer;
  background-color: #e4e5e6;
}
.active{
  background-color: #e4e5e6;
}
.font-active{
  color: #2faee3;
}
.msg-title{
  height: 36px;
  display: flex;
  justify-content: center;
  color: black;
}
.send-box{
  height: 162px;
  background-color: #f0f0f0;
  border-top: 1px solid #d8d8d8;
  padding: 0 16px;
}
.msg-box{
  height: calc(100% - 42px);
  display: flex;
  margin-bottom: 10px;
}
.msg-list{
  height: calc(100% - 199px);
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
  background-color: #f0f0f0;
  overflow: auto;
  padding: 5px 5px 5px 5px;
}
.send-area{
  height: 46px;
  width: 711px;
  position: absolute;
  bottom: 16px;
  display: flex;
  align-items: center;
}
.send-area a{
  text-align: right;
  flex: 1;
}
.el-input .el-input__inner{
  height: 106px;
}
.send-btn{
  margin-left: 10px;
  text-align: right;
  width: 80px;
}
.input-box{
  height: 106px;
  margin-top: 6px;
}
.left-imgs{
  margin-right: 8px;
  width: 42px;
  height: 42px;
  position: absolute;
  left: 40px;
  top: 9px;
}
.left-names{
  position: absolute;
  left: 100px;
}
.line{
  margin-bottom: 16px;
  min-height: 20px;
}
.friend{
  text-align: left;
  background-color: #afe1f7;
  border-radius: 2px;
  width: max-content;
  float: left;
  padding: 2px 6px;
}
.me{
  text-align: right;
  background-color: #afe1f7;
  width: max-content;
  float: right;
  border-radius: 2px;
  padding: 2px 6px;
}
</style>