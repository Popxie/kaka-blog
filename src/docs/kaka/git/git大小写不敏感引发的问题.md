<!--
 * @Description: Git文件夹
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\git大小写不敏感引发的问题.md
 * @Date: 2021-06-24 18:43:38
 * @LastEditTime: 2021-06-27 23:49:36
-->

# git 大小写不敏感引发的问题

## 前言

> 由于当太年轻，资历不够深！！！，导致文件命名不够规范，现在想更正文件命名（`common => COMMON`），结果发现一个很奇特的现象！ <font color="green">git 对文件名的大小写不敏感！！！！</font>引发了一些问题。最终经过查阅资料得以解决，遂！写下这篇帖子记录一下。走\~跟着渣渣一起吃着花生 🥜 喝着啤酒 🍺 看起来~

![13.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/13.jpg)

<!-- ![23](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/23.jpg)   -->

## demo 部分目录结构

- master 分支的代码及文件目录情况

  ```bash
  # master分支原始目录
  .
  ├── main.js
  └── src
      └── components
          └── common
              ├── FootCell
              │   └── index.vue
              ├── Pagination
              │   └── index.vue
              ├── Table
              │   └── index.vue
              └── TitleCell
                  └── index.vue
  ```

  ```js
  // main.js
  const files = require.context('../components/common', true, /\.vue$/)
  ```

## 准备工作

### 模拟多用户

- `user1` 分支：`feature/user1`

- `user2` 分支：`feature/user2`

  此时分别有两个用户`user1`和`user2`在各自的电脑上拉取了这个项目。

# 骚操作开始 第一种

> <font color="red">文件名的变更未同步到远端，但是引用路径却同步到远端了！</font>

- `user1` 不知道 `git` 大小写不敏感,`user2` 可知可不知，反正最后都!会!知!道!!!

  ![09.gif](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/09.gif)

## [user1]向远端同步变更

### 更改文件名 + 更改引用路径

> 因为 这里 git 大小写不敏感所以只进行文件名变更(大小写)的话，不会被 git 检测到，所以必须要改动一个文件，让 git 检测到变更。才能进行`commit`!刚好文件名的变更导致了引用路径也需要变更！因此本次可以进行提交

- 由于被<font color="green">绿</font>太狠了，心情不太好就开始了骚操作坑队友！`common => COMMON`结果如下：

  ```bash
    # common => COMMON
    .
    ├── main.js
    └── src
        └── components
            └── COMMON
                ├── FootCell
                │   └── index.vue
                ├── Pagination
                │   └── index.vue
                ├── Table
                │   └── index.vue
                └── TitleCell
                    └── index.vue
  ```

  ```js
  // main.js
  const files = require.context('../components/common', true, /\.vue$/)
  ```

  最后并把代码提交到了远端,并且告诉 `user2` 代码有更新

## [user2]的响应

### pull 代码

- `user2`于是乎就先`pull`然后`merge`了一下，把 user1 的代码同步到自己的分支，结果如下：

  ```bash
    # 此时 common => common 没有变化！！！
    .
    ├── main.js
    └── src
        └── components
            └── common
                ├── FootCell
                │   └── index.vue
                ├── Pagination
                │   └── index.vue
                ├── Table
                │   └── index.vue
                └── TitleCell
                    └── index.vue
  ```

  ```js
  // main.js 有变化！！！
  const files = require.context('../components/COMMON', true, /\.vue$/)
  ```

  这个时候，”报应“来的太突然，项目报错了！引用的路径是`COMMON`而实际项目的路径是`common`

  ![18.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/18.jpg)

- 然后`uesr2`就好奇为啥会是这种情况,文件名没有变化？？于是乎开启了探索之路~~

### 探索问题

> 因为`user1`被<font color="green">绿</font>了一波，心情不好搞事情，害得`user2`引发了 bug，但是刚好激发了`user2`的好奇心。

- 为啥`user1`的是 COMMON,到我这里是 common？？？

  最后`user2`查到了答案！ 原来是 git 对文件名的大小写不敏感，才会引发这个问题。好了那么接下来就是这么去解决这个问题呢？？

<strong>温馨提示</strong>

> 因为 git 默认不区分大小写，所以如果只更改文件名的话 git 并不会检测到文件有变化，固，无法进行 commit，所有这次测试在更改文件名的时候附带的改动了其他地方，以便提交！

### 解决问题

既然`user2`已经知道了 git 默认大小写不敏感，那就让他敏感呗。多简单！

## [user2]更新变更

### 1。 开启 敏感模式

```bash
git config core.ignorecase false # 让你变的敏感
```

> 其实`user1`压根就没有把文件名更改同步到到远端!(所以开头才说，他不知道 git 大小写不敏感!但是文件引用路径变更了这个就导致其他人-`user2`,同步更改自己本店的文件名了)

![21.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/21.jpg)

### 2. 手动更改文件名

- `common` => `COMMON`

### 3. 暂存、merge 到 master 分支

- `git add .`

- `git commit -m <msg>`

- `git che master` 发现如下图:

  ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png)

  ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png)

  master 分支的 `common` => `COMMON`且文件下的文件都被删除了！

- git mer feature/user2 结果如下图：

  ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png)

  ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png)

### 4. master 推送到远端

- `git push` 将 `COMMON` 同步到远端

### 5. 查看 commit 记录

- 最后 `user1` 执行 `git pull`, 此时 `user1` `user2` 代码已同步

  ![12_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/12_git大小写不敏感引发的问题.png)

# 骚操作开始 第二种

> <font color="red">文件名变更实际已经同步到远端了，且引用路径也同步到了远端！</font>

- 这次`user1` 知道 `git` 大小写不敏感, `user2` 同样可知可不知，于是一开始就逼迫她，让她变得敏感再敏感！

  ![16.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/16.jpg)

## [user1]向远端同步变更

- user1 的分支：feature/user1

### 1. 让她敏感

```bash
git config core.ignorecase false # emmmmm……俺敏感了
```

### 2. 更改文件名 & 文件引用路径

- `common => COMMON`

- 更改引用路径

  ```js
  // 旧
  const files = require.context('../components/common', true, /\.vue$/)

  // 新
  const files = require.context('../components/COMMON', true, /\.vue$/)
  ```

### 3. 暂存（add）& 提交(commit)

- 暂存

  ```bash
  git add .
  ```

- 提交

  ```bash
  git com -m <msg>
  ```

### 4. 切换分支

- `git che master`

  ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png)

  ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png)

### 4.merge 到 master 并 pull 向远端

- `merge` 结果如下：

  ```bash
  git merge feature/user1 # user1的分支合并到本地master
  ```

  ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png)

  ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png)

- push

  ```bash
  git push # 推送到远端master
  ```

## [user2]更新变更

- user2 的分支：feature/user2

### 1. 开启 敏感模式·情况一

```bash
git config core.ignorecase false
```

### 2. 切分支 & pull 代码

- 切分支

  ```bash
  git che master
  ```

- 拉代码

  ```bash
  git pull # 更新 master 分支
  ```

- 结果如下：

  ```bash
  # 结果 error
  KaKa:test2  xxx$ git pull
  更新 5f318b9..5174f2e
  error: 工作区中下列未跟踪的文件将会因为合并操作而被覆盖：
          src/components/COMMON/FootCell/index.vue
          src/components/COMMON/Pagination/index.vue
          src/components/COMMON/Table/index.vue
          src/components/COMMON/TitleCell/index.vue
  请在合并前移动或删除。
  正在终止

  ```

  > 注意！上面那个问题一旦触发，那么你接下来所有的操作比如 `check`,`switch`,`pull`等操作都会报这个错误！！

  其实上面已经告诉你怎么操作了，按照提示 `删除`或者`移动`原有的`common文件夹`,然后再`pull`(`check`,`switch`)即可解决

  - 结果如下图：

    `common`文件名已经变更为`COMMON`

    ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png)

### 3. 切换分支 & merge 代码

如果上一步问题解决了那么这一步就没什么异常了，`user2` 的分支代码已经被更新了

- 切分支

  ```bash
  git checkout feature/user2
  ```

- `merge` 代码

  ```bash
  git merge master # 更新 feature/user2 分支
  ```

### 4 查看 commit 记录

- 如下图：

  ![15_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/15_git大小写不敏感引发的问题.png)

### 5 恭喜同步成功

![33.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/33.jpg)

### 1 关闭 敏感模式·情况二

```bash
git config core.ignorecase true # git 默认不敏感
```

### 2. 切分支 & pull 代码

- 切分支

  ```bash
  git che master
  ```

- 拉代码

  ```bash
  git pull # 更新 master 分支
  ```

  结果如下图：

  ![13_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/13_git大小写不敏感引发的问题.png)

  惊不惊喜意不意外？

  ![40.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/40.jpg)

  虽然远端的文件名已经由`common` => `COMMON`,但是当`user2` 执行`pull`的时候本地的文件名依旧还是老的`common`

### 3. 更改文件名、切换分支、merge master

- 先更改文件名  
  `common` => `COMMON`

- 再切换分支：

  ```bash
  git checkout feature/user2
  ```

  `COMMON文件夹`变成空的了

  ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png)

  ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png)

- 最后执行 `merge` 后的变化如下：

  ```bash
  git merge master
  ```

  `COMMON文件夹`又有内容了

  ![14_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/14_git大小写不敏感引发的问题.png)

### 4. 查看 commit

- 记录如下：

  ![15_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/15_git大小写不敏感引发的问题.png)

### 5. 恭喜同步成功

![03.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/03.jpg)

# 另外一种方式 git rm

- 删除文件夹

  ```bash
  git rm <文件夹路径> -r # -r 表示递归
  ```

- 删除文件

  ```bash
  git rm <文件路径>
  ```

## [user1]向远端同步变更

### 1. 开启 敏感模式·情况一

```bash
git config core.ignorecase false
```

### 2. 制作副本

`common` => `common copy`

### 3. 使用 rm 删除 common 文件夹

```bash
 git rm ./src/components/common -r # -r 表示递归
```

### 4. 还原名字

- `common copy` => `COMMON`

  看到这里有的同学该问了为啥不拷贝副本 common copy 以后直接对其变更名字呢？？？？问的好啊。鼓掌 👏

  ![16_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/16_git大小写不敏感引发的问题.png)

  看到这个结果·····

  ![06.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/06.jpg)

### 5. 暂存、commit、merge 到 master、推到远端

在这一步 你将遇到如下错误信息导致切换分支失败 (跟上面的还不太一样)

- check 出问题

  ```bash
  KaKa:test xxxx$ git che master

  error: 工作区中下列未跟踪的文件将会因为检出操作而被覆盖：
          src/components/common/FootCell/index.vue
          src/components/common/Pagination/index.vue
          src/components/common/Table/index.vue
          src/components/common/TitleCell/index.vue
  请在切换分支前移动或删除。
  正在终止
  ```

  此时的项目结构是这样子的：

  ````bash
  .
  ├── README.md
  ├── main.js
  └── src
      └── components
          └── COMMON
              ├── FootCell
              │   └── index.vue
              ├── Pagination
              │   └── index.vue
              ├── Table
              │   └── index.vue
              └── TitleCell
                  └── index.vue
                  ```
  ````

  并没有`common`文件夹！!那么就无解了？？但是否定的！那我们就把`COMMON`=> `common`,再删除`common`,最后执行 `git check master`就可以了~

- merge 出问题

  ```bash
  KaKa-3:test xxxx$ git mer feature/user1

  更新 5f318b9..24b399d
  error: 工作区中下列未跟踪的文件将会因为合并操作而被覆盖：
          src/components/COMMON/FootCell/index.vue
          src/components/COMMON/Pagination/index.vue
          src/components/COMMON/Table/index.vue
          src/components/COMMON/TitleCell/index.vue
  请在合并前移动或删除。
  正在终止
  ```

  并没有`COMMON`,处理方法同上，`git merge feature/user1`就可以了~

### 6. 查看 comit 记录

- 如下图：
  ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png)

### 1. 关闭 敏感模式·情况二

```bash
git config core.ignorecase true
```

### 2. 更改文件名

- `common` => `COMMON`

  然而尴尬的一幕它发生了！！！如下图：

  ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png)

  ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png)

  卧槽！ Git 并没有检测到 文件有变化！

### 3. 卒!

- 这种情况要么放弃，要么开启敏感模式！如果开启那就是`情况一`了

  ![46.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/46.jpg)

## [user2]更新变更

- 此时 `user2` `master` 分支初始目录如下：

  ```bash
  .
  ├── README.md
  ├── main.js
  └── src
      └── components
          └── common
              ├── FootCell
              │   └── index.vue
              ├── Pagination
              │   └── index.vue
              ├── Table
              │   └── index.vue
              └── TitleCell
                  └── index.vue
  ```

### 1. 开启 敏感模式·情况一

```bash
git config core.ignorecase false
```

### 2. pull 最新代码

```bash
KaKa:test2  xxxx$ git pull
更新 5f318b9..24b399d
error: 工作区中下列未跟踪的文件将会因为合并操作而被覆盖：
        src/components/COMMON/FootCell/index.vue
        src/components/COMMON/Pagination/index.vue
        src/components/COMMON/Table/index.vue
        src/components/COMMON/TitleCell/index.vue
请在合并前移动或删除。
正在终止
```

不出所料 会跟开头讲的 状况一致，这里就不重复赘述了，参考上面的即可解决。

### 3. 查看 commit 记录

- 如下图:

  ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png)

### 1. 关闭 敏感模式·情况二

```bash
git config core.ignorecase true
```

### 2. pull 最新代码

- 如下图

  ![18_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/18_git大小写不敏感引发的问题.png)

  同前面所说,变更都过来了，唯独文件名由于本地的大小写不敏感，所以没有自动变更名字

### 3. 手动更改文件名

`common` => `COMMON`

### 4. 切换分支，mer master 代码

```bash
git checkout feature/user2

git mer master
```

### 5. 查看 commit 记录

- 如下图:

  ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png)

## 总结

带总结
