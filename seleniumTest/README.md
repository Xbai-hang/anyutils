# csuft-autoCatchCourse
自动填写账号密码实现抢课,可以设置 Cron 定时启动

## Cron

执行时间为每天早上10点00分00秒の执行语句为:

```shell
'0 0 10 * * *'
```



## Test
```bash
npm install
npm run dev
```

## About

借助`selenium`完成的最基础的自动化，类似于半学半练习的状态，仅用了作者本人的账号进行了测试，不保证所有人都适用。

0基础小白暂时无法使用，需要获取课程相关参数并修改原代码

`app.js`中76行的源代码

