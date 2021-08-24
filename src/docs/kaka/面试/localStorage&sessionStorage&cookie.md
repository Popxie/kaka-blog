<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/localStorage&sessionStorage&cookie.md
 * @Date: 2021-08-24 17:07:30
 * @LastEditTime: 2021-08-24 17:18:11
-->

# localStorage，sessionStorage 和 cookie

## 0.cookie 相关链接

[把 cookie 聊清楚(cookied 有哪些属性)·掘金](https://juejin.im/post/59d1f59bf265da06700b0934)

[Chrome 新的 Cookie 策略 SameSite·知乎](https://zhuanlan.zhihu.com/p/103420328)

[Cookie 的 SameSite 属性·掘金](https://juejin.im/post/5e718ecc6fb9a07cda098c2d)

## 1.cookie 的 HttpOnly 属性

如果 `cookie` 中设置了 `HttpOnly` 属性，那么通过<span style='color: red'>js 脚本将无法读取到 `cookie` 信息，这样能有效的防止 `XSS` 攻击，窃取 cookie 内容</span>，这样就增加了 `cookie` 的安全性，即便是这样，也不要将重要信息存入 `cookie`。`XSS` 全称 `Cross SiteScrip`t，跨站脚本攻击，是 Web 程序中常见的漏洞，`XSS` 属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有 XSS 漏洞的网站中输入(传入)恶意的 HTML 代码，当其它用户浏览该网站时，这段 HTML 代码会自动执行，从而达到攻击的目的。如，盗取用户 Cookie、破坏页面结构、重定向到其它网站等。

## 2.localStorage，sessionStorage 和 cookie 区别

[关于 Cookie、session 和 Web Storage](https://juejin.im/post/5ad5b9116fb9a028e014fb19)  
[localStorage、sessionStorage、cookie、session 几种 web 数据存储方式对比总结](https://juejin.im/post/5dc2415e6fb9a04a5d586590)

> 共同点：都是保存在浏览器端、且同源的

- <span style='color: red'>数据存储方面</span>
  - **cookie 数据**始终在同源的 `http` 请求中携带（即使不需要），即 `cookie` 在浏览器和服务器间来回传递。`cookie` 数据还有路径（`path`）的概念，可以限制 `cookie` 只属于某个路径下
- <span style='color: red'>存储数据大小</span>
  - 存储大小限制也不同，`cookie` 数据不能超过 4K，同时因为每次 `http` 请求都会携带 `cookie`、所以 `cookie` 只适合保存很小的数据，如会话标识。
  - **`sessionStorage`** 和 **`localStorage`** 虽然也有存储大小的限制，但比 `cookie` 大得多，可以达到 5M 或更大
- <span style='color: red'>数据存储有效期</span>
  - **`sessionStorage`**：仅在当前浏览器窗口关闭之前有效
  - **`localStorage`**：始终有效，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据
  - **`cookie`**：只在设置的 `cookie` 过期时间之前有效，即使窗口关闭或浏览器关闭
- <span style='color: red'>作用域不同</span>
  - **`sessionStorage`**不在不同的浏览器窗口中共享，即使是同一个页面；
  - **`localStorage`**在所有<span style='color: red'>`同源窗口`</span>中都是共享的；也就是说只要浏览器不关闭，数据仍然存在
  - **`cookie`**: 也是在所有<span style='color: red'>`同源窗口`</span>中都是共享的.也就是说只要浏览器不关闭，数据仍然存在

> `Web Storage` 拥有 `setItem`、`getItem`、`removeItem`、`clear` 等方法，不像 `cookie` 需要自己封装 `setCookie`、`getCookie` 等方法

## 3.关于 cookie 的设置

> `cookie` 可以由`服务端`设置也可以由`客户端`设置

[HTTP 篇之 cookie 设置（前端和后台)](https://blog.csdn.net/cowshield/article/details/80841034)

前端代码：

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/list')
xhr.withCredentials = true
xhr.send()
```

`XMLHttpRequest` 发送请求时需要设置 `withCredentials` 属性为 `true`,来允许浏览器在自己的域设置 `cookie` 值。

如果 `withCredentials` 没有设置为 `true`，就会出现 `Response Headers` 有 `Set-Cookie`，但是浏览器却没有存储 `cookie` 的情况。

后端代码：

```js
response.setHeader('Access-Control-Allow-Credentials', true)
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342')
response.setHeader('Set-Cookie', 'token=cowId')
```

后台设置的 `Access-Control-Allow-Credentials` 和前台设置的 `withCredentials` 都为 `true` 的时候才会自动写到浏览器 `cookie` 里面

`Access-Control-Allow-Origin` 是允许跨源的，通常设置为'\*'。但是设置了 `Access-Control-Allow-Credentials` 后，就必须写跟 `Request Headers` 的 `Origin` 相同的地址了。

如下图所示：

![image](https://upload-images.jianshu.io/upload_images/12297114-d4c049031041fba1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
