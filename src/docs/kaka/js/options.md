<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/options.md
 * @Date: 2021-06-16 10:28:10
 * @LastEditTime: 2021-12-30 14:12:36
-->

# 如何避免 OPTIONS 请求? （文章 1）

## 减少 OPTIONS 请求

> 场景：在调用后端接口的时候会出现两次请求: `OPTIONS` 请求和 `GET` 请求。`OPTIONS` 请求耗费了一定的时间，需减少 `OPTIONS` 请求。

查找原因是浏览器对**简单跨域请求**和**复杂跨域请求**的处理区别。

`XMLHttpRequest` 会遵守同源策略(`same-origin policy`). 也即脚本只能访问相同协议/相同主机名/相同端口的资源, 如果要突破这个限制, 那就是所谓的跨域, 此时需要遵守跨域资源共享标准 `CORS`(`Cross-Origin Resource Sharing`)机制。

浏览器将 `CORS` 请求分为两类：`简单请求（simple request）`和`非简单请求（not-simple-request）`。

简单请求浏览器请求不会触发预检请求，而**非简单请求会触发预检请求**。这两种方式怎么区分？

同时满足下列条件，就属于`简单请求`，否则属于`非简单请求`[（参考 HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）

> - 1.请求方式只能是：`GET、POST、HEAD`
> - 2.HTTP 请求头限制这几种字段（不得人为设置该集合之外的其他首部字段）：
>   `Accept`、`Accept-Language`、`Content-Language`、`Content-Type（需要注意额外的限制）`、`DPR`、`Downlink`、`Save-Data`、`Viewport-Width`、`Width`
> - 3.`Content-type` 只能取：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
> - 4.请求中的任意 `XMLHttpRequestUpload` 对象均没有注册任何事件监听器: `XMLHttpRequestUpload` 对象可以使用 `XMLHttpRequest.upload` 属性访问。
> - 5.请求中没有使用 `ReadableStream` 对象。

> 非简单请求 会在正式通信之前，增加一次 `HTTP` 请求，称之为预检请求。浏览器会先发起 `OPTIONS` 方法到服务器，以获知服务器是否允许该实际请求。

由此可知，若要我们的请求满足简单请求就可以避免发起 `OPTIONS` 请求了。

但是

> - 1、我们系统请求中除了 `GET/POST` 还有 `PUT,DELETE`，不能满足
> - 2，我们系统有做业务模块权限，请求头里需要带有用户验证信息，第二点也不满足
> - 3，我们的 `Content-Type` 绝大多数是 `application/json`，还是不满足

然后只能寄希望于减少发起 `OPTIONS` 请求的次数，也就是说还是会用，但不是每次都用，查到的方法如下：

后端在请求的 **`返回头部`** 添加：

`Access-Control-Max-Age：（number）`数值代表 preflight request（预检请求）的返回结果（即 `Access-Control-Allow-Methods` 和 `Access-Control-Allow-Headers` 提供的信息） 可以被缓存多久，单位是秒。

例如：将预检请求的结果缓存 10 分钟：

`Access-Control-Max-Age: 600`

不同浏览器有不同的上限。在 Firefox 中，上限是 24h（即 86400 秒），而在 Chromium 中则是 10min（即 600 秒）。Chromium 同时规定了一个默认值 5 秒。
如果值为 -1，则表示禁用缓存，每一次请求都需要提供预检请求，即用 OPTIONS 请求进行检测。

Access-Control-Max-Age 方法对完全一样的 url 的缓存设置生效，多一个参数也视为不同 url。也就是说，如果设置了 10 分钟的缓存，在 10 分钟内，所有请求第一次会产生 options 请求，第二次以及第二次以后就只发送真正的请求了。

# 跨域避免 option 请求（文章 2）

## 个人观点

> 这种做法个人觉得也不太现实，因为肯定是要往请求头里添加东西的还有就是会修改`Content-Type`

## 最终解决方案

> 去除自定义 `header`,修改为简单请求，避免该请求发出预检。

## 思路过程

一般来说使用 `application/json` 的 `post` 请求是必然会带入 `OPTION` 请求，何为 `OPTION` 预检：

> 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 `OPTIONS` 方法，也可以对整站（通过将 URL 设置为“\*”）使用该方法。

在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 `Access-Control-Request-Method`首部字段告知服务器实际请求所使用的 HTTP 方法；`Access-Control-Request-Headers`首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

有趣的是专题详情为 `GET` 接口，为何 `GET` 请求也会发起 option 预检？

这个原因得从简单请求和复杂请求说起，跨域请求分为简单和复杂两种：

**简单请求:**

请求方式为如下之一：

> HEAD  
> GET  
> POST

HTTP 请求头只能包含如下信息：

> Accept  
> Accept-Language  
> Content-Language  
> Last-Event-ID  
> text/plain  
> Content-Type，但仅能是下列之一:

- **application/x-www-form-urlencoded**
- **multipart/form-data**

任何一个不满足上述要求的请求，即被认为是复杂请求。一个复杂请求不仅有包含通信内容的请求，同时也包含`预检信息`。

![OPTIONS请求](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/13_OPTIONS请求.png)

专题配置接口请求头中带有自定义 `header`,浏览器会认定为非简单请求，需要向服务器发出检查，判断该域名是否允许跨域。

经过分析发现，自定义 `header` 其实在此业务场景中非必传自带，发出预检请求至少会有 100ms 的耗时，无形中延长页面绘制时间。

[阅读原文·跨域避免 option 请求](https://mp.weixin.qq.com/s/6gtVR0nVNcZvREjwftZgzA)
