## git config

```
vim ~/.gitconfig
```

```
[user]
    name = "kaka"
    email = "kaka@xx.com"
[alias]
    sta = status
    com = commit
    che = checkout
    br = branch
    unstage = reset HEAD --
    last = log -1 HEAD
[color]
    branch = auto
    diff = auto
    status = auto
    ui = auto
[color "branch"]
    current = magenta
    local = yellow
    remote = cyan
```

一般 .gitconfig文件都在  C盘/用户/自己的电脑用户名 的下面
然后通过gitbash 输入 vim 再将.gitconfig文件拖进dos按下回车 就可以修改了 
通过window自带的 dos 无法读取vim命令 = =

```
git config --global user.name "kaka"  // 设置Git的用户名
git config --get-all user.name   获取当前的Git名字

git config --global user.email "kaka@xx.com" // 设置Git的邮箱
git config --get-all user.email // 获取当前的Git邮箱

```