<template>
  <div class="resume-form">
    <div class="title">
      <h1>编辑简历</h1>
      <div class="name">
        <el-input placeholder="姓名" v-model="name" clearable></el-input>
      </div>
      <div class="tele">
        <el-input placeholder="电话" v-model="tele" clearable></el-input>
      </div>
      <div class="email">
        <el-input placeholder="电子邮件" v-model="email" clearable></el-input>
      </div>
      <div class="sex">
        性别：
        <el-radio class="man" v-model="male" label="1" border>男</el-radio>
        <el-radio v-model="male" label="2" border>女</el-radio>
      </div>
      <div class="birthday">
        生日：
         <el-date-picker v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <div class="money">
        <el-select v-model="salary" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.salary" :value="item.salary"></el-option>
        </el-select>
      </div>
      <div class="city">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResumeForm",
  data() {
    return {
      male: "",
      name: "",
      birthday: "",
      tele: "",
      email: "",
      options: [
        {value: '1',salary: '1k'}, {value: '2',salary: '2k'}, 
        {value: '3',salary: '3k'}, {value: '4',salary: '4k'}, 
        {value: '5',salary: '5k'},{value: '6',salary: '6k'},
        {value: '7',salary: '7k'},{value: '8',salary: '8k'},
        {value: '9',salary: '9k'},{value: '10',salary: '10k'},
        {value: '11',salary: '11k'},{value: '12',salary: '12k'},
        {value: '13',salary: '13k'},{value: '14',salary: '14k'},
        {value: '15',salary: '15k'},{value: '16',salary: '16k'},
        {value: '17',salary: '17k'},{value: '18',salary: '18k'},
        {value: '19',salary: '19k'},{value: '20',salary: '20k'},
        {value: '21',salary: '21k+'}
        ],
      salary: ''
    };
  },
  methods: {},
};
</script>
<style scoped>
h1{
  width: 160px;
}
.resume-form {
  border: 2px solid #409EFF;
  border-radius: 20px;
  width: 1184px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
.title {
  margin-left: 20px;
  width: 160px;
  height: 60px;
  float: left;
}

.sex{
  height: 42px;
  width: 260px;
  position: absolute;
  left: 500px;
  height: 30px;
}
.man{
  margin-right : 0;
}
.name{
  width: 200px;
  position: absolute;
  left: 300px;
  height: 30px;
}
</style>