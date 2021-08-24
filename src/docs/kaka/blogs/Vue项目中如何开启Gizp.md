<!--
 * @Description: 前端工程化文件
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/blogs/Vue项目中如何开启Gizp.md
 * @Date: 2021-03-03 17:55:59
 * @LastEditTime: 2021-08-24 17:03:15
-->

# Vue 项目中如何开启 Gizp

## 系统环境

```yaml
Operating System: macOS Catalina 10.15.7
Node Version: v12.16.1
Webpack Version: v4.44.2 # @vue/cli 4.5.9配套生成
compression-webpack-plugin Version: v6.0.0
```

> gizp 压缩是一种 http 请求优化方式，通过减少文件体积来提高加载速度，对于用户量多的网站，开启 gizp 压缩会大大降低服务器压力，提高加载速度，降低服务器流量成本有两种开启方式

```bash
gzip配置的常用参数
gzip on|off; #是否开启gzip
gzip_buffers 32 4K| 16 8K #缓冲(压缩在内存中缓冲几块? 每块多大?)
gzip_comp_level [1-9] #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
gzip_disable #正则匹配UA 什么样的Uri不进行gzip
gzip_min_length 200 # 开始压缩的最小长度(再小就不要压缩了,意义不在)
gzip_http_version 1.0|1.1 # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)
gzip_proxied # 设置请求者代理服务器,该如何缓存内容
gzip_types text/plain application/xml # 对哪些类型的文件用压缩 如txt,xml,html ,css
gzip_vary on|off # 是否传输gzip压缩标志
```

**`注意：`**

> 图片/mp3 这样的二进制文件,不必压缩 因为压缩率比较小, 比如 100->80 字节,而且压缩也是耗费 CPU 资源的.比较小的文件不必压缩.

## 第一种方式

- 通过 webpack plugin 插件 & Nginx 配置方式

### 1.1 安装 `compression-webpack-plugin`插件

```bash
npm install compression-webpack-plugin --save-dev

or

yarn add compression-webpack-plugin -D
```

**`注意：`**

> 当前版本的 webpack（v4.44.2）不支持 `compression-webpack-plugin: v7.0.0`，需要降级至`v6.0.0`!!!

```bash
# 直接编译报错
TypeError: Cannot read property 'tapPromise' of undefined
```

### 1.2 vue.config.js 配置[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)插件

```js
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['html', 'js', 'css']
chainWebpack: config => {
  config
    .plugin('Compress')
    .use(CompressionPlugin, [
      {
        filename: '[path][base].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: true // 删除原文件
      }
    ])
    .end()
}
```

### 1.3 Nginx 配置 gzip

```bash
# vim /etc/nginx/conf.d/locations/kdadmin.conf
location / {
  alias   /home/admin/kdadmin/kada-admin/;
  index  index.html index.htm;
  gzip_static off; #静态压缩 开启gizp
}
```

### 1.4 重新 reload Nginx 配置

```bash
sudo nginx -s reload
```

这种模式需要前端工程打包生成 gzip，然后 Nginx 开始 gzip 相关配置

## 第二种方式纯 Nginx 配置

### 2.1 在 nginx.conf 文件夹的`http`里面配置数据

```bash
1.  gzip on; #开启或关闭gzip on off
2.  gzip_min_length 5k; #gzip压缩最小文件大小，超出进行压缩（自行调节）
3.  gzip_buffers 4 16k; #buffer 不用修改
4.  gzip_comp_level 8; #压缩级别:1-10，数字越大压缩的越好，时间也越长
5.  gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; #  压缩文件类型
6.  gzip_vary on; # 和http头有关系，加个vary头，给代理服务器用的，有的浏览器支持压缩，有的不支持，所以避免浪费不支持的也压缩，所以根据客户端的HTTP头来判断，是否需要压缩
```

```bash
# sudo vim /etc/nginx/nginx.conf
http {
  # 开启gzip
  gzip on;

  # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
  gzip_min_length 1k;

  # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
  gzip_comp_level 1;

  # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;

  # 禁用IE 6 gzip
  gzip_disable "MSIE [1-6]\.";

  # 设置压缩所需要的缓冲区大小
  gzip_buffers 32 4k;

  # 设置gzip压缩针对的HTTP协议版本
  gzip_http_version 1.0;
}
include /etc/nginx/conf.d/upstreams/*.conf;
server {}
```

### 2.2 重新 reload Nginx 配置

```bash
sudo nginx -s reload
```

## 最终效果

未开启 gzip：

<!-- ![11_未开启gzip的效果](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/11_未开启gzip的效果.jpeg) -->

![11_未开启gzip的效果](https://user-images.githubusercontent.com/24952644/130588968-37863f19-8d97-43bb-9542-040740db43cd.jpeg)

开启 gzip：

<!-- ![12_开启gzip后的效果](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/12_开启gzip后的效果.jpeg) -->

![12_开启gzip后的效果](https://user-images.githubusercontent.com/24952644/130588975-babfbea4-c467-491e-b616-a1766c984e29.jpeg)

## 结语

> 虽然说两种都能实现，但是`不推荐`第一种方案，需要多写一些额外的代码，增加操作流程，而且路子还有点野。建议还是直接第二种。

[阅读原文](https://www.yuque.com/fanyanshi/wtlemm/ggiwq9)
