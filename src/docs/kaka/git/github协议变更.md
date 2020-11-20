<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/git/github协议变更.md
 * @Date: 2021-06-10 16:04:11
 * @LastEditTime: 2021-06-17 19:21:22
-->

# github协议变更 (https to ssh)

> 在 github.com 上 建立了一个小项目，可是在每次 push 的时候，都要输入用户名和密码，很是麻烦,原因是使用了 https 方式 push

在终端 termail 里输入 `git remote -v`可以看到如下信息

```bash
<!--https协议-->
origin  https://github.com/Popxie/kaka-blog.git (fetch)
origin  https://github.com/Popxie/kaka-blog.git (push)
```

下面把它转换成 ssh 方式

```text
1. git remote rm origin
2. git remote add origin git@github.com:xxx/demo.git
3. git push origin // 要提前配置好相关的ssh配置否则无法推送

```

最后再次执行 `git remote -v` 会看到

```text
<!--ssh形式-->
origin  git@github.com:Popxie/kaka-blog.git (fetch)
origin  git@github.com:Popxie/kaka-blog.git (push)
```

**相关 remote 命令 请查看`git remote -h`**
