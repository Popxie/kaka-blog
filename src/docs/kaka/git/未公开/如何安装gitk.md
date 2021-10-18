<!--
 * @Description: Git文件夹
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\如何安装gitk.md
 * @Date: 2021-03-03 17:41:49
 * @LastEditTime: 2021-08-01 00:33:31
-->

# 如何安装 gitk

<!-- ![gitk](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/15_gitk.png) -->

![15_gitk](https://user-images.githubusercontent.com/24952644/127746366-034253e5-a8b7-41e0-af3d-829b6aab920f.png)


前置条件：  
**Mac 系统环境下**

当执行如下命令时：

```bash
$ gitk --all

zsh: command not found: gitk

```

> 我是从上而下一步一步操作的，最终也成功了，但是你可以尝试下从`第2步`操作直接安装`gitk`,有可能会成功 😹

## 何解决这个问题？

> 已下部分操作基于 brew 命令操作，如果没有安装 brew 包管理的请自行`百度`||`谷歌`进行安装 🤪

### 1.通过 brew 安装 Git

#### 1.1 先检查是否已存在 git

```bash
$ git --version

git version 2.17.2 (Apple Git-113)

$ which git

/usr/bin/git
```

`/usr/bin/git` 则说明 git 为 Mac 原生老版本，升级最新的 git，可通过 brew 安装

#### 1.2 安装 Git

```bash
brew install git
```

执行如下命令：

```bash
$ brew link git

Warning: Already linked: /usr/local/Cellar/git/2.29.2
To relink:
  brew unlink git && brew link git
```

> 上面的 Warning 是正常的提示（已经是最新的 git 了），写博客前没注意老版本输出是什么样子的，如果不是已上格式，按照提示执行`brew unlink git && brew link git`即可

确认下`默认设置`，不同于原生的`/usr/bin/git`

```bash
$ which git

# 说明是新版的git路径
/usr/local/bin/git
```

### 2.安装 gitk

```bash
$ gitk
#注：Terminal用的是zsh，所以报这个错
zsh: command not found: gitk
```

#### 2.1 通过安装 git-gui 且带有 gitk

安装：

```bash
brew install git-gui
```

你可能会输出：

```bash
Warning: git-gui 2.29.2 is already installed, it's just not linked
You can use `brew link git-gui` to link this version.
```

根据上述提示执行：

```bash
$ brew link git-gui

Linking /usr/local/Cellar/git-gui/2.29.2...
Error: Could not symlink bin/git-gui
Target /usr/local/bin/git-gui
already exists. You may want to remove it:
  rm '/usr/local/bin/git-gui'

To force the link and overwrite all conflicting files:
  brew link --overwrite git-gui

To list all files that would be deleted:
  brew link --overwrite --dry-run git-gui
```

再次根据上述提示执行：

```bash
$ brew link --overwrite git-gui

Linking /usr/local/Cellar/git-gui/2.29.2... 6 symlinks created

# 这个命令我没有执行，用的是上面这个
$ brew link --overwrite --dry-run git-gui
```

安装完成确认路径是否为`/usr/local/bin/gitk`

```bash
$ which gitk

/usr/local/bin/gitk
```

#### well done~~~愉快的使用 gitk 吧

参考：  
[Mac 通过 brew 升级 git](https://www.mscto.com/blockchain/238833.html)
