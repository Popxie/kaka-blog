[1.webpack 打包优化的四种方法（多进程打包（thread-loader ），多进程压缩（terser-webpack-plugin），资源 CDN（externals），动态 polyfill）](https://www.cnblogs.com/hashtang/p/11873796.html)  

[2.webpack 中那些最易混淆的 5 个知识点](https://juejin.im/post/5cede821f265da1bbd4b5630)

[3.Vue Cli3 项目打包优化](https://www.jianshu.com/p/476387c7fea3)

## 

loader|作用
---|---
babel-loader | 转换es6·es7等js新特性
css-loader | 支持css文件的加载和解析
less-loader | 将less文件转换成css
ts-loader | 将ts转换成js
file-loader |进行图片字体等打包
raw-loader |将文件以字符串的形式导入

```
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。 

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。

loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
```

plugin|作用
---|---
OptimizeCssAssetsPlugin | 压缩css资源文件
UglifyJsPlugin | 压缩混淆JS（默认自带）
CleanWebpackPlugin | 清理构建目录
ExtractTextWebpackPlugin | 将css从bundle文件里提取成一个独<br>立的css文件
CommonsChunkPlugin | 将chunks相同的模块代码抽离成公<br>共js
HtmlWebpackPlugin | 创建html文件去承载输出的bundle
ZipWebpackPlugin | 将打包出的资源生成一个zip包


## Gzip
```
productionGzip: true
```
开启以后打包构建后的产物是.gz文件，  
后台nginx开启gzip模式访问，浏览器访问项目，自动会找到 .gz 的文件。加载速度明显提高。