<!--
 * @Description: npm&yarn文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/npm-yarn/npm相关命令.md
 * @Date: 2021-06-17 19:52:27
 * @LastEditTime: 2021-06-17 19:54:33
-->

# npm相关命令

## 1.查看 npm 命令帮助

```bash
npm help <key>
npm help config
```

## 2.查看全局依赖安装路径

```bash
npm root -g
```

## 3.查看安装了哪些全局依赖

```bash
npm list -g  # 全部层级关系展开

npm list -g --depth 0 # 0 表示只查看一级的，1表示两级，以此类推。
```

## 4.npm 更新

```bash
npm install npm -g
```

## 5.查看 npm 配置信息

```bash
npm config list # 配置详情，可以看到npm的安装路劲和node 安装的地方
```

## 6.更改镜像源头

```bash
# https://registry.npm.taobao.org/
npm config set registry <URL>
```
