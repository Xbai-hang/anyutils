# query empty classroom

---

 利用`JSON.parse()`方法将`JSON`对象转为`JavaScript`对象，此对象键`0~19`分别对应`1~20`周的课程，值则是对应周的所有空教室信息；是一个三重数组，传入三个参数`week_ID`、`day_ID`、`time_ID`分别对应周次、星期和上课时间；

---

**Warnings：**The incoming parameters must be legal without exception handling (lazy ~); in addition, the relative path used, do not change the path / name of the data file;

## `params`

1. `build_ID`：1~5，The name of the corresponding teaching building is as follows:
   - `1`：树人楼(一教)
   - `2`：德润楼(国际)
   - `3`：诚意楼(七教)
   - `4`：博文楼(文综)
   - `5`：博明楼(五教)
2. `week_ID`：1~20
3. `day_ID`：1~7
4. `time_ID`：1~6，The corresponding time period is as follows
   - `8:00 ~ 9:40`
   - `9:55 ~ 11:35`
   - `14:00 ~ 15:40`
   - `15:55 ~ 17:35`
   - `19:00 ~ 20:40`
   - `20:55 ~ 22:35`

## Return

1. `String`：string

---

## Test Screen

![Test](https://i.loli.net/2020/11/17/dzb7KZ6VXQHyMRY.png)
