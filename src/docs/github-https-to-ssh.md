> 在github.com上 建立了一个小项目，可是在每次push的时候，都要输入用户名和密码，很是麻烦,原因是使用了https方式 push  

在终端termail里输入 `git remote -v`可以看到如下信息

```
<!--https协议-->
origin  https://github.com/Popxie/kaka-blog.git (fetch)
origin  https://github.com/Popxie/kaka-blog.git (push)
```

下面把它转换成ssh方式

```
1. git remote rm origin
2. git remote add origin git@github.com:xxx/demo.git
3. git push origin // 要提前配置好相关的ssh配置否则无法推送

```

最后再次执行 `git remote -v` 会看到

```
<!--ssh形式-->
origin  git@github.com:Popxie/kaka-blog.git (fetch)
origin  git@github.com:Popxie/kaka-blog.git (push)
```

**相关remote命令 请查看`git remote -h`**