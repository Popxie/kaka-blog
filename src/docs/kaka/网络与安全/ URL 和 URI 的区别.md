<!--
 * @Description: 网络与安全文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/网络与安全/ URL 和 URI 的区别.md
 * @Date: 2021-09-03 10:32:40
 * @LastEditTime: 2021-09-03 11:00:16
-->

# URL 和 URI 的区别

## 一、URI-统一资源标识符

`URI` 全称 Uniform Resource Identifier,指的是统一资源标识符，用来标识唯一的资源。

Web 上可用的每种资源-HTML 文档、图像、视频片段、程序等都由一个通用资源标识符(即 URI)进行定位。

URI 一般由三部分组成：

- 1.访问资源的命名机制
- 2.存放资源的主机名
- 3.资源自身的名称，由路径表示

看个例子：`http://www.xxx.com/html/html4`

这个 URI 是这样的：这是一个通过 HTTP 协议访问的资源，位于 `www.xxx.com` 上，通过路径"/html/html4"访问。

有的 URI 指向一个资源的内部。这种 URi 以"#"结束，并跟着一个 anchor 标识符（称为片段标识符）。例如，下面是一个指向 section_2 的 URI：`http://somesite.com/html/top.htm#section_2`

### 1.1 绝对 URI

URI 有绝对和相对之分，绝对的 URI 指以 scheme（后面跟着冒号）开头的 URI。前面提到的`http://www.cnn.com` 就是绝对的 URI 的一个例子，其它的例子还有`mailto:jeff@javajeff.com`、`news:comp.lang.java.help`和`xyz://whatever`。你可以把绝对的 URI 看作是以某种方式引用某种资源，而这种方式对标识符出现的环境没有依赖。如果使用文件系统作类比，绝对的 URI 类似于从根目录开始的某个文件的径。

### 1.2 相对 URI

相对 URI 不包含任何命名规范信息。它的路径通常指同一台机器上的资源。相对 URI 可能含有相对路径（如，".."表示上一层路径），还可能包含片段标识符。比如看下面的例子：

- 相对 URI：
  - `suppliers.html`
  - 它扩展成完全的 URI 就是 `http://www.xxx.com/suppliers.htm`
- 一个图形的相对 URI
  - `<img src="../icons/logo.png" alt="logo">`
  - 它扩展成完全的 URI 就是`http://www.xxx.com/icons/logo.png`

与绝对的 URI 不同的，相对的 URI 不是以 scheme（后面跟着冒号）开始的 `URI`。 它的一个例子是 `articles/articles.html`。你可以把相对的 URI 看作是以某种方式引用某种资源，而这种方式依赖于标识符出现的环境。如果用文件系统作类比，相对的 URI 类似于从当前目录开始的文件路径。

### 1.3 URI 的用途

在 HTML 中，URI 被用来：

- 1.链接到另一个文档或资源
- 2.链接到一个外部样式表或脚本
- 3.在页内包含图形、对象或 applet
- 4.建立图像映射
- 5.提交一个表单
- 6.建立一个框架文档
- 7.引用一个外部参考
- 8.指向一个描述文档的 metadata

## 二、URL-统一资源定位器

`URL` 全称是 `Uniform Resource Locator`,指的是统一资源定位器,它是一种具体的 `URI`，即 `URL` 可以用来标识一个资源，而且还指明了如何 `locate` 这个资源。通俗地说，`URL` 是 `Internet` 上用来描述资源的字符串，主要用在各种 www 客户端和服务器程序是，特别是著名的 Mosaic。采用 URL 可以用一种统一的格式来描述各种信息资源，包括文件、服务器的地址和目录等。

`URL` 的第一个部分 `http://` 表示要访问的文件的类型。在网上，这几乎总是使用 `http`（超文本传输协议，hypertext transfer protocol-用来转换网页的协议）；有时也使用 `ftp`（文件传输协议，file transfer protocol-用来传输软件和大文件；`telnet`（远程登录），主要用于远程交谈以及文件调用等，意思是浏览器正在阅读本地盘外的一个文件而不是一个远程计算机。

### 2.1 URL 组成

- `Internet` 资源类型（schema）：指出 www 客户程序用来操作的工具。如 `http://` 表示 www 服务器，`ftp://` 表示 ftp 服务器，`gopher://` 表示 Gopher 服务器，而 `new:`表示 Newgroup 新闻组。必需的。
- 服务器地址（host）：指出 www 网页所在的服务器域名。必需的。
- 端口（port）：有时（并非总是这样），对某些资源的访问来说，需给出相应的服务器提供端口。可选的。
- 路径（path）：指明服务器上某资源的位置。与端口一样，路径并非总是需要的。可选的。
  URL 地址格式排列为：`schema://host:port/path`

> 必须注意：www 上的服务器都是区分大小写的，所以千万要注意正确的 URL 大小写表达形式。

## 三、URN-统一资源名称

`URN`,全称 `Uniform Resource Name`,指的是统一资源命名,是通过名字来标识资源。比如 mailto:java-net@java.sun.com

`URN` 是 `URL` 的一种更新形式，统一资源名称(URN, `Uniform Resource Name`)不依赖于位置，并且有可能减少失效连接的个数。

## 四、总结

- URI: Uniform Resource Identifier 指的是统一资源标识符
- URL: Uniform Resource Location 指的是统一资源定位符
- URN: Universal Resource Name 指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。它是以某种统一的(标准化的)方式标识资源的简单字符串。

URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。

Web 上地址的基本形式是 URI，它代表统一资源标识符,有两种形式

- URL:目前 URI 的最普遍的形式就是无处不在的 URL 或统一资源定位器
- URN:URL 的一种更新形式，统一资源名称不依赖于位置，并且有可能减少失效链接的个数。但是其流行还需要时间，因为它需要更精密软件的支持。

[阅读原文](https://github.com/lgwebdream/FE-Interview/issues/1201)
