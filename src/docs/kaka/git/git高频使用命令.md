<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\git高频使用命令.md
 * @Date: 2021-03-03 17:38:29
 * @LastEditTime: 2021-08-01 00:56:42
-->

# Git 高频使用命令

## 1.新增

```bash
git checkout -b xxx # 在当前所处的分支基础之上创建xxx分支
git checkout -b xxx yyy # 在yyy分支的基础之上创建新xxx分支
```

## 2.删除分支

- 2.1 删除本地

  ```bash
  git branch -d xxx yyy zzz # 支持删除多个分支
  git branch -D xxx yyy zzz # 强制删除 -D是--delete --force的缩写
  ```

- 2.2 删除远端

  支持多个分支删除

  - `-d <分支名>` || `--delete <分支名>`

    ```bash
    git push origin -d <分支名1> <分支名2> # 删除远端分支(只需要分支名不需要带有remotes)
    ```

    结果如下：

    ```bash
    KaKa:xxx-project kaka-mac$ git push origin -d test01 test02
    To http://10.0.11.37:80/kaka/xxx-project.git
    - [deleted]         test01
    - [deleted]         test02
    ```

  - 错误示例：  
    直接使用`<分支名>`,不要使用`remotes/origin/<分支名>`

    ```bash
    KaKa:xxx-project kaka-mac$ git push origin -d remotes/origin/test01 remotes/origin/test02

    error: 无法删除 'remotes/origin/test01'：远程引用不存在
    error: 无法删除 'remotes/origin/test02'：远程引用不存在
    error: 推送一些引用到 'http://10.0.11.37:80/kaka/xxx-project.git' 失败
    ```

  - `:<分支名>`

    ```bash
    git push origin :<分支名1> :<分支名2>  …… :<分支N>
    ```

    结果如下：

    ```bash
    KaKa:xxx-project kaka$ git push origin :test01 :test02
    To http://10.0.11.37:80/kaka/xxx-project.git
    - [deleted]         test01
    - [deleted]         test02

    ```

- 2.3 删除本地已失效的分支

  有时候远端分支已经删除了，`git branch -a`的时候还能看到，这个时候就可以执行下面这个命令，来更新`git branch -a`的状态

  ```bash
  git remote show origin # 可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息
  git remote prune origin # 删除本地版本库上那些失效的远程追踪分支
  ```

## 3. 删除文件

- `clean`

  ```bash
  # 删除 untracked files
  git clean -f

  # 连 untracked 的目录也一起删掉
  git clean -fd

  # 连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
  git clean -xfd

  # 在用上述 git clean 前，墙裂建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
  git clean -nxfd
  git clean -nf
  git clean -nfd
  ```

- `rm`

  ```bash
  # 删除文件夹
  git rm <文件夹路径> -r # -r 表示递归
  # 删除文件
  git rm <文件路径>
  ```

  ```bash
   git rm ./src/components/common -r # 删除common文件夹
  ```

二者应该有区别~具体区别又搞不太清楚···😂 `rm`我的使用场景就是 `Git` 大小写不敏感时，若想更改文件名（驼峰转换）这个时候会用到这个命令。`clean`是当我对项目进行`撤销变更`的时候，执行`git checkout .`后那些未被跟踪的文件（`untracked files`）无法撤销，这个时候就可以使用`clean`命令来进行删除！

## 4.撤销（恢复原样）

- 4.1 撤销工作区域中的修改

  ```bash
  git checkout .
  ```

- 4.2 撤销工作区中指定文件的修改

  ```bash
  filename: ./package.json || package.json || src/App.vue

  git checkout -- filename  # 路径是从项目的根目录开始
  ```

  这里`撤销`的操作都是被 Git tracked 的文件,将所有变动过的文件还原上一次 commit 状态，但是对于新增的文件（`U`-`untracked`）则无任何撤销作用，这个时候就需要使用 `git clean`命令来 删除 `untracked`的文件,具体参考上步操作（`删除文件`）

## 5. 版本回退

- 5.1 回退到指定版本`HEAD形式`

  ```bash
  # 这种情况文件修改变更还在
  git reset HEAD^     # 上一个
  git reset HEAD^^    # 上上一个
  git reset HEAD~n    # n：1，2，3，4……

  # 这种情况文件变更都不在（还原成初始状态）
  git reset --hard HEAD~1
  ```

- 5.2 回退到指定版本`直接版本号形式`

  ```bash
  git reset xxxxxx        # 取消某一次提交且做的修改还在
  git reset --hard xxxxxx # 取消某一次提交且做的修改全部丢失
  ```

如何后悔了！可以使用命令 `git reflog` 来查看你的每一次操作日志，该命令可以输出对应的版本号的操作记录

## 6. 查看日志

```bash
# 查看版本库的历史记录
git log

# 查看版本库的历史记录，美化输出
git log --pretty=oneline

# 查看版本库的历史记录，只显示前 5 条
git log -5

git log -5 --pretty=oneline
```

### 7. git commit

```bash
git commit -a # 进入多行编辑模式

git commit -m 'x'   # 输入引号 和内容以后 就可以直接回车换行了

git commit --amend -m 'xxx' #  修改上一次提交的 message

git rebase -i <hash-id> # 利用这一步的 r, reword <commit>, 将要修改的某次commit之前的pick换成r 保存会进入下一步重新更改commit msg了
```

### 8.git tag

```bash
# 创建
git tag v1.0          # 创建标签（默认在最新的commit上）
git tag v0.9 6224937  # 在指定commit上创建标签
git tag -a v0.1 -m "version 0.1 released" 3628164   # 在指定commit上创建有备注的标签（-a指定标签名）

# 展示
git show <tagname>   # 可以查看标签的文字说明

# 查看
git tag              # 查看所有标签

# 删除本地
git tag -d <tagname>  # 删除tag

# 删除远端分支
git push origin :refs/tags/<tagname>

# 删除本地所有tag
git tag | xargs git tag -d

# 删除远端所有tag
git tag -l | xargs -n 1 git push --delete origin
```

### 9. git diff 查看两个分支的区别

```bash
# 本地 & 本地
git diff develop master  # 比较develop & master分支的区别

# 本地 & 远端分支
git diff develop origin/master
```

## 10. git stash

```bash
（1）git stash save <message>  # 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

（2）git stash list # 查看stash了哪些存储

（3）git stash show # 显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

（4）git stash show -p # 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p

（5）git stash apply # 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1}

（6）git stash pop # 命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

（7）git stash drop stash@{$num} # 丢弃stash@{$num}存储，从列表中删除这个存储

（8）git stash clear # 删除所有缓存的stash
```

[git stash 原文](https:#www.cnblogs.com/zndxall/archive/2018/09/04/9586088.html)

## 11. gitk

```bash
gitk --all # 查看 `git树图`&`diff`
```

- 如果查看到界面中文乱码，执行如下命令即可

  ```bash
  git config --global gui.encoding utf-8 # 转换成简体中文
  ```

## 参考文件

[git 官网·中文](https://git-scm.com/book/zh/v2)

其他博客：  
[1.Git 撤销修改和版本回退·CSDN](https:#blog.csdn.net/lamp_yang_3533/article/details/80357505)
