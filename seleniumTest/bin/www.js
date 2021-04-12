const autoGetCourse = require('../app')
const CronJob = require('cron').CronJob
const {username, password} = require('../conf/config')

new CronJob('0/5 10 19 * * *',function(){
    autoGetCourse('username', 'password')
}, null, true, 'Asia/Shanghai')