<!--
 * @Description: 博客分享文件
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/git/git-hub-img-broken.md
 * @Date: 2021-06-10 15:46:19
 * @LastEditTime: 2021-06-17 19:11:51
-->

# 如何处理 GitHub 图片加载不出来的问题

## 前言

> 之前发现 GitHub 头像老是分裂加载不出来，最开始以为是因为自己开了 vpn 导致的，也没怎么管他，看 issue 的时候只是头像加载不出来影响也不是很大无所谓的样子，但是后来看一些开源库使用文档的时候，发现不仅仅是头像，而是所有的图片都加载不出来了，😂 尼玛！这就影响很大了。于是就经历各种`百度`||`谷歌`发现有的帖子并不管用，还好最后发现了一个帖子，操作步骤如下：

## 1.找到 hosts 文件

- Windows：
  - `C:\Windows\System32\drivers\etc\hosts`
- Mac
  - `command+shift+g`打开`前往`输入`/etc/hosts`

## 2.修改 host 文件

```bash
# GitHub Start
192.30.253.119     gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com

 # GitHub End
```

[参考原文·知乎](https://zhuanlan.zhihu.com/p/107196957)  
[本人的笔记·知乎](https://zhuanlan.zhihu.com/p/336910194)