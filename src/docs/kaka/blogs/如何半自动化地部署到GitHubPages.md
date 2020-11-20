<!--
 * @Description: 博客分享文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/blogs/如何半自动化地部署到GitHubPages.md
 * @Date: 2021-06-17 18:03:56
 * @LastEditTime: 2021-06-18 12:23:20
-->

# 如何半自动化地部署到[GitHub Pages](https://pages.github.com/)

## 前言

> 因为自己有一个 GitHub Pages 项目专门做一些日常笔记，期间遇到了会遇到一些问题，刚好有空闲就写下这篇文章做个笔记来记录整个过程。  
> 主要讲了如何通过脚本将编译后的 dist 文件，发布到自己的 GitHub Pages。以及在发布过程当中遇到的问题。过程比较详细 请耐心阅读··· 🌚  
> 所谓的半自动化意思很明显，就是部署依旧需要人的参与才可完成部署。😂

项目目录

```bash
├── README.md
├── babel.config.js
├── deploy.sh
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
├── vue.config.js
└── yarn.lock
```

## 1.半自动部署发布

### 1.1 创建脚本 `deploy.sh`文件

```bash
#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build:prod

# cd 到构建输出的目录下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:Popxie/kaka-blog.git master:gh-pages

cd -
```

### 1.2 执行第一步的文件

```bash
sudo sh ./deploy.sh
```

> 在执行过程当中你可能会出现以下问题（即 git push -f 会出错）

错误提示如下

```bash
已初始化空的 Git 仓库于 /Users/KaKa/Desktop/kaka-blog/dist/.git/
[master（根提交） 5d44f5d] deploy
 96 files changed, 117 insertions(+)
 create mode 100644 css/home.e3f20bd1.css
 create mode 100644 css/index.aba1125b.css
 ·
 ·
Warning: Permanently added the RSA host key for IP address '192.30.255.112' to the list of known hosts.
git@github.com: Permission denied (publickey).
fatal: 无法读取远程仓库。

请确认您有正确的访问权限并且仓库存在。
```

**如何解决这个问题？**

先上答案  
执行如下命令：

```bash
git pull origin master --allow-unrelated-histories
```

执行后输出结果如下：

```bash
来自 github.com:Popxie/kaka-blog
 * branch              master     -> FETCH_HEAD
已经是最新的。
```

================== `处理过程 start` ===============

刚开始你可能会很蒙蔽 然后 `百度`||`谷歌` 查关键词 `git@github.com: Permission denied (publickey)`

最后查到这边帖子[github 提示 Permission denied···
](https://www.zhihu.com/question/21402411)

然后你会在文章中看到这个命令:

```bash
ssh -T git@github.com
```

执行输出结果：

```bash
Hi Popxie! You've successfully authenticated, but GitHub does not provide shell access.
```

然后 `百度`||`谷歌` 查关键词 `You've successfully authenticated, but GitHub does not provide shell access` 😂

最后你会看到这个帖子[错误 You've successfully···](https://blog.csdn.net/zhangyu4863/article/details/81592728)得到解决方案

================== `处理过程 end` ===============

### 1.3 再次执行脚本命令

```bash
sudo sh ./deploy.sh
```

输出如下：

```bash
已初始化空的 Git 仓库于 /Users/hhdd/Desktop/kaka-blog/dist/.git/
[master（根提交） 51e123b] deploy
 96 files changed, 117 insertions(+)
 create mode 100644 css/chunk-f9bc824a.2ecf191b.css
 create mode 100644 css/chunk-vendors.ef3f11fe.css
 ·
 ·
枚举对象: 102, 完成.
对象计数中: 100% (102/102), 完成.
使用 4 个线程进行压缩
压缩对象中: 100% (102/102), 完成.
写入对象中: 100% (102/102), 1.70 MiB | 669.00 KiB/s, 完成.
总共 102（差异 8），复用 0（差异 0），包复用 0
remote: Resolving deltas: 100% (8/8), done.
To github.com:Popxie/kaka-blog.git
 + bc9aca5...51e123b master -> gh-pages (forced update)
/Users/KaKa/Desktop/kaka-blog
```

**恭喜~** 发布成功

<!-- 等空闲了分享一篇 **如何全自动化地部署项目到GitHub Pages** -->

## 参考文献

[GitHub Pages](https://pages.github.com/)
