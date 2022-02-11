<!--
 * @Description: js文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/async await & promise的区别.md
 * @Date: 2022-02-09 19:33:35
 * @LastEditTime: 2022-02-09 19:49:06
-->

# async await & Promise的区别

- Promise链式调用相当于一个回调地狱,也不能统一处理异常。

- Async Await用同步的写法使得可读性更强，同时方便try  catch捕获异常。

- Promise本身是同步函数，多个不会等待

- Async Await有明确的前后关系，可读性好

- promise和async await都是解决回调地狱的方法，

- promise是纵向发展形成回调链，遇到复杂的情景不美观

- Async Await是基于promise实现，是改良版的promise，使代码看起来更加简洁，异步代码执行像同步代码一样

## 参考

[promise与async-await有什么区别·CSDN](https://blog.csdn.net/weixin_48181168/article/details/120384814)

[async/await和Promise区别·知乎](https://zhuanlan.zhihu.com/p/147184746)