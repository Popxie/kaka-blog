<!--
 * @Description: 博客分享文件夹
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\blogs\教你一招如何解决GitHub资源加载失败.md
 * @Date: 2021-06-27 15:23:37
 * @LastEditTime: 2021-07-07 22:11:03
-->

# 教你一招如何解决 GitHub 资源(图片)加载失败

![29_github资源加载不出来](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/29_github资源加载不出来.jpg)

## 前言

> 之前发现 GitHub 头像老是分裂加载不出来，最开始以为是因为自己开了 vpn 导致的，也没怎么管他，看 issue 的时候只是头像加载不出来影响也不是很大无所谓的样子，但是后来看一些开源库使用文档的时候，发现不仅仅是头像，而是所有的图片都加载不出来了，😂 尼玛！这就影响很大了。于是就经历各种`百度`||`谷歌`发现有的帖子并不管用，还好最后发现了一个有用的帖子，操作步骤如下：

## 操作方法

### 方法一

- 1.找到 hosts 文件

  Windows：

  ```bash
  C:\Windows\System32\drivers\etc\hosts
  ```

  Mac:

  ```bash
  command + shift + g # 打开前往
  ```

  输入 `/etc/hosts`

- 2.修改 host 文件

  ```sh
  # v1 网上的方案 目前还能用
  140.82.112.4 github.com
  140.82.113.3 gist.github.com
  185.199.108.153 assets-cdn.github.com
  199.232.68.133 raw.githubusercontent.com
  199.232.68.133 gist.githubusercontent.com
  199.232.68.133 cloud.githubusercontent.com
  151.101.192.133 camo.githubusercontent.com
  151.101.184.133 avatars.githubusercontent.com

  # 一（ip）对多(域名) ip与域名之间要空格，域名与域名之间也要用空格隔开（最多好像能跟9个）
  # eg: 199.232.68.133 avatars0.githubusercontent.com ... avatars8.githubusercontent.com

  ```

### 方法二

- 通过 `vpn` 代理修改规则（具体的根据自己的代理客户端来操作，原理基本一致）

  ```sh
  ||raw.githubusercontent.com
  ||.githubusercontent.com
  ||githubusercontent.com
  ||.githubassets.com
  ||githubassets.com
  ```

  ![30_github资源加载不出来](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/30_github资源加载不出来.jpg)

## 授人以鱼不如授人以渔

上面都是通过`谷歌百度`查到的相关结果，但是有时候 `GitHub` 的 ip 地址会变更(我是更改过一两次)，就会导致上面的配置失效。所以还得需要重新`谷歌百度`。那么既然如此还不如自己知道怎么去解决这个问题。

- 借助第三方工具查询

  [https://ipaddress.com/](https://ipaddress.com/)

  通过这个平台我们可以轻而易举的查到相应域名对应的 ip 地址了。

  比如这个域名`raw.githubusercontent.com`我是用的比较多，因为我利用 `GitHub` 的机制，创建了一个图床项目，所有的图片访问都要通过这个域名访问。所以就会很有可能出现别人在预览该域名下的图片时，图片资源加载失败！

  ![31_github资源加载不出来](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/31_github资源加载不出来.png)

  ```bash
  # 由上图可以可知， raw.githubusercontent.com 对应四个ip地址
  185.199.108.133
  185.199.109.133
  185.199.110.133
  185.199.111.133
  ```

- 更改 host 文件信息

  ```bash

  # GitHub Start

  # https://www.ipaddress.com/ 根据域名查ip地址

  # v1 （之前谷歌查的结果）
  140.82.112.4 github.com
  199.232.68.133 raw.githubusercontent.com

  # v2 （通过自己通过上述链接查询后配置）
  140.82.113.3 github.com
  # 我的图床就是在这个域名下面
  185.199.108.133 raw.githubusercontent.com
  185.199.109.133 raw.githubusercontent.com
  185.199.110.133 raw.githubusercontent.com
  185.199.111.133 raw.githubusercontent.com
  # GitHub End
  ```

## 总结

其实引发 `GitHub` 资源加载失败的原因主要是这些资源在外网，由于是大陆政策的问题导致被墙了。所以通过以上说明，我想后续再次出现这种资源加载失败的话，自己就能很轻松的解决类似问题了。

## 参考资源

[解决 github 图片不显示的问题·知乎](https://zhuanlan.zhihu.com/p/107196957)
