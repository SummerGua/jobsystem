const { Random } = require('mockjs')
const Mock = require('mockjs')
Mock.mock('/users/login','post', {
    "userInfo": {
        username: Mock.Random.cname(),
        message: 'success',
        code: 0,
        uid: 123123,
        isStu: 1
    }
})
Mock.mock('/user/signup','post', {
    "signupInfo": { 
        message: 'success',
        code: 0,
        uid: 123123,
        username: Mock.Random.cname()
    }
})        
Mock.mock('/users/saveResume', 'post', {
    "saveResult": {
        code: 0
    }
})
Mock.mock('/public/getComs','get',{
    data:
        [
            {id:0,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:1,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:2,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.first()},
            {id:3,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:4,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.first()},
            {id:5,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:6,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:7,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:8,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.first()},
            {id:9,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
            {id:10,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.first()},
            {id:11,src:Random.image('80x80'),info:Random.cparagraph(1),name:Random.cfirst()},
    ],
    max:12
})
Mock.mock('/users/getShortResume','get',{
    data:
    [
        {id:0, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:1, coname:Random.cfirst(), progress: '已查看', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:2, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:3, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '校招',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},

    ],
    datatwo:
    [
        {id:0, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '社招',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:1, coname:Random.cfirst(), progress: '已查看', jobname:Random.clast(), type: '社招',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
    ]
})

//获取聊天列表近期消息下的头像和名字
Mock.mock('/users/getMessageSenders','get',{
    data:
    [
        {
            id:0, src:Random.image('42x42'),name:Random.cname()
        },
        {
            id:1, src:Random.image('42x42'),name:Random.cname()
        },
        {
            id:2, src:Random.image('42x42'),name:Random.cname()
        }
    ]
})

//发送消息
Mock.mock('/users/sendMessage','post',{
    data:
        {
            state: 'ok'
        }
})

//公司看的简历
Mock.mock('/api/getReceivedResumes','get',{
    data:
    {
        name: '舒某某',
        age: 22,
        xueli: '本科',
        education: '2018-2022 CQUPT 通信工程专业',
        schexp: '参加了xxxxxx',
        city:'北京',
        job: '前端工程师',
        proexp: '太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了太多了',
        awards: '国家奖学金*4',
        skills: 'CET-4 CET-6',
        evaluation: '太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了太优秀了上进心强'
    }
})