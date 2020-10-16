
### 1.查看npm命令帮助  

```
npm help <key>
npm help config
```
### 2.查看全局依赖安装路径

```
npm root -g
```  

### 3.查看安装了哪些全局依赖

```
npm list -g  // 全部层级关系展开
// 0 表示只查看一级的，1表示两级，以此类推。
npm list -g --depth 0
```


### 4.npm更新

```
npm install npm -g
```

### 5.查看npm配置信息

```
npm config list // 配置详情，可以看到npm的安装路劲和node 安装的地方
```

### 6.更改镜像源头

```
// https://registry.npm.taobao.org/ 
npm config set registry <URL>
```