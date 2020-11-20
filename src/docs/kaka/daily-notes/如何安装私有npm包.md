<!--
 * @Description: npm&yarn文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/daily-notes/如何安装私有npm包.md
 * @Date: 2021-06-17 17:46:04
 * @LastEditTime: 2021-06-17 17:54:08
-->

# 如何安装私有 npm 包

1.由于使用了私有 npm, 首先安装 npm registry 管理工具

```bash
npm install -g nrm
```

2.添加私服地址到 nrm

```bash
nrm add cfnpm http://cfnpm.dev.yuceyi.com:4873/
```

通过 nrm ls 可以查看我们可以使用的镜像源

3.切换私服地址

```bash
nrm use cfnpm
```

4.安装@cf/cscp-vue

```bash
npm install @cf/cscp-vue -S
```

或者直接直接指定 registry：

```bash
npm install @cf/cscp-vue --registry http://cfnpm.dev.yuceyi.com:4873
```
