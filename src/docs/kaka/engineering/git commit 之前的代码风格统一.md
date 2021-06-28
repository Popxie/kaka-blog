<!--
 * @Description: 前端工程化文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/engineering/git commit 之前的代码风格统一.md
 * @Date: 2021-07-27 21:12:00
 * @LastEditTime: 2021-07-27 21:12:26
-->

# 【前端工程化】之 git commit 之前的代码风格统一

## 前言

在多人协作共同参与项目开发期间，由于每个人都有自己的代码风格及偏好，这么一来人越多项目风格最后就会越千奇百怪。最后看着就像一座五彩斑斓的屎山！如果只能做一座屎山，那也要是一座风格统一的屎山⛰！！！

![55.gif](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/55.gif)

所以在多人协作过程中对有没有什么方案来让大家在最后进行 commit 的时候风格统一呢？答案当然是有的。不然我写这篇笔记虾扯蛋呢？？？hahahahaha…… 接下来那就请跟着文章往下看吧~~

![52.jpg](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/52.jpg)

## 你能学到什么？

- 如何将项目代码进行 风格统一 (`!important`)
- `git hooks` （`pre-commit`）
- 执行 `husky` 遇到的"坑"
- 配置 `lint-staged` 遇到的 "坑"

## 1. eslint 相关插件

- 安装 `eslint` `eslint-plugin-vue` & 使用

  详情参考 [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#installation) 官方文档

## 2. husky

- 安装 `husky`

  ```bash
  npm install husky -D
  ```

- 执行 `husky` 相关命令 生成配置文件(夹) `.husky`

  - 手动模式 (修改 package.json 中的 scripts)

    ```json
    // package.json
    "scripts": {
      ···
      "prepare":"husky install"
      ···
    }
    ```

  - 自动模式

    ```bash
    npm set-script prepare "husky install" && npm run prepare
    ```

    > 注: 需要 npm 版本 Version 7.x(npm set-script 命令需要 7.x)

    或者：

    ```bash
    node_modules/husky/lib/bin.js install
    ```

- 添加 git hooks

  ```bash
  # 创建 pre-commit 且 写入 npx lint-staged 结果如下
  npx husky add .husky/pre-commit "npx lint-staged"
  ```

  ```bash
  # .husky/pre-commit

  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npx lint-staged # 这就是上面命令执行后的产物
  ```

## 3. lint-staged

虽然可以直接使用 eslint 对项目进行检测，但是检测时间会随会项目的复杂度增大而增大。每次 commit 之前都对项目进行全局 eslint 性能肯定不会好！ 所以我们可以通过 lint-stage 只对每次参与变动的文件进行 eslint 检测！从而实现远端代码的风格统一。

- 安装

  ```bash
  npx mrm@2 lint-staged
  ```

  此时 package.json 会生成这么一个对象

  ```json
    // package.json
    "lint-staged": {
      "*.js": "eslint --cache --fix"
    }
  ```

  但是我的项目是 vue 项目，所以要做如下改动：

  ```json
  "lint-staged": {
    "*.{js,vue}": "eslint --fix" // 注意！{}中不可以有空格！！！
  }
  ```

- 触发

  执行 `git commit -m <message>`就会触发对相关改动的文件进行 eslint

  ```bash
  $ git commit -m <message>

  # eslint 进行时
  ✔ Preparing...
  ✔ Running tasks...
  ✔ Applying modifications...
  ✔ Cleaning up...
  ✔ Preparing...
  ```

  ```bash
  $ git commit -m <message>

  # eslint 执行结束
  ✔ Preparing...
  ✔ Running tasks...
  ✔ Applying modifications...
  ✔ Cleaning up...
  ✔ Preparing...
  ✔ Running tasks...
  ✔ Applying modifications...
  ✔ Cleaning up...
  ```

## 总结

已上就是 我在代码风格统一 层面做的一些配置，利用 pre-commit 钩子，对改动的文件进行 eslint ,这样开发的时候开发人员依旧可以按照自己的风格去开发，但是最后会在正式commit之前,代码会按照eslint配置文件信息对代码进行格式化&检查错误！

最后希望这篇文章能给大家带来 一些收获~ 也请各位大佬`点赞+评论+关注`啊  可怜可怜孩子吧~🥺

![54.gif](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/54.gif)

## 预告

后面还会有 1-2篇`【前端工程化】`文章，目前由于公司业务太忙，没时间写，不过已经再准备阶段了。一边实践一边记录，毕竟**实践是检验真理的唯一标准**

## 参考文献

- 官方文档：

  [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#installation)

  [husky](https://github.com/typicode/husky)

  [lint-staged](https://github.com/okonet/lint-staged)

- 第三方：

  [[前端工程化]-使用 husky 添加 git hooks·知乎](https://zhuanlan.zhihu.com/p/379717545)
