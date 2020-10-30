const Mock = require('mockjs')
Mock.mock('/api/login','post', {
    "userInfo": { 
        username: Mock.Random.cname(),
        message: 'success',
        code: 0,
        uid: 123123
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