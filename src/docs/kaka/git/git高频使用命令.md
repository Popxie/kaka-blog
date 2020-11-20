<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/git/git高频使用命令.md
 * @Date: 2021-03-03 17:38:29
 * @LastEditTime: 2021-06-17 19:20:14
-->

# git 高频使用命令

## 1.新增

```bash
git checkout -b xxx # 在当前所处的分支基础之上创建xxx分支
git checkout -b xxx yyy # 在yyy分支的基础之上创建新xxx分支
```

## 2.删除

### 2.1 删除本地

```bash
git branch -d xxx yyy zzz # 支持删除多个分支
git branch -D xxx yyy zzz # 强制删除 -D是--delete --force的缩写
```

### 2.2 删除远端

```bash
git push origin -d xxx yyy zzz # 删除远端分支
eg:
git push origin -d remotes/origin/xxx remotes/origin/yyy
```

### 2.3 删除本地已失效的分支

> 有时候远端分支已经删除了，`git branch -a`的时候还能看到，这个时候就可以执行下面这个命令，来更新`git branch -a`的状态

```bash
git remote show origin # 可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息
git remote prune origin # 删除本地版本库上那些失效的远程追踪分支
```

## 3.撤销（恢复原样）

### 3.1 撤销工作区域中的修改

```bash
git checkout .
```

### 3.2 撤销工作区中指定文件的修改

```bash
filename: ./package.json || package.json || src/App.vue

git checkout -- filename  # 路径是从项目的根目录开始
```

## 4.版本回退

### 4.1 回退到上一个/上上一个/n 个

```bash
# 这种情况文件修改变更还在
git reset HEAD^
git reset HEAD^^
git reset HEAD~n  # n：1，2，3，4……

# 这种情况文件变更都不在（还原成初始状态）
git reset --hard HEAD~1
```

### 4.2 回退到指定版本

```bash
1.git reset xxxxxx # 取消某一次提交且做的修改还在
2.git reset --hard xxxxxx # 取消某一次提交且做的修改全部丢失
```

如何后悔了！可以使用命令 `git reflog` 来查看你的每一次操作日志，该命令可以输出对应的版本号的操作记录

## 5.查看日志

```bash
# 查看版本库的历史记录
git log

# 查看版本库的历史记录，美化输出
git log --pretty=oneline

# 查看版本库的历史记录，只显示前 5 条
git log -5

git log -5 --pretty=oneline
```

### 6.git commit

```bash
git commit --amend -m 'xxx' #  修改上一次提交的 message
```

### 7.git tag

```bash
1.1 git tag v1.0  # 创建标签（默认在最新的commit上）
1.2 git tag v0.9 6224937  # 在指定commit上创建标签
1.3 git tag -a v0.1 -m "version 0.1 released" 3628164   # 在指定commit上创建有备注的标签（-a指定标签名）
2. git  show <tagname> # 可以查看标签的文字说明
3. git  tag # 查看所有标签

4. git tag -d <tagname>
```

### 8.git diff 查看两个分支的区别

```bash
# 本地 & 本地
git diff develop master  # 比较develop & master分支的区别

# 本地 & 远端分支
git diff develop origin/master
```

## 9.git stash

[git stash 原文](https:#www.cnblogs.com/zndxall/archive/2018/09/04/9586088.html)

```bash
（1）git stash save "save message"  : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

（2）git stash list  ：查看stash了哪些存储

（3）git stash show ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

（4）git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p

（5）git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1}

（6）git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

（7）git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

（8）git stash clear ：删除所有缓存的stash
```

## 10. gitk --all 查看 git 树图&diff

> 如果查看到界面中文乱码，执行如下命令即可

```bash
git config --global gui.encoding utf-8
```

其他博客：  
[1.Git 撤销修改和版本回退·CSDN](https:#blog.csdn.net/lamp_yang_3533/article/details/80357505)
