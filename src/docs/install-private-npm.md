## 如何安装私有npm包

1.由于使用了私有npm, 首先安装npm registry管理工具
```
npm install -g nrm  
```

2.添加私服地址到nrm  
```
nrm add cfnpm http://cfnpm.dev.yuceyi.com:4873/
```
通过 nrm ls 可以查看我们可以使用的镜像源

3.切换私服地址  
```
nrm use cfnpm  
```

4.安装@cf/cscp-vue
```
npm install @cf/cscp-vue -S
```

或者直接直接指定registry： 
```
npm install @cf/cscp-vue --registry http://cfnpm.dev.yuceyi.com:4873
```

