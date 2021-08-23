<!--
 * @Description: Git文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/git/【Git系列】Git 大小写不敏感引发的血案.md
 * @Date: 2021-06-24 18:43:38
 * @LastEditTime: 2021-08-23 17:02:15
-->

# Git 大小写不敏感引发的血案

<!-- ![26_Git](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/26_Git.jpeg) -->

![26_Git](https://user-images.githubusercontent.com/24952644/127745828-4ebd8f1a-03f2-4e82-84d5-4d45bc438e1c.jpeg)

## 前言

> 由于当年太年轻，资历不够深！！！导致文件命名不规范，现在想更正文件夹名字（`common => COMMON`），结果发现一个很奇特的现象！ <font color="green">git 对文件(夹)名的大小写不敏感！！！！</font>引发了一些问题。最终经过查阅资料得以解决，遂！写下这篇帖子记录一下。走\~跟着渣渣一起吃着花生 🥜 喝着啤酒 🍺 燥起来~

<!-- ![13.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/13.jpg) -->

![13](https://user-images.githubusercontent.com/24952644/127745945-1c50d845-d10c-4042-b683-78cab7e73e52.jpg)

## demo 部分目录结构

- `master` 分支的代码及文件目录情况

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

> 因为 这里 `git` 大小写不敏感所以只进行文件名变更(大小写)的话，不会被 `git` 检测到，所以必须要改动一个文件，让 `git` 检测到变更。才能进行`commit`!刚好文件名的变更导致了引用路径也需要变更！因此本次可以进行提交

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

### `pull` 代码

- `user2`于是乎就先`pull`然后`merge`了一下，把 `user1` 的代码同步到自己的分支，结果如下：

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

  这个时候，“~~报应~~”来的太突然，项目报错了！引用的路径是`COMMON`而实际项目的路径是`common`

  ![18.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/18.jpg)

- 然后`user2`就好奇为啥会是这种情况,文件名没有变化？？于是乎开启了探索之路~~

### 探索问题

> 因为`user1`被<font color="green">绿</font>了一波，心情不好搞事情，害得`user2`引发了 bug，但是刚好激发了`user2`的好奇心。

- 为啥`user1`的是 `COMMON`,到我这里是 `common`？？？

  最后`user2`查到了答案！ 原来是 `git` 对文件名的大小写不敏感，才会引发这个问题。好了那么接下来就是这么去解决这个问题呢？？

<strong>温馨提示</strong>

> 因为 `git` 默认不区分大小写，所以如果只更改文件名的话 `git` 并不会检测到文件有变化，固！无法进行 `commit`，所以这次测试在更改文件名的时候附带的改动了其他地方，以便提交！

### 解决问题

既然`user2`已经知道了 `git` 默认大小写不敏感，那就让他敏感呗。多简单！

## [user2]更新变更

### 1. 开启 敏感模式

```bash
git config core.ignorecase false # 让你变的敏感
```

![21.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/21.jpg)

> 其实`user1`压根就没有把文件名更改同步到到远端!(所以开头才说，他不知道 `git` 大小写不敏感!但是文件引用路径变更了，这个就导致其他人`(user2)`因为文件路径改变导致项目报错)

### 2. 切换分支，拉取最新代码

- 切分支 `checkout`

  ```bash
  git che master
  ```

- 拉代码 `pull`

  ```bash
  git pull
  ```

  > 这个时候就会发现项目无法启动，因为 `main.js` 中的文件路径引用已经由 `common => COMMON` 了，但实际文件名依旧是 `common`

### 3. 手动更改文件名

- `common` => `COMMON`

  ![19_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/19_git大小写不敏感引发的问题.png)

### 4. 暂存、提交、push、切分支、merge 到 feature/user2 分支

- 暂存 `add`

  ```bash
  git add .
  ```

- 提交 `commit`

  ```bash
  git commit -m user2手动同步更新文件名
  ```

  ![20_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/20_git大小写不敏感引发的问题.png)

- 推送 `push`

  ```bash
  # 这一步是替user1，将文件名变更同步到远端，供user3……等使用
  #（此时如果其他用户是之前拉取的分支那么也会出现本篇文章所描述的问题！）
  # 方法嘛~~ 就是当前文章~~哈哈哈
  git push
  ```

- 切分支 `checkout`

  ```bash
  git che feature/user2
  ```

  ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png)

  ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png)

- `merge` master 到 `feature/user2` 分支

  ```bash
  git merge master
  ```

  ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png)

  ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png)

### 查看 `commit` 记录

![12_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/12_git大小写不敏感引发的问题.png)

# 骚操作开始 第二种

> <font color="red">文件名变更实际已经同步到远端了，且引用路径也同步到了远端！</font>

- 这次`user1` 知道 `git` 大小写不敏感, `user2` 同样可知可不知，于是一开始就逼迫她，让她变得敏感再敏感！

  <!-- ![16.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/16.jpg) -->

  ![16](https://user-images.githubusercontent.com/24952644/127745696-0a945f56-214f-4368-8cab-fad8e5287331.jpg)

## [user1]向远端同步变更

- `user1` 的分支：`feature/user1`

### 1. 让她敏感敏感再敏感

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

- 暂存 `add`

  ```bash
  git add .
  ```

- 提交 `commit`

  ```bash
  git commit -m <msg>
  ```

### 4. 切换分支

- `git checkout master`

  <!-- ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png) -->

  ![08_D_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744838-0e7dbddb-d2d6-4327-bd5d-47f074d8b8ab.png)

  <!-- ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png) -->

  ![09_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744839-1e8457c4-289f-4f34-b464-d1d2856f57b7.png)

### 4.merge 到 master 并 pull 向远端

- `merge` 结果如下：

  ```bash
  git merge feature/user1 # user1的分支合并到本地master
  ```

  <!-- ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png) -->

  ![10_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744841-fcacfb50-7edc-460d-a097-7bb8b9cebb9f.png)

  <!-- ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png) -->

  ![11_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745023-c09737a0-f449-4679-ae7c-e0d18f52d640.png)

- 推送 `push`

  ```bash
  git push # 推送到远端master
  ```

## [user2]更新变更

- `user2` 的分支：`feature/user2`

### 1. 开启 敏感模式·情况一

```bash
git config core.ignorecase false
```

### 2. 切分支 & pull 代码

- 切分支 `checkout`

  ```bash
  git checkout master
  ```

- 拉代码 `pull`

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

    <!-- ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png) -->

    ![11_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745023-c09737a0-f449-4679-ae7c-e0d18f52d640.png)

### 3. 切换分支 & merge 代码

如果上一步问题解决了那么这一步就没什么异常了，`user2` 的分支代码已经被更新了

- 切分支 `checkout`

  ```bash
  git checkout feature/user2
  ```

- `merge` 代码

  ```bash
  git merge master # 更新 feature/user2 分支
  ```

### 4 查看 `commit` 记录

- 如下图：

  <!-- ![15_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/15_git大小写不敏感引发的问题.png) -->

  ![15_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744877-f041d362-88b0-4c9c-8cc4-16e9c9f3914a.png)

### 5 恭喜同步成功

<!-- ![33.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/33.jpg) -->

![33](https://user-images.githubusercontent.com/24952644/127745715-95ca8b5b-e213-4ba5-881a-7668a2424b86.jpg)

### 1 关闭 敏感模式·情况二

```bash
git config core.ignorecase true # git 默认不敏感
```

### 2. 切分支 & pull 代码

- 切分支 `checkout`

  ```bash
  git checkout master
  ```

- 拉代码 `pull`

  ```bash
  git pull # 更新 master 分支
  ```

  结果如下图：

  <!-- ![13_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/13_git大小写不敏感引发的问题.png) -->

  ![13_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744869-5e795044-9c8f-4507-a231-0cdd461bd1f4.png)

  惊不惊喜意不意外？

  <!-- ![40.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/40.jpg) -->

  ![40](https://user-images.githubusercontent.com/24952644/127745737-e5521f45-7c2a-4931-9519-891a0902ffc5.jpg)

  虽然远端的文件名已经由`common` => `COMMON`,但是当`user2` 执行`pull`的时候本地的文件名依旧还是老的`common`

### 3. 更改文件名、切换分支、merge master

- 先更改文件名  
  `common` => `COMMON`

- 再切换分支：

  ```bash
  git checkout feature/user2
  ```

  `COMMON文件夹`变成空的了

  <!-- ![08_D_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/08_D_git大小写不敏感引发的问题.png) -->

  ![08_D_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744838-0e7dbddb-d2d6-4327-bd5d-47f074d8b8ab.png)

  <!-- ![09_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/09_git大小写不敏感引发的问题.png) -->

  ![09_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744839-1e8457c4-289f-4f34-b464-d1d2856f57b7.png)

- 最后执行 `merge` 后的变化如下：

  ```bash
  git merge master
  ```

  `COMMON文件夹`又有内容了

  <!-- ![14_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/14_git大小写不敏感引发的问题.png) -->

  ![14_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744874-cb2c8b49-646d-4ff7-9397-29d408b8dd68.png)

### 4. 查看 `commit`

- 记录如下：

  <!-- ![15_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/15_git大小写不敏感引发的问题.png) -->

  ![15_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745179-e0015329-9a6b-4949-9010-ea282520b53c.png)

### 5. 恭喜同步成功

<!-- ![03.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/03.jpg) -->

![03](https://user-images.githubusercontent.com/24952644/127745730-8c5c289e-fea2-410a-b898-f9f63a8db343.jpg)

# 另外一种方式 git rm

- 删除文件夹 `rm`

  ```bash
  git rm <文件夹路径> -r # -r 表示递归
  ```

- 删除文件 `rm`

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

复制副本以后不能直接将 `common copy` 改成 `COMMON` (此时 `common` 还存在)

### 3. 使用 rm 删除 common 文件夹

```bash
 git rm ./src/components/common -r # -r 表示递归
```

### 4. 还原名字

- `common copy` => `COMMON`

  看到这里有的同学该问了为啥不拷贝副本 `common copy` 以后立马直接对其变更名字(`common copy => COMMON`),然后执行`第3步`操作呢？？？？问的好啊。鼓掌 👏

  <!-- ![16_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/16_git大小写不敏感引发的问题.png) -->

  ![16_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744880-5b8e6261-aa09-4850-ab1a-3a28116d0914.png)

  看到这个结果·····

  <!-- ![06.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/06.jpg) -->

  ![06](https://user-images.githubusercontent.com/24952644/127745681-9f310dea-2311-4a1d-9ecb-3926dd992932.jpg)

  其实本人也是很想这么操作的，可是现在回头想想，在不区分大小写的情况下:

  ```js
  common === COMMON // true,
  ```

  所以上面的提示是没有问题的 我个人认为

### 5. 暂存、commit、merge 到 master、推到远端

在这一步 你将遇到如下错误信息导致切换分支失败 (跟上面的还不太一样)

- `check` 出问题

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
          └── COMMON  <= # 重点！这里!!! 并没有 common
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

  并没有`common`文件夹！!那么就无解了？？但是否定的！那我们就:

  - 把`COMMON`=> `common`
  - 再删除`common`

    <!-- ![22_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/22_git大小写不敏感引发的问题.png) -->

    ![22_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744916-a02e37b1-4dc8-4974-8124-0696f0637470.png)

    <!-- ![23_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/23_git大小写不敏感引发的问题.png) -->

    ![23_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744920-3db6c48d-d21c-484c-b12e-10430e5c49f0.png)

  - 最后执行 `git check master`

  忽略执行删除后的文件变更，直接 `git checkout master`

- `merge` 出问题

  ```bash
  KaKa-3:test xxxx$ git merge feature/user1

  更新 5f318b9..24b399d
  error: 工作区中下列未跟踪的文件将会因为合并操作而被覆盖：
          src/components/COMMON/FootCell/index.vue
          src/components/COMMON/Pagination/index.vue
          src/components/COMMON/Table/index.vue
          src/components/COMMON/TitleCell/index.vue
  请在合并前移动或删除。
  正在终止
  ```

  并没有`COMMON`,处理方法同上:

  - 把`common`=> `COMMON`
  - 再删除`COMMON`

    <!-- ![24_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/24_git大小写不敏感引发的问题.png) -->

    ![24_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127744921-43431534-cc4b-485f-b2e7-7fa2791820c6.png)

    <!-- ![23_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/23_git大小写不敏感引发的问题.png) -->

    ![23_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745280-3057bd0b-6b84-42f1-a14f-6dc1b9b6d8e8.png)

  - 最后`git merge feature/user1`就可以了~

### 6. 查看 `commit` 记录

- 如下图：

  <!-- ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png) -->

  ![17_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745383-5c5fcfc4-d153-45fc-b68a-886810cc1ee0.png)

### 1. 关闭 敏感模式·情况二

```bash
git config core.ignorecase true
```

### 2. 更改文件名

- `common` => `COMMON`

  然而尴尬的一幕它发生了！！！如下图：

  <!-- ![11_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/11_git大小写不敏感引发的问题.png) -->

  ![11_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745302-d2e01197-26e6-4a8c-914b-05c949a81088.png)

  <!-- ![10_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/10_git大小写不敏感引发的问题.png) -->

  ![10_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745298-107a05d2-05f0-4214-a90a-79b3c3a3b4c0.png)

  卧槽！ `Git` 并没有检测到 文件有变化！

### 3. 卒!

- 这种情况要么放弃，要么开启敏感模式！如果开启那就是`情况一`了

  <!-- ![46.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/46.jpg) -->

  ![46](https://user-images.githubusercontent.com/24952644/127745682-d9302b02-08d8-4b9b-a294-344cc3117af5.jpg)

## [user2]更新变更

- 此时 `user2`的`master` 分支初始目录如下：

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

### 3. 查看 `commit` 记录

- 如下图:

  <!-- ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png) -->

  ![17_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745383-5c5fcfc4-d153-45fc-b68a-886810cc1ee0.png)

### 1. 关闭 敏感模式·情况二

```bash
git config core.ignorecase true
```

### 2. `pull` 最新代码

- 如下图

  <!-- ![18_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/18_git大小写不敏感引发的问题.png) -->

  ![18_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745590-03f11a8e-bd11-443d-8aa6-4affe44c4221.png)

同前面所说,变更都过来了，唯独文件名由于本地的大小写不敏感，所以没有自动变更名字

### 3. 手动更改文件名

`common` => `COMMON`

### 4. 切换分支，mer master 代码

- 切分支 `checkout`

  ```bash
  git checkout feature/user2
  ```

- `merge` 代码

  ```bash
  git merge master
  ```

### 5. 查看 `commit` 记录

- 如下图:

  <!-- ![17_git大小写不敏感引发的问题](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/17_git大小写不敏感引发的问题.png) -->

  ![17_git大小写不敏感引发的问题](https://user-images.githubusercontent.com/24952644/127745383-5c5fcfc4-d153-45fc-b68a-886810cc1ee0.png)

## 总结

综上的出来的结论就是多人协作开发的时候存在已下情况

- 第一种方式
  `user1` 两种， `user2` 两种，总共四种情况。且文件都被标记为<font color="green">A</font>

  - 都未开启敏感模式（绝大多数都是这个情况）  
    这种情况可想而知，远端的文件名一直都是 common 而非 COMMON，所有人乃至以后都会一直存在这个问题（自己本地需要去手动的更改文件名），

  - 都开启了敏感模式  
    这种情况 `user2` 在同步更新 `master` 分支代码的时候会遇到 `error`，根据提示删除或移动文件位置即可！（删除最简单直观）

  - 修改方(`user1`)开起了敏感模式，被通知方(`user2`)未开启
    虽然文件名已经被改动且同步到了远端，但是当 user2 （master）拉取的时候会发现自己本地的文件名依旧是 common 未改动。这个时候只需要手动的去更改文件名，然后 `merge` 到 `user2` 的分支即可

  - 修改方(`user1`)未开启敏感模式，被通知方(`user2`)开启了  
    `user1` 自以为文件名已经更改成功且同步到了远端，实际并没有同步到远端，`user2` 自己手动更改，更改后 `push` 到远端，这样所有人的文件引用路径错误问题都能得到解决

- 第二种方式

  通过`git rm` 这个操作来处理。通过这种方式变更文件会被标记为<font color="green">R</font>

<!-- 第三种方式 待验证 -->
<!-- git mv -f [file] [newfile] -->
## 结束语

已上所有内容都是经过好几遍测试，一边实践一边记录的形式来撰写的，最后也反复检查了好几遍，目测没有什么问题，如果有问题了就请留言告知吧~

<!-- ![47.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/47.jpg) -->

![47](https://user-images.githubusercontent.com/24952644/127745759-a7836174-c602-4c42-be8a-806611c98cd7.jpg)
