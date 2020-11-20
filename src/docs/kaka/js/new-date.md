<!--
 * @Description: JavaScript文件夹：时间日期 new Date()
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/new-date.md
 * @Date: 2021-06-17 19:36:21
 * @LastEditTime: 2021-06-17 19:37:10
-->

# 时间日期 new Date()

```js
// eg:
const date = new Date()
const year = date.getFullYear() // 2019
const month = date.getMonth + 1 // (0 ~ 11)
const day = date.getDate() // 获取当月中的某一天
```

## new Date().xxx()

```js
getDate()     // 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
getDay()      // 从 Date 对象返回一周中的某一天 (0 ~ 6)。
getMonth()    // 从 Date 对象返回月份 (0 ~ 11)。
getFullYear() // 从 Date 对象以四位数字返回年份。
getYear()     // 请使用 getFullYear() 方法代替。
getHours()    // 返回 Date 对象的小时 (0 ~ 23)。
getMinutes()  // 返回 Date 对象的分钟 (0 ~ 59)。
getSeconds()  // 返回 Date 对象的秒数 (0 ~ 59)。
getMilliseconds()   // 返回 Date 对象的毫秒(0 ~ 999)。
getTime()           // 返回 1970 年 1 月 1 日至今的毫秒数。
getTimezoneOffset() // 返回本地时间与格林威治标准时间 (GMT) 的分钟差。
getUTCDate()        // 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
getUTCDay()       // 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
getUTCMonth()     // 根据世界时从 Date 对象返回月份 (0 ~ 11)。
getUTCFullYear()  // 根据世界时从 Date 对象返回四位数的年份。
getUTCHours()     // 根据世界时返回 Date 对象的小时 (0 ~ 23)。
getUTCMinutes()   // 根据世界时返回 Date 对象的分钟 (0 ~ 59)。
getUTCSeconds()   // 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
getUTCMilliseconds() // 根据世界时返回 Date 对象的毫秒(0 ~ 999)。
parse()       // 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
setDate()     // 设置 Date 对象中月的某一天 (1 ~ 31)。
setMonth()    // 设置 Date 对象中月份 (0 ~ 11)。
setFullYear() // 设置 Date 对象中的年份（四位数字）。
setYear()     // 请使用 setFullYear() 方法代替。
setHours()    // 设置 Date 对象中的小时 (0 ~ 23)。
setMinutes()  // 设置 Date 对象中的分钟 (0 ~ 59)。
setSeconds()  // 设置 Date 对象中的秒钟 (0 ~ 59)。
setMilliseconds() // 设置 Date 对象中的毫秒 (0 ~ 999)。
setTime()         // 以毫秒设置 Date 对象。
setUTCDate()      // 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
setUTCMonth()     // 根据世界时设置 Date 对象中的月份 (0 ~ 11)。
setUTCFullYear()  // 根据世界时设置 Date 对象中的年份（四位数字）。
setUTCHours()     // 根据世界时设置 Date 对象中的小时 (0 ~ 23)。
setUTCMinutes()   // 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
setUTCSeconds()   // 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
setUTCMilliseconds() // 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
toSource()      // 返回该对象的源代码。
toString()      // 把 Date 对象转换为字符串。
toTimeString()  // 把 Date 对象的时间部分转换为字符串。
toDateString()  // 把 Date 对象的日期部分转换为字符串。
toGMTString()   // 请使用 toUTCString() 方法代替。 1 3
toUTCString()   // 根据世界时，把 Date 对象转换为字符串。
toLocaleString()      // 根据本地时间格式，把 Date 对象转换为字符串。
toLocaleTimeString()  // 根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleDateString()  // 根据本地时间格式，把 Date 对象的日期部分转换为字符串。
UTC()       // 根据世界时返回 1997 年 1 月 1 日 到指定日期的毫秒数。
valueOf()   // 返回 Date 对象的原始值。
```

[day.js 官网](https://day.js.org/docs/zh-CN/get-set/get-set)

---

## 时间戳转年与日时分秒

```js
function timeStamp2String(timeStamp) {
  let datetime = new Date()
  datetime.setTime(timeStamp)
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1
  const date = datetime.getDate()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const second = datetime.getSeconds()
  const mseconds = datetime.getMilliseconds()
  const res = `${year}-${month}-${date} ${hour}:${minute}:${second}${mseconds}`
  return res
}
const timeStamp = 1560855562536
timeStamp2String(timeStamp) // 2019-6-18 18:59:22:536
```

## 获取当前月低的时间戳

```js
function getLastDayTimeOnCurrentMonth(currentTime) {
  const nowDate = new Date(currentTime)
  const cloneNowDate = new Date(currentTime)
  const fullYear = nowDate.getFullYear()
  const month = nowDate.getMonth() + 1 // getMonth 方法返回 0-11，代表1-12月
  const endOfMonth = new Date(fullYear, month, 0).getDate() // 获取本月最后一天
  const date = nowDate.getDate() // 获取当月中的某一天

  // 获取完整格式 年月日 时分秒
  function getFullDate(targetDate) {
    var D, y, m, d
    if (targetDate) {
      D = new Date(targetDate)
      y = D.getFullYear()
      m = D.getMonth() + 1
      d = D.getDate()
    } else {
      y = fullYear
      m = month
      d = date
    }
    m = m > 9 ? m : '0' + m
    d = d > 9 ? d : '0' + d
    return y + '/' + m + '/' + d + ' ' + '23:59:59'
  }

  // console.log('lastDay:', moment(new Date(getFullDate(cloneNowDate.setDate(endOfMonth))).getTime()).format('YYYY-MM-DD HH:mm:ss'))

  return new Date(getFullDate(cloneNowDate.setDate(endOfMonth))).getTime()
}
```

## 格林威治（GMT）标准时间 转换成正常日期

```js
// GMT格式: Thu Sep 03 2020 16:55:59 GMT+0800 (中国标准时间)
function GMTToStr(time) {
  let date = new Date(time)
  let Str =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  return Str
}

GMTToStr(new Date()) // xxxx-yy-zzz HH:mm:ss
GMTToStr('Thu Sep 03 2020 16:55:59 GMT+0800 (中国标准时间)') // 2020-9-3 16:55:59
```

## 自定义格式化时间

```js
const formatter = new Intl.DateTimeFormat('locales', {
  year: 'numeric',
  month: 'numeric', // long
  day: 'numeric',
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  formatMatcher: 'best fit' // basic, best fit
  // fractionalSecondDigits: 3, // 毫秒
  // weekday: 'long'
})

// month: 'numeric' => 2020/12/7 17:42:24
// month: 'long' => 2020年12月7日 17:44:59
formatter.format(new Date())
```

详情请看一下链接

[Intl.DateTimeFormat_cn·MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

[Intl.DateTimeFormat_en·MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
