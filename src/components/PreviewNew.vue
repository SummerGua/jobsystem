<template>
  <div class="content">
    <el-button class="btn" type="success" @click="realDown">下载</el-button>
    <div class="detail">
      <div class="name">{{ form.name }}</div>
    <div class="item sex">{{ form.realSex[form.sex] }}</div>
    <div class="item bir">生日：{{ form.birthday }}</div>
    <div class="item diploma">{{ form.diploma  }}</div>
    <div class="clear contact">
      <div class="item tele">{{ form.tele }}</div>
      <div class="item email">{{ form.email }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">求职意向</div>
    <div class="want">
      <div class="item want-city">{{ form.city }}</div>
      <div class="item want-job">{{ form.job }}</div>
      <div class="item want-salary" v-if="options[form.salary-1]">{{ options[form.salary-1].salary }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">教育经历</div>
    <div class="edu-exp" v-for="(item,index) in form.eduinfo" :key="index">
      <div class="item bold edu-schoolname">{{ item.name }}</div>
      <div class="item bold edu-time">时间：{{ item.lasttime }}</div>
      <div class="item bold edu-degree">{{ item.degree }}</div>
      <div class="item bold edu-rank">成绩：{{ item.rank }}</div>
      <div class="item clear info">{{ item.info }}</div>
      <div class="clear"></div>
    </div>

    <div class="title">项目经历</div>
    <div class="pro-exp" v-for="(item, index) in form.project" :key="index+'exp'">
      <div class="item bold pro-name">{{ item.name }}</div>
      <div class="item bold pro-time">{{ item.time }}</div>
      <div class="info clear">{{ item.info }}</div>
    </div>

    <div class="title">工作经历</div>
    <div class="work-exp" v-for="(item, index) in form.workExp" :key="index+'w'">
      <div class="item bold work-name">{{ item.name }}</div>
      <div class="item bold work-time">{{ item.time }}</div>
      <div class="clear info">{{ item.info }}</div>
    </div>

    <div class="title">个人技能</div>
    <div class="skills">{{ form.skill }}</div>

    <div class="title">自我评价</div>
    <div class="evaluation">{{ form.evaluation }}</div>
    </div>

  </div>
</template>

<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'


export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    noPre(){
      this.$emit('close')
    },
    download(ele, pdfName){
      let eleW = ele.offsetWidth
      let eleH = ele.offsetHeight
      let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
      let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离
      var canvas = document.createElement("canvas");
    var abs = 0;

    let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
    let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

    if(win_out>win_in){
        abs = (win_out - win_in)/2;    // 获得滚动条宽度的一半
    }

    canvas.width = eleW * 2;    // 将画布宽&&高放大两倍
    canvas.height = eleH * 2;




    var context = canvas.getContext("2d");

    context.scale(2, 2);

    context.translate(-eleOffsetLeft -abs, -eleOffsetTop);
    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
    // translate的时候，要把这个差值去掉

    // html2canvas(element).then( (canvas)=>{ //报错
    // html2canvas(element[0]).then( (canvas)=>{
    html2canvas(ele, {
      scale: 4,
      dpi: 400,
      // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
      useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
    } ).then( (canvas)=>{
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28/contentWidth * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
        }else {    // 分页
          while(leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if(leftHeight > 0) {
                pdf.addPage();
            }
          }
        }
        //可动态生成
        pdf.save(pdfName);
    })
    },
    realDown(){
      this.download(document.querySelector('.detail'),this.form.name)
    }
  },
  mounted(){
    console.log(this.form.project)
  }
}
</script>
<style scoped>
.content{
  background-color: white;
  width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 40px 20px;
}
.btn{
  float: right;
  width: 120px;
  height: 40px;
}
.name{
  font-size: 45px;
  margin-bottom: 16px;
}
.title{
  font-size: 30px;
  margin: 10px 0;
  border-top: 1px solid silver;
}
.item{
  float: left;
  margin-right: 20px;
  vertical-align: bottom;
}
.clear{
  clear: both;
}

.info{
  margin-top: 6px;
  margin-bottom: 10px;
}
.bold{
  font-weight: bold;
}
</style>