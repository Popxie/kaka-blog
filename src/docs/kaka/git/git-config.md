<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\git-config.md
 * @Date: 2021-03-03 17:40:36
 * @LastEditTime: 2021-08-01 00:34:00
-->

# .gitconfig 的基本配置

## 前言

通常情况下当们在初次使用 Git 的时候，需要设置一些`个人信息`&`git alias`等，从而提高一些 git 方面的效率。

- `个人信息`

  - 个人邮箱
  - 用户名
  - ……

  这样我们在 `commit` 的时候能把个人信息附带上

- `git alias` 别名

  配置以后可以用简短的命令代替默认命令，而且还可以自定义一些个性` git <命令>`

## 寻找 .gitconfig 文件

> 路径都是默认路径

- Mac:

  ```bash
  vim ~/.gitconfig
  ```

- Windows:

  ```bash
  vim /c/Users/${自己电脑的用户名}/.gitconfig # 在Git Bash Here中才可以使用 vim
  ```

## 配置 .gitconfig 文件

下面的 alias 是我个人习惯，可以根据自己的习惯进行修改

```bash
[user]
  name = KaKa_Xie
  email = mrxiehuaqiang@163.com
[alias]
  sta = status
  com = commit
  mer = merge
  reb = rebase
  che = checkout
  swi = switch
  br = branch
  unstage = reset HEAD --
  last = log -1 HEAD
  # --pretty[=<format>],<format> can be one of oneline, short, medium, full, fuller, reference, email, raw
  lp = log --pretty=oneline

  # %Cred: switch color to red;
  # %Creset: reset color;
  # %cI: committer date, strict ISO 8601 format
  # %cr: committer date, relative
  # %ae email
  # %s subject
  # %n newline
  # %C(...) color specification
  # lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%ci) %C(bold blue)<%an>%Creset <%ae>'
  lg = log --color --graph --pretty=format:'%Cred%h%Creset%C(yellow)%d%Creset %s %Cgreen%ci'
  lg5 = log -5 --color --graph --pretty=format:'%Cred%h%Creset%C(yellow)%d%Creset %s %Cgreen%ci'
  lg10 = log -10 --color --graph --pretty=format:'%Cred%h%Creset%C(yellow)%d%Creset %s %Cgreen%ci %C(bold blue)<%an>'

# [color]
  # branch = auto
  # diff = auto
  # status = auto
  # ui = auto

[color "branch"]
  current = magenta
  local = yellow
  remote = cyan

# git status 的颜色配置
[color "status"]
  changed = green   # 已变更的文件
  added = yellow    # 已暂存的文件 git add .
  untracked = cyan  # 未跟踪的文件 新增的文件

[color "diff"]
  meta = yellow
  frag = magenta bold
  commit = yellow bold
  old = red bold
  new = green bold
  whitespace = red reverse

[color "diff-highlight"]
  oldNormal = red bold
  oldHighlight = red bold 52
  newNormal = green bold
  newHighlight = green bold 22

[core]
  # https://git-scm.com/book/zh/v2/自定义-Git-配置-Git
  excludesfile = /Users/${用户名}/.gitignore_global # git config --global core.excludesfile ~/.gitignore_global会自动生成路径
  ignorecase = false # 开启敏感模式
  pager = less  # 分页器 默认是less

[pager]
  # branch, log, diff等支持paper
  branch = false # 当启用了zsh shell之后 执行git相关操作（log,branch）时会进入vim模式，一旦按q退出以后，就会导致上次操作的查询的结果被清空.设置了这个以后就可以避免了

```

git lg 效果如下：

<!-- ![git lg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/14_git_lg.png) -->

![14_git_lg](https://user-images.githubusercontent.com/24952644/127742626-4f5eebb6-e8ba-47e5-b4be-c94fa5cfea7e.png)

## 查看设置邮箱

```bash
# 全局设置
git config --global user.name "kaka"  # 设置Git的用户名
git config --global user.email "kaka@xx.com" # 设置Git的邮箱

# 项目本地设置
git config user.name "user2"
git config user.email "gitlab@xx.com"

# 查看
git config --get-all user.name  # 获取所有的Git名字
git config --get-all user.email # 获取所有的Git邮箱
git config --get user.name  # 获取本地git用户名

git config --global  --list # 查看当前用户（global）配置
git config --local  --list  # 查看当前仓库配置信息
git config --system --list  # 查看系统config

git config --list   # 会查询到全局跟项目本地的所有配置
```

## 友情提示

> 之前有个项目后端把前端的项目文件路径给存起来了，以便动态注册路由，但是由于文件夹命名不规范(大驼峰)便改成了小驼峰，导致文件夹名字变更未被 git 当做变更而记录，最后就导致后端回来的路径跟实际项目路径不一致从而导致动态路由注册失败引发 bug！

**git 默认`不区分`文件名`大小写`变化！！**

<!-- ![23](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/23.jpg) -->

![23](https://user-images.githubusercontent.com/24952644/127742637-60a7e807-c8f1-4458-be5f-d3c8dbae1e39.jpg)

```bash
# 开启区分大小写
git config core.ignorecase false
```

## 如何使用使用`git config`的文档提示

```bash
Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    --worktree            use per-worktree config file
    -f, --file <file>     use given config file
    --blob <blob-id>      read config from given blob object

Action
    --get                 get value: name [value-regex]
    --get-all             get all values: key [value-regex]
    --get-regexp          get values for regexp: name-regex [value-regex]
    --get-urlmatch        get value specific for the URL: section[.var] URL
    --replace-all         replace all matching variables: name value [value_regex]
    --add                 add a new variable: name value
    --unset               remove a variable: name [value-regex]
    --unset-all           remove all matches: name [value-regex]
    --rename-section      rename section: old-name new-name
    --remove-section      remove a section: name
    -l, --list            list all
    -e, --edit            open an editor
    --get-color           find the color configured: slot [default]
    --get-colorbool       find the color setting: slot [stdout-is-tty]

Type
    -t, --type <>         value is given this type
    --bool                value is "true" or "false"
    --int                 value is decimal number
    --bool-or-int         value is --bool or --int
    --bool-or-str         value is --bool or string
    --path                value is a path (file or directory name)
    --expiry-date         value is an expiry date

Other
    -z, --null            terminate values with NUL byte
    --name-only           show variable names only
    --includes            respect include directives on lookup
    --show-origin         show origin of config (file, standard input, blob, command line)
    --show-scope          show scope of config (worktree, local, global, system, command)
    --default <value>     with --get, use default value when missing entry
```

### 形式 1

- 通过 `git config` + `Config file location` + `Action` 的组合形式

  ```bash
  git config --system --list
  ```

### 形式 2

- 通过 `git config` + `Action`

  ```bash
  git config --get core.ignorecase
  ```

### 形式 n

....

## 参考文献

[git-config](https://git-scm.com/docs/git-config)  
[pretty-formats](https://git-scm.com/docs/pretty-formats)  
[pretty-options](https://git-scm.com/docs/pretty-options)
