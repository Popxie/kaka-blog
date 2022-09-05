<!--
 * @Description: npm&yarn文件夹
 * @Author: xiehuaqiang
 * @Date: 2022-09-05 14:42:44
 * @LastEditTime: 2022-09-05 14:58:51
 * @LastEditors: KaKa_Xie mrxiehuaqiang@163.com
 * @FilePath: /kaka-blog/src/docs/kaka/npm-yarn/未公开/npm link.md
-->

# 如何使用 npm link 软连接来进行本地调试

## 1.在要本地调试的包 scripts 中执行 npm link（以 scripts 包为例）

```sh
# 以cli/packages/scripts为例，创建一个全局的链接
# cd 到 scripts 目录
npm link
```

最后会输出:

```sh
# 意思是在公共包管理路径/Users/kaka/.nvm/versions/node/v12.22.10/lib/node_modules连接了本地的scripts包
/Users/kaka/.nvm/versions/node/v12.22.10/lib/node_modules/@sharkr/scripts -> /Users/kaka/Project/NetEase/cli/packages/scripts
```

## 2.在使用本地库 scripts 的项目中执行 npm link '包名'

```sh
# @sharkr/scripts 为package.json中的name字段的value
npm link @sharkr/scripts
```

最后会输出：

```sh
# 我个人理解：当调用此仓库时，先从项目->再到全局->最后到本地仓库文件夹
/Users/kaka/Project/NetEase/lms-frontend/node_modules/@sharkr/scripts ->
/Users/kaka/.nvm/versions/node/v12.22.10/lib/node_modules/@sharkr/scripts ->
/Users/kaka/Project/NetEase/cli/packages/scripts
```

## 3.取消 link, 解除连接

### 3.1 项目中执行

```sh
# 使用包的项目
npm unlink @sharkr/scripts
```

### 3.2 包项目中执行

```sh
# 包
npm unlink
```
