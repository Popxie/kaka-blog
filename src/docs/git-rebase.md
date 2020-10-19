## 如何创建一个优美的commit记录 

### 1.背景说明

### 2.前置条件

- 从`test`分支分别创建两个新的功能分支用来模拟两(多)个人开发
    - 这里用`user1`和`user2`来表示
- `user1`和`user2`分别轮流交叉提交commit，用来模拟最终merge到test分支commit交叉混乱的情况

<!--git1.png-->
![user1&user2对比提交记录](https://cdn.hhdd.com/frontend/as/i/9b9753f5-db82-539d-bd0c-3916835a4e28.png)

user1 & user2分别进行的4次提交 如上图所示 

### 3.最终效果对比：

> commit记录‘交叉混乱’ ,视觉上看着并不是很爽朗    

<!-- merge后的commit是按照commit的时间自上而下的排序,所以看着会比较不清爽-->

<!--git2-->
![git2](https://cdn.hhdd.com/frontend/as/i/b9e3db5d-b497-52ea-8462-c37f4d46c376.png)

git log前后对比 如上图所示

<!--git3-->
![git3](https://cdn.hhdd.com/frontend/as/i/6e00d054-cbc0-5752-b9b5-038f156b1a51.png)

git log --graph 前后对比 如上图所示

### 4.如何避免这种问题??

这里以`user1`操作为例，`user2`同理

 > 使用`git rebase -i xxxx` 命令    

<!--git4-->
![git4](https://cdn.hhdd.com/frontend/as/i/19ec1340-3e59-5d1f-88a6-f12b4636c63c.png)

user1 rebase 前后对比 如上图所示

#### 情况一：我们的多次commit已经提交到远端。

- 涉及到危险操作`git reset --hard xxxx` & `git push -f`

> 友情提示： 如果对变基不是很清楚，建议在变基之前对'`user1`'的分支进行备份

通常情况下，一个新的功能分支不可能一直暂存在本地而不提交远端，就样子就会造成多次的commit都会被提交到远端，最终merge到test分支的时候也会附带的把之前的多次commit记录一并给提交上去了。而我们期望的是：**简化commit记录，在merge到test之前将之前的commit都合并为一个**

但是`git rebase`命令多用于**未提交到远端之前**进行commit合并操作。

所以就有了友情提示做个备份，以免操作失误不好挽回的局面。

##### 第一步：找到需要变基的起点

```
948aa5a940eda8b7d92181a2cd0a272ebec38352 (HEAD -> feature/user1-test, origin/feature/user1-test) add user1.4
60e6ec8520c94dcc54f8f76ab96ba393fe4e19b7 add user1.3
fba4e9588c28d7dd076e5f8abc63a711bb1f0235 add user1.2
d01d268ddf308d7fd612a9c5db2d27f7dc1bfd27 add user1.1
e6edcd464317c119c4cfa3cb2b7a354003db9788 (origin/test, origin/master, test, master) 修复you dont know js图片路径引入问题
```

由上可知我们要将`add user1.1 ~ add user1.4`合并为一个commit，所以我们要选择的起点是 `e6edcd464` 

1.`git rebase -i e6edcd464`会弹出以下提示
```
pick d01d268 add user1.1
pick fba4e95 add user1.2
pick 60e6ec8 add user1.3
pick 948aa5a add user1.4

# 变基 e6edcd4..948aa5a 到 948aa5a（4 个提交）
#
# 命令:
# p, pick <提交> = 使用提交
# r, reword <提交> = 使用提交，但修改提交说明
# e, edit <提交> = 使用提交，进入 shell 以便进行提交修补
# s, squash <提交> = 使用提交，但融合到前一个提交
# f, fixup <提交> = 类似于 "squash"，但丢弃提交说明日志
# x, exec <命令> = 使用 shell 运行命令（此行剩余部分）
# b, break = 在此处停止（使用 'git rebase --continue' 继续变基）
# d, drop <提交> = 删除提交
# l, label <label> = 为当前 HEAD 打上标记
# t, reset <label> = 重置 HEAD 到该标记
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       创建一个合并提交，并使用原始的合并提交说明（如果没有指定
# .       原始提交，使用注释部分的 oneline 作为提交说明）。使用
# .       -c <提交> 可以编辑提交说明。
#
# 可以对这些行重新排序，将从上至下执行。
#
# 如果您在这里删除一行，对应的提交将会丢失。
#
# 然而，如果您删除全部内容，变基操作将会终止。
```

2.将`user1.2~user1.4`合并到`user1.1` 
```
pick d01d268 add user1.1
s fba4e95 add user1.2 ↑
s 60e6ec8 add user1.3 ↑
s 948aa5a add user1.4 ↑  // s 表示向上合并，所以p(ick)都会在上 s(quash)在下，否则会出问题哈，不信可以自己尝试[狗头]

:wq //退出保存
```

3.最终效果前后对比

<!--git4-->
![git4](https://cdn.hhdd.com/frontend/as/i/19ec1340-3e59-5d1f-88a6-f12b4636c63c.png)

如上图所示

<!--git5-->
![git5](https://cdn.hhdd.com/frontend/as/i/cf48f96f-de87-57eb-a36f-05a77b908cce.png)

这个时候vscode左下角会有提示告诉你 当前分支落后远端分支4次commit，且有一个未提交的commit 如上图所示

<!--git6-->
![git6](https://cdn.hhdd.com/frontend/as/i/1812166b-3e74-5929-9aaf-0c848b912189.png)

因为这个分支是自己的，所以可以强制将当前变基后的分支push到远端覆盖，结果 如上图所示  

#### 情况二：我们的多次commit还在本地未提交到远端

这种情况呢包含在情况一中，只是没有了强制push这一步，也不会出现落后远端分支4次commit的情况。

所以不再重复赘述~~ 


### 5.两用户变基后的分支合并到test分支

<!--git2 -->
![git2](https://cdn.hhdd.com/frontend/as/i/b9e3db5d-b497-52ea-8462-c37f4d46c376.png)

最终变基合并后的效果 如上图所示：


