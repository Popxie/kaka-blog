<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/webpack-one.md
 * @Date: 2021-06-17 21:35:51
 * @LastEditTime: 2021-06-17 21:40:28
-->

# Webpack

[1.webpack 打包优化的四种方法（多进程打包（thread-loader ），多进程压缩（terser-webpack-plugin），资源 CDN（externals），动态 polyfill）](https://www.cnblogs.com/hashtang/p/11873796.html)

[2.webpack 中那些最易混淆的 5 个知识点](https://juejin.im/post/5cede821f265da1bbd4b5630)

[3.Vue Cli3 项目打包优化](https://www.jianshu.com/p/476387c7fea3)

| loader       | 作用                      |
| ------------ | ------------------------- |
| babel-loader | 转换 es6·es7 等 js 新特性 |
| css-loader   | 支持 css 文件的加载和解析 |
| less-loader  | 将 less 文件转换成 css    |
| ts-loader    | 将 ts 转换成 js           |
| file-loader  | 进行图片字体等打包        |
| raw-loader   | 将文件以字符串的形式导入  |

```text
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。

loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
```

| plugin                   | 作用                                                 |
| ------------------------ | ---------------------------------------------------- |
| OptimizeCssAssetsPlugin  | 压缩 css 资源文件                                    |
| UglifyJsPlugin           | 压缩混淆 JS（默认自带）                              |
| CleanWebpackPlugin       | 清理构建目录                                         |
| ExtractTextWebpackPlugin | 将 css 从 bundle 文件里提取成一个独<br>立的 css 文件 |
| CommonsChunkPlugin       | 将 chunks 相同的模块代码抽离成公<br>共 js            |
| HtmlWebpackPlugin        | 创建 html 文件去承载输出的 bundle                    |
| ZipWebpackPlugin         | 将打包出的资源生成一个 zip 包                        |

## Gzip

```js
productionGzip: true
```

开启以后打包构建后的产物是.gz 文件，  
后台 nginx 开启 gzip 模式访问，浏览器访问项目，自动会找到 .gz 的文件。加载速度明显提高。

## 代码分割

[提高代码使用率的关键技术 — 代码分割（code splitting）·掘金](https://juejin.im/post/5e796ec1e51d45271e2a9af9#heading-5)

- ### 什么是「代码分割」（code splitting）？

代码分割是指，将脚本中无需立即调用的代码在代码构建时转变为异步加载的过程。

在 Webpack 构建时，会避免加载已声明要异步加载的代码，异步代码会被单独分离出一个文件，当代码实际调用时被加载至页面。

- ### 代码分割的原理

代码分割技术的核心是「异步加载资源」，可喜的是，浏览器允许我们这么做，W3C stage 3 规范： [whatwg/loader](https://whatwg.github.io/loader/) 对其进行了定义：你可以通过 import() 关键字让浏览器在程序执行时异步加载相关资源。

IE 浏览器目前并不支持这一特性，但这并不意味着你的异步加载功能在 IE 浏览会失效（那太可怕了 🤦‍♂️），实际上，Webpack 底层帮你将异步加载的代码抽离成一份新的文件，并在你需要时通过 JSONP 的方式去获取文件资源，因此，你可以在任何浏览器上实现代码的异步加载，并且在将来所有浏览器都实现 import() 方法时平滑过渡，cool！👍

- ### 代码分割的类型

  - 静态分割
  - ‘动态’分割（实际上它并不意味着异步调用的代码是 “动态” 生成的）

⚠️ 注意：在 Vue 中，可以直接使用 import() 关键字做到这一点，而在 React 中，你需要使用 react-loadable 去完成同样的事。

## 魔术注释

[提高代码使用率的关键技术 — 代码分割（code splitting）·掘金](https://juejin.im/post/5e796ec1e51d45271e2a9af9#heading-5)

魔术注释是由 Webpack 提供的，可以为代码分割服务的一种技术。通过在 import 关键字后的括号中使用指定注释，我们可以对代码分割后的 chunk 有更多的控制权，让我们看一个例子：

```js
// index.js
import(
  /* webpackChunkName: “my-chunk-name” */
  './footer'
)
```

同时，也要在 webpack.config.js 中做一些改动：

```js
// webpack.config.js
{
  output: {
    filename: “bundle.js”,
    chunkFilename: “[name].lazy-chunk.js”
  }
}
```

通过这样的配置，我们可以对分离出的 chunk 进行命名，这对于我们 debug 而言非常方便。

### Webpack Modes

除了上面提到过得 webpackChunkName 注释外，Webpack 还提供了一些其他注释让我们能够对异步加载模块拥有更多控制权，例如下方这个例子：

```js
import(
  /* webpackChunkName: “my-chunk-name” */
  /* webpackMode: lazy */
  './someModule'
)
```

webpackMode 的默认值为 lazy 它会使所有异步模块都会被单独抽离成单一的 chunk，若设置该值为 lazy-once，Webpack 就会将所有带有标记的异步加载模块放在同一个 chunk 中。

### Prefetch or Preload

通过添加 webpackPrefetch 魔术注释，Webpack 令我们可以使用与 <link rel=“prefetch”> 相同的特性。让浏览器会在 Idle 状态时预先帮我们加载所需的资源，善用这个技术可以使我们的应用交互变得更加流畅。

```js
import(
  /* webpackPrefetch: true */
  './someModule'
)
```

**⚠️ 注意：你确保你的代码在未来一定会用到时，再开启该功能。**
