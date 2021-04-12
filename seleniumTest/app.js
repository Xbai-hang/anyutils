/**
 * @file 这个文件用于csuft教务系统的模拟抢课,还有很多自定义的设置没有实现。
 * @author Xbai-hang <Xbai-hang@qq.com>
 * @version 1.0
 * @todo 有兴趣的话回来拓展:
 *      1.自定义选课参数
 *      2.点击 单选/复选框 甄别课程(冲突课程、已满课程)
 */

const { Builder, By, Key } = require("selenium-webdriver");
const fs = require('fs');

const jw_url = "http://authserver.csuft.edu.cn/authserver/login?service=http%3A%2F%2Fjwgl.csuft.edu.cn%2F";
const xkzx_url = "http://jwgl.csuft.edu.cn/jsxsd/xsxk/xklc_list?Ves632DSdyV=NEW_XSD_PYGL"
// const xk_url =  "http://jwgl.csuft.edu.cn/jsxsd/xsxk/xsxk_index?jx0502zbid=87EB1E70150D45DFA674B480907C1D46";
const pattern = new RegExp('选课成功')
const loginToXK = 'http://jwgl.csuft.edu.cn/jsxsd/xk/LoginToXk?method=jwxt&ticket=1ee50ec83e6dd6591b8f39489dd68299c9fd4e0b7e7886812bba0e4bb215743999e77197826d936e85072ba89e7788f78b30d61f36fd61b108fcaea84d88b4bf2f0efd3f7a76d589d0567a24b6808a7e'


/**
 * 将日志信息写入日志文件中
 * @param {string} logpath 待写入日志の路径
 * @param {string} str 待写入日志の文本
 * @param {function} callback 回调函数
 */
function writelog(logpath, str, callback) {
    const date = new Date() // .toLocaleString()
    fs.writeFileSync(logpath, `${date}: ${str}\n`, {
        encoding: 'utf-8',
        flag: 'a'
    })
    callback()
}

/**
 * selenium自动化执行抢课
 * @param {string} username 教务处账号
 * @param {string} password 教务处密码
 * @param {string} courseid 课程id
 * @example
 *      example('2019xxxx', '******')
 */
async function example(username, password, courseid) {
    let driver = await new Builder().forBrowser("chrome").build() // 以firefox浏览器为目标构建器
    try {
        // 打开教务处页面
        await driver.get(jw_url)

        // 输入账号密码
        await driver.findElement(By.id("username")).sendKeys(username)
        await driver.findElement(By.id("password")).sendKeys(password)
        
        // 触发enter键 执行登录
        await driver.findElement(By.className("auth_login_btn")).sendKeys(Key.ENTER)
        
        // 进入选课中心
        await driver.get(xkzx_url)

        // 跳转至选课页面
        // await driver.get(xk_url); (有局限性,不同学院的选课页面可能不同)
        await driver.findElement(By.linkText("进入选课")).click()
        await driver.findElement(By.xpath("/html/body/div[3]/div[2]/center/input")).click()
        // await driver.executeScript("xsxkOpen('87EB1E70150D45DFA674B480907C1D46')");

        // 由于打开了新的窗口,所以需要切换窗口定位
        windows = await driver.getAllWindowHandles()
        
        await driver.switchTo().window(windows[1])

        // 跳转至选课表单
        await driver.findElement(By.linkText("公选课选课")).click()

        // 定位到iframe
        // await driver.switchTo().iframe(await driver.findElement(By.xpath('//*[@id="mainFrame"]')));
        await driver.switchTo().frame(driver.findElement(By.id("mainFrame")))
        
        // 默认选择第一个课，这里需要拓展一个自定义选课参数
        const url = `location.href="javascript:xsxkFun(\'202020212011684\',\'256670C8274442B7B241CEBD6E3E18C3\',\'null\')"`
        await driver.executeScript(url)
        let Errorstr = ""
        while(true) {
            // 切换至alert并确定选课
            await (await driver.switchTo().alert()).accept()
            const context = await driver.switchTo().alert().getText()
            if (pattern.test(context) == true) {
                // 这里可以拓展选中课程的名称
                writelog('./log/success.log',`${context}`, function(){
                    console.log('选课成功~,可在./log/success.log中查看选中的课程')
                })
                break
            } else{
                example(username, password)
                Errorstr += `${Errorstr}${context}\n`
            }
        }
        if (Errorstr != "") {
            throw new Error(Errorstr)
        }
        // 退出iframe
        await driver.switchTo().defaultContent()
    } catch(err){
        writelog('./log/error.log', err.message, function(){
            console.log('选课失败,具体错误请前往日志文件./log/error.log查看')
        })
    } finally {
        // await driver.quit() // 退出浏览器
    }
}

module.exports = example