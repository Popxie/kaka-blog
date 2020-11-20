<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/event-loop.md
 * @Date: 2021-06-11 17:27:42
 * @LastEditTime: 2021-06-11 17:30:41
-->

# JS 事件循环机制（event loop）之宏任务/微任务

除了我们的主线程之外，任务队列分为 microtask 和 macrotask，通常我们会称之为微任务和宏任务。

js 中存在宏任务和微任务，js 的执行顺序是 一个宏任务执行结束之后才会去执行下一个宏任务，微任务是在本宏任务的主要的任务结束之后，再去执行微任务，当所有的微任务结束之后，这个宏任务也就算执行结束了，值的注意的是，script 就是一个大的宏任务

| 宏任务 macrotask | 微任务 microtasks          |
| ---------------- | -------------------------- |
| srcipt           | process.nextTick           |
| setTimeout       | Promise.then catch finally |
| setInterval      | MutationObserver           |
| setImmediate     |

> await 阻塞后面的代码执行，因此跳出 async 函数执行下一个微任务

```js
console.log('script start')
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}
async1()
new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})
// 结果：
// script start
// async1 start
// async2
// promise1
// async1 end
// promise2
```

```js
setTimeout(function() {
  console.log(1)
})

Promise.resolve(function(){
    console.log(2) // 只是往resolve函数中传了一个匿名函数，并没有执行，所以不会打印
})

new Promise(function(resolve){
  console.log(3);
  resolve();
}).then(function(){
  console.log(4)
})
console.log(5)
// 答案： 3，5，4，1

====== 分割线 =====

Promise.resolve(function(){
  console.log(2)
})
// 等价于
new Promise(function (resolve, reject) {
    resolve(() => console.log('2'))
})
// 如果想执行输出2：
new Promise(function (resolve, reject) {
  resolve(() => console.log('2'))
}).then( fn => fn())
```

![image](https://upload-images.jianshu.io/upload_images/12297114-6310727e82b091cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[阅读原文](https://juejin.im/post/5b498d245188251b193d4059)
