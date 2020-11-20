<!--
 * @Description: npm&yarn文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/npm-yarn/npm和yarn.md
 * @Date: 2021-06-17 19:51:54
 * @LastEditTime: 2021-06-17 20:20:17
-->

# npm & yarn

## npm 包管理历史发展

- npm 出现之前：前端依赖项是保存到存储库中并手动下载的
- 2010：npm 发布并支持 nodejs
- 2012：npm 的使用量急剧增加——主要是由于 Browserifys 浏览器的支持
- 2012：npm 有了一个竞争对手 bower，它完全支持浏览器
- 2012-2016：前端项目的依赖项数量成倍增加
- 2012-2016：构建和安装前端应用变得越来越慢
- 2012-2016：大量（重复的）依赖项存储在神奇的 node_modules 内的嵌套文件夹中 ☢️
- 2012-2016：rm -rf node_modules 成为前端开发人员最常用的命令。
- 2015：bower 输给了 npm
- 2015：node_modules 被修改为扁平化的文件结构！
- 2016： left-pad 成为当时的新闻头条
- 2016： yarn 发布
  - 支持 npm 和 bower 仓库
  - yarn.lock 能够锁定安装的版本并提供确定性的依赖关系。不再 rm -rf node_modules！
  - yarn install 花费的时间是 npm install 的一半（不使用缓存的前提下）
  - 缓存和脱机模式使构建过程几乎不花费时间
- 2016：npm 发布 shrinkwrap
  - 尝试处理依赖项锁定
  - 不幸的是，一些错误和超出其管理能力的承诺导致该工具的声誉下降
- 2017：npm 5 发布
  - package-lock.json 是他们的新工具，shrinkwrap 被放在一边
  - package-lock.json 开始与 yarns 锁定文件竞争
- 2018：npm ci 发布
  - 直接用 package-lock.json 构建代码
  - 没有代价高昂的依赖项安全性分析和版本分析
  - 大大减少了在构建服务器上的构建时间！
- 2018：npm 6 发布 ‍♀️
  - npm 检查要安装的依赖项中的安全漏洞
  - yarn 和 npm 的构建时间不再有显差异
- 2019：tink 开始进入 beta 模式

  - 避免使用 node_modules，而是为项目中的每个依赖项创建一个带有哈希值的文件
  - 尚未做好投入生产环境的准备

- ...

[阅读原文·知乎](https://zhuanlan.zhihu.com/p/99186425)

---

## 常用命令

### 1.初始化一个新的项目

```bash
yarn init --yes # 简写 -y

npm init --yes # 简写 -y
```

### 2.添加项目依赖/开发依赖

```bash
yarn add <package> [--dev/-D] // 不带-D默认生产环境
yarn add [package]@[version] #带版本

npm install XXX --save 可以简写成npm i XXX -S --------> 安装项目依赖
npm install XXX --save-dev可以简写成npm i XXX -D ------> 安装开发依赖
```

### 3.查看源和换源

```bash
npm config get registry  // 查看npm当前镜像源
npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

yarn config get registry  // 查看yarn当前镜像源
yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像

镜像源地址部分如下：
npm --- https://registry.npmjs.org/
cnpm --- https://r.cnpmjs.org/
taobao --- https://registry.npm.taobao.org/
```

### 4.全局安装一个依赖

```bash
yarn global add [package]

npm install [package] -g
```

### 5.移除一个依赖

```bash
yarn remove <packageName>

npm uninstall <packageName> -S
```

### 6.全局删除一个依赖

```bash
yarn global remove <packageName>

npm uninstall -g <packageName>
```

### 7.安装所有依赖包

```bash
yarn
npm install || npm i
```

### 8.升级依赖

```bash
yarn upgrade # 升级所有依赖项，不记录在 package.json 中
npm update # npm 可以通过 ‘--save|--save-dev’ 指定升级哪类依赖

yarn upgrade webpack # 升级指定包
npm update webpack --save-dev # npm

yarn upgrade --latest # 忽略版本规则，升级到最新版本，并且更新 package.json
```

### 9.列出全局安装的所有依赖

```bash
yarn global list --depth=0    # 限制依赖的深度

npm list -g --depth=0
```

### 10.缓存清理

```bash
yarn cache clean

npm cache clean --force
```

### 11.查看依赖所有历史版本

```bash
yarn info <package...>

npm v <package...> versions  //缩写
```

## 优缺点

### 基于 `npm`, `yarn` 做了哪些优化

- `并行安装`： 无论 `npm` 还是 `yarn` 在执行包的安装时，都会执行一系列任务。 `npm` 是按照队列执行每个 `package` ，也就是说必须要等到当前 `package` 安装完成之后，才能继续后面的安装。而 yarn 是同步执行所有任务，提高了性能。

- `离线模式`: 如果之前已经安装过一个软件包，用 `yarn` 再次安装时之间从缓存中获取，就不用像 `npm` 那样再从网络下载了。

- `安装版本统一`: 为了防止拉取到不同的版本，`yarn` 有一个锁定文件 (`lock file`) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，`yarn` 就会创建（或更新）`yarn.lock` 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。

- `更好的语义化`: `yarn` 改变了一些 `npm` 命令的名称，比如 `yarn add/remove`，比 `npm` 原本的 `install/uninstall`要更清晰。

**注意 cnpm 不支持 package-lock**

，

> 使用 `cnpm install` 时候，并不会生成 `package-lock.json` 文件。`cnpm install` 的时候，就算你项目中有 `package-lock.json` 文件，cnpm 也不会识别，仍会根据 package.json 来安装。所以这就是为什么之前你用 `npm` 安装产生了 `package-lock.json`，后面的人用 cnpm 来安装，可能会跟你安装的依赖包不一致。

因此，尽量不要直接使用 `cnpm install` 安装项目依赖包。但是为了解决直接使用 `npm install` 速度慢的问题，可以设置 `npm` 代理解决。

```bash
# 设置淘宝镜像代理
npm config set registry https://registry.npm.taobao.org

# 查看已设置代理
npm config get registry
```

[阅读原文](https://mp.weixin.qq.com/s/HXiI1QIbknzwaPlquVVs4Q)
