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
        <div v-cloak v-for="(item) in nameList" :key="item.id" :class="{active:item.id===isActive}" @click="changeClass(item.id);getMessage(item.uid,item.id)" class="list-item">
          <div class="left-imgs">
            <img :src="item.pic">
          </div>
          <a v-if="item.realName" class="left-names">
            {{ item.realName }}
          </a>
        </div>
        </div>
        <div class="right">
          <div class="msg-title">
            <span>{{isActive}}</span>
          </div>
          <!-- 聊天内容 -->
          <div ref="win" class="msg-list">
            <div v-if="texts[isActive]">
            <div v-for="(text,index) in texts[isActive]" :key="index">
              <div class="line" v-if="!text.mine">
                <div class="friend">{{text.content}}</div>
                <div class="uptimeL">{{text.upTime}}</div>
                </div>
              <div class="line" v-else>
                <div class="me">{{text.content}}</div>
                <div class="uptimeR">{{text.upTime}}</div>
              </div>
            </div>
          </div>
          </div>

          <div class="send-box">
            <div class="input-box">
              <textarea class="input" v-model="toSendMes[isActive]" placeholder="回复一下吧">
              </textarea>
            </div>
            <div class="send-area">
              <a>{{ inputLength }}/200</a>
              <el-button @click="sendMessages" class="send-btn">发送</el-button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  </div>

</template>
<script>
import {getMessageSenders, sendMessage} from '../plugins/request'
export default {
  data(){
    return{
      nameList: [],
      isActive: 0,
      toSendMes: [''],
      texts:['']
    }
  },
  methods: {
    changeClass(i){
      this.isActive = i
    },
    getMessage(uid,id){
      this.$http.post('/users/getMessage', {hisuid:uid}).then(
        data=>{
          let messages = data.data.data
          if(data.data.code==0){
            for(let i=0;i<messages.length;i++){
            let myuid = sessionStorage.getItem('uid')
            if(messages[i].time){
              messages[i].time = messages[i].time.split('.')[0]
              messages[i].time = messages[i].time.replace('T', ' ')
            }
            if(messages[i].fromUid==myuid){
              this.$set(this.texts[id],i,{
                  mine: 1,
                  content: messages[i].message,
                  upTime: messages[i].time
              })
            }else{
              this.$set(this.texts[id],i,{
                  mine: 0,
                  content: messages[i].message,
                  upTime: messages[i].time
              })
            }
          }
          }
        }
      )
    },
    sendMessages(){
      if(this.nameList.length == 0) return false
      if(this.toSendMes[this.isActive].split(' ').join('') !== ""
      &&
      this.toSendMes[this.isActive].split('\n').join('')!==""){
        let req={}
        if(this.nameList[this.isActive].uid){
          req = {
            toUid: this.nameList[this.isActive].uid,
            message: this.toSendMes[this.isActive]
          }
        }
        sendMessage(req).then(res => {
          if(res.code==0) this.$message.success('发送成功')
        })
        let time = new Date()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hour = time.getHours()
        let min = time.getMinutes()
        let sec = time.getSeconds()
        if(month.toString().length<2) month = 0+''+month
        if(day.toString().length<2) day = 0+''+day
        if(hour.toString().length<2) hour = 0+''+hour
        if(min.toString().length<2) min = 0+''+min
        if(sec.toString().length<2) sec = 0+''+sec
        this.texts[this.isActive].push(
          {
            mine:1,
            content:this.toSendMes[this.isActive],
            upTime: time.getFullYear()+'-'+month+'-'+day+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
          }
        )
        this.$set(this.toSendMes,this.isActive,'') // 输入框清空
      }else{
        alert("输入为空无法发送")
      }
    }
  },
  beforeCreate(){
    getMessageSenders().then(res=>{
      this.texts = []
      this.toSendMes = []
      if(res.data.code==0){
        for(let i=0;i<res.data.data.length;i++){
          this.$set(this.nameList,i,{
              id: i,
              pic: res.data.data[i].pic,
              realName: res.data.data[i].realName,
              uid: res.data.data[i].uid
            })
          this.$set(this.texts,i,[])
          this.$set(this.toSendMes,i,'')
        }
        
        
        
      }
    }).catch(err=>{
      alert("获取聊天失败"+err)
    })
  },
  mounted(){
    setTimeout(() => {
      if(this.nameList[0]){
        this.getMessage(this.nameList[0].uid, 0)
      }
    }, 50)
  },
  updated(){
    this.$refs.win.scrollTop = this.$refs.win.scrollHeight
  },
  computed:{
    inputLength: function(){
      return this.toSendMes[this.isActive]?this.toSendMes[this.isActive].length : 0
    }
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
  box-shadow: 0 2px 4px 0 rgb(121 146 185 / 54%);
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
  display: flex;
  align-items: center;
}
.send-area a{
  text-align: right;
  flex: 1;
}
.send-btn{
  margin-left: 10px;
  text-align: right;
  width: 70px;
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
.uptimeL{
  font-size: 6px;
  float: left;
}
.uptimeR{
  float: right;
  font-size: 6px;
}
.me{
  text-align: right;
  background-color: #afe1f7;
  width: max-content;
  float: right;
  border-radius: 2px;
  padding: 2px 6px;
}
.input{
  width: 100%;
  height: 90px;
  resize: none;
}
</style>