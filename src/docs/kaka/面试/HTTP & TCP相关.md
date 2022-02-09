<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/HTTP & TCP相关.md
 * @Date: 2022-02-06 14:02:51
 * @LastEditTime: 2022-02-08 15:17:18
-->

# HTTP & TCP 相关

## 相关参考

- [一个故事讲完 https·微信公众号](https://mp.weixin.qq.com/s/StqqafHePlBkWAPQZg3NrA)

- [Http2.0 的一些思考以及 Http3.0 的优势·csdn](https://blog.csdn.net/m0_60360320/article/details/119812431)

## 1.较 http1.0,http2.0,http3.0 有哪些区别

> http1.0,http2.0 是在 TCP 的基础之上，http3.0 是基于 UDP 之上

### http2.0

- 二进制分帧

- 多路复用

- 头部压缩

- 请求优先级

- 服务器推送

### http3.0

- 连接迁移

- 无队头阻塞

- 自定义拥塞控制

- 前向纠错

## 2.一次完整的 HTTP 事务流程

- （1）DNS 域名解析

- （2）发起 TCP 的三次握手（tcp 连接）

  - 1.主机向服务器发送一个建立连接的请求（您好，我想认识您）；

  - 2.服务器接到请求后发送同意连接的信号（好的，很高兴认识您）；

  - 3.主机接到同意连接的信号后，再次向服务器发送了确认信号（我也很高兴认识您），自此，主机与服务器两者建立了连接。

- （3）建立 TCP 连接后发起 http 请求

- （4）服务器响应 http 请求，浏览器得到 HTML 代码

- （5）浏览器解析 HTML 代码，并请求 HTML 代码中的资源

- （6）浏览器对页面进行渲染呈现给用户

- （7）连接结束(四次挥手)

## 3.http 与 https 的区别

- HTTPS 协议需要到 CA（证书颁发机构）申请证书，一般免费证书很少，需要交费。

- HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，HTTPS 运行在 SSL/TLS 之上，SSL/TLS 运行在 TCP 之上，所有传输的内容都经过加密的。

- HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。

- http 的连接很简单，是无状态的；HTTPS 协议是由 HTTP+SSL 协议构建的可进行加密传输、身份认证的网络协议，可以有效的防止运营商劫持，解决了防劫持的一个大问题，比 http 协议安全。[阅读原文·掘金](https://juejin.im/post/5cd0438c6fb9a031ec6d3ab2)

---

## [4.OSI 7层模型和TCP/IP 4层模型·知乎](https://zhuanlan.zhihu.com/p/32059190)

- 哪七层, 哪四层

  ![七层网络模型](https://user-images.githubusercontent.com/24952644/152928629-f86894dc-6502-4f97-9f2d-99728fe94560.jpeg)

- OSI模型各层的基本作用

  ![OSI模型各层的基本作用](https://user-images.githubusercontent.com/24952644/152929186-a594b508-bda5-40b8-be32-4c5c2033dd84.jpeg)

## 5.TCP/IP 协议族

TCP/IP 协议族是 Internet 最基本的协议，HTTP 协议是它的一个子集。**TCP/IP 协议族**按层次分为以下**四层**

- 应用层

- ~~安全层~~（TSL or SSL, https 对应才有）

- 传输层

  - 在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和 UDP（User Data Protocol，用户数据报协议）。

  - TCP 协议是全双工的，即发送数据和接收数据是同步进行的，就好像我们打电话一样，说话的同时也能听见。TCP 协议在建立和断开连接时有三次握手和四次挥手，因此在传输的过程中更稳定可靠但同时就没 UDP 那么高效了。

  - UDP 协议是面向无连接的，也就是说在正式传递数据之前不需要先建立连接。UDP 协议不保证有序且不丢失的传递到对端，也就是说不够稳定，但也正因如此，UDP 协议比 TCP 更加高效和轻便。

- 网络层

- 数据链路层

![tcp.jpg](https://user-images.githubusercontent.com/24952644/152668846-1a38ffdb-c76e-486a-82f6-57c56c2a43a1.jpeg)

---

## 代码标识

- ACK：确认标志

- FIN：结束标志

- SYN：同步标志

- PSH：推标志

- URG：紧急标

## 三次握手

- 第一次握手：客户端给服务器发送一个 SYN 报文。

- 第二次握手：服务器收到 SYN 报文之后，会应答一个 SYN+ACK 报文。

- 第三次握手：客户端收到 SYN+ACK 报文之后，会回应一个 ACK 报文。

- 服务器收到 ACK 报文之后，三次握手建立完成。

<!--gif无法通过一般的控制图片大小来控制-->
<img src='https://user-images.githubusercontent.com/24952644/152668946-a5bdff82-3ebc-4713-b383-32226b70d44f.gif' width='400'>

<img src='https://user-images.githubusercontent.com/24952644/152668947-243e7f5c-f4cb-4aee-9c80-1b45d742f6c4.gif' width='400'>

## 四次挥手

- 客户端发出断开连接的请求

- 服务端确认收到

- 服务端发出断开连接请求

- 客户端确认收到

### **四次挥手详情**

- 1、第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态。

- 2、第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 + 1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态。

- 3、第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。

- 4、第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 + 1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态

- 5、服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。

  ![四次挥手](https://user-images.githubusercontent.com/24952644/152668902-71fbbfa3-55cc-4737-a484-a93fce62937e.png)

### seq 序列（Sequence）

<img src='https://user-images.githubusercontent.com/24952644/152668919-7a64cb3e-8bd3-41b5-a46d-d0eab2d4eb06.png' width='400'>

## 相关参考

- [关于三次握手与四次挥手面试官想考我们什么？·掘金](https://juejin.im/post/5ccd0dfc6fb9a0324a08bb73#comment)

- [跟着动画来学习 TCP 三次握手和四次挥手·掘金](https://juejin.im/post/5b29d2c4e51d4558b80b1d8c)
