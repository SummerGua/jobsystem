<template>
  <div>
    <div class="container">
      <div class="side-bar">
        <div class="title">消息中心</div>
        <ul>
          <li class="font-active">我的消息</li>
          <li>收到的赞</li>
          <li>回复我的</li>
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
          <div v-for="item in nameList" :key="item.id" :class="{active:item.id===isActive}" @click="changeClass(item.id)" class="list-item">
            {{ item.name }}
          </div>
          </div>
          <div class="right">
            <div class="msg-title"><span>{{nameList[0].name}}</span></div>
            <div class="msg-list"></div>
            <div class="send-box"></div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import {getOthersName} from '../plugins/request'
export default {
  data(){
    return{
      nameList: [
        {id:0,name: 'aaa'},
        {id:1,name: 'bbb'},
        {id:2,name: 'ccc'},
        {id:3,name: 'ddd'},
        {id:4,name: 'ddd'},
        {id:5,name: 'ddd'},
        {id:6,name: 'ddd'},
        {id:7,name: 'ddd'},
        {id:8,name: 'ddd'},
        {id:9,name: 'ddd'},
        {id:10,name: 'ddd'},
        {id:11,name: 'ddd'},
        {id:12,name: 'ddd'},
      ],
      isActive: 0,
    }
  },
  methods: {
    changeClass(ind){
      this.isActive = ind
    },
    getOthersName(){
      getOthersName.then(res=>{
        if(res.data){
          this.nameList = res.data.namelist
        }
      }).catch(err=>{
        alert("获取聊天列表失败"+err)
      })
    }
  }
}
</script>
<style scoped>
.container{
  max-width: 1143px;
  margin: 0 auto;
  display: flex;
  font-weight: 700;
  height: calc(100vh - 49px);
  color: #666;
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
}
.list-item:hover{
  cursor: pointer;
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
}
.msg-box{
  height: calc(100% - 42px);
  display: flex;
}
.msg-list{
  height: calc(100% - 199px);
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
  background-color: #f0f0f0;
}
</style>