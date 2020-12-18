const { Random } = require('mockjs')
const Mock = require('mockjs')
Mock.mock('/api/login','post', {
    "userInfo": { 
        username: Mock.Random.cname(),
        message: 'success',
        code: 0,
        uid: 123123,
    }
})
Mock.mock('/api/register','post', {
    "registerInfo": { 
        message: 'success',
        code: 0,
        uid: 123123,
        username: Mock.Random.cname()
    }
})
Mock.mock('/api/saveResume', 'post', {
    "saveResult": {
        code: 0
    }
})
Mock.mock('/api/getComs','get',{
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
Mock.mock('/api/getShortResume','get',{
    data:
    [
        {id:0, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:1, coname:Random.cfirst(), progress: '已查看', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:2, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '实习',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},
        {id:3, coname:Random.cfirst(), progress: '待审核', jobname:Random.clast(), type: '校招',time:Random.datetime('yyyy-MM-dd HH:mm'), resumeid:Random.integer( 100,999 )},

    ]
})