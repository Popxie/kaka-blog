<!--
 * @Description: Terminal文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/unpublished/Mac环境快速生成目录结构树.md
 * @Date: 2021-03-03 17:51:13
 * @LastEditTime: 2021-06-17 21:14:41
-->

# Mac 环境快速生成目录结构树

## 1. 安装 tree

```bash
brew install tree
```

## 2. 使用

```bash
# 进入到要生成tree目录
# xx表示输出目录层级
# yy.md生成的文件（也可以是其他后缀的文件 yy.js等）
tree -L xx > yy.md
```

## 3. demo

```bash
├── README.md
├── babel.config.js
├── deploy.sh
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
├── vue.config.js
└── yarn.lock
```
