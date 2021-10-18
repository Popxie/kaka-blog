<!--
 * @Description: npm&yarn文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/npm-yarn/package.json中mian字段指向问题.md
 * @Date: 2021-08-23 11:49:28
 * @LastEditTime: 2021-08-23 11:53:05
-->

# package.json 中 main 字段的指向问题

## 入口

`package.json` 中的 `main` 字段指向的是 Library 的入口，通常有 3 个选择：

- 1.指向源代码入口文件，如 `src/index.js`;
- 2.指向打包后的开发版本，如 `dist/library.js`;
- 3.指向打包后的发布版本，如 `dist/library.min.js`。

引用 Library 的方式也分为两种：

- 1.通过 `script` 标签直接引用，适用于简单页面；
- 2.通过 `require` 或 `import` 方式引用，需要借助打包工具打包，适用于复杂页面。

本文探讨一下 `main` 字段如何指定，才能兼顾各种引用方式。

## 指向源代码入口文件

第一种方式指向源码入口，这种情况仅适用于 `require` 方式引用。由于指向的是源代码，需要库使用者借助打包工具如 `webpack`，自行对库进行打包。此方式存在以下问题：

1.`webpack` 配置 `babel-loader` 一般会排除 `node_modules`，意味着不会对 `library` 进行转译，可能会导致打包后的代码中包含 `ES6` 代码，造成低版本浏览器兼容问题； 2.如果 library 的编译需要一些特别的 `loader` 或 `loader` 配置，使用者需要在自己的配置中加上这些配置，否则会造成编译失败； 3.使用者的打包工具需要收集 `library` 的依赖，造成打包编译速度慢，影响开发体验。

总的来说，第一种方式需要使用者自行对 `library` 进行编译打包，对使用者造成额外的负担，因此源代码入口文件不适宜作为库的入口。但是，如果 `library` 的目标运行环境只是 `node` 端，由于 `node` 端不需要对源代码进行编译打包，所以这种情况下可以使用 `src/index.js` 作为库入口。

## 指向打包后的开发版本

开发版本的主要作用是便于调试，文件体积并不是开发版本所关心的问题，这是因为开发版本通常是托管在 `localhost` 上，文件大小基本没影响。

开发版本主要通过以下手段来方便调试，提升开发体验：

- 1.预先进行依赖收集和 `babel` 转译，即使用者不再需要对 `library` 进行这两步工作了，提高编译打包的效率；
- 2.尽量保留源代码的格式，保证开发版本里面的源代码基本可读；
- 3.保留警告信息，对开发者对库的错误或不合理调用进行提示。

其中第 3 点是通过库代码中添加如下类似代码实现的：

```js
if (process.env.NODE_ENV === 'development') {
  console.warn('Some useful warnings.')
}
```

生成开发版本的似乎，`webpack` 的 `DefinePlugin` 会将 `process.env.NODE_ENV` 替换为 `development`，所以以上代码变为：

```js
if ('development' === 'development') {
  console.warn('Some useful warnings.')
}
```

这就表示上述条件一直成立，`warning` 信息会显示出来。

最近和 iview 的开发者争论一件事，即在生成 library 的开发版本的时候，`NODE_ENV` 应该设置为 `development` 还是 `production`。他们认为应该设置为 `production`，理由是可以减小开发版本的体积。假设 DefinePlugin 将 `process.env.NODE_ENV` 替换为 `production`，之前的示例代码会变为：

```js
if ('production' === 'development') {
  console.warn('Some useful warnings.')
}
```

这就意味着你使用库开发应用时，不会看到任何警告信息，这不利于提前发现错误。可能有的人会说，我的源代码中没有 `if (process.env.NODE_ENV === 'development') {}`这类代码，所以设置为 `production` 也不会有任何问题呀。殊不知，虽然你的源代码中这种没有这类提示代码，但是你的 devependencies 里面可能会有啊，这样做就会关闭依赖中的 warning 信息。

可能又有疑问：“引用开发版本的包体积很大，岂不是让我的应用打包上线版本很大？”其实完全不用担心，因为应用打包为上线版本时，会经过两个额外的工作：

- 1.使用 `DefinePlugin` 将 `process.env.NODE_ENV` 替换为 `production`，关闭所有警告信息；
- 2.使用 `UglifyJsPlugin` 对应用代码进行 `minify`，减小应用体积。同时会删除 `if ('production' === 'development') {}`这类永远不会执行的代码，进一步减小应用体积。

所以，在开发时应用开发版本，不必担心最后的应用体积。但是如果开发时是以 `script` 标签的方式引用库的开发版本，上线时应该替换为响应的发布版本。

## 指向打包后的发布版本

发布版本追求的是尽量减小体积，因为相比于 `JS` 引擎解析的时间，网络传输是最慢的，所以要通过减小库的体积，减少网络传输的时间。

减小发布版本的文件体积，主要是通过将 `process.env.NODE_ENV` 设置为 `production`，然后再使用 `UglifyJsPlugin` 对应用代码进行 `minify` 以及删除永不执行的代码。

那么将库的发布版本作为入口文件合不合适呢？显然不合适，因为发布版本的是经过高度压缩精简的，代码完全不可读，应用开发阶段难以调试。

发布版本是适用于在应用上线时，通过 `script` 标签形式引用。

## 结论

通过上面的分析，可以发现将库的开发版本作为库的入口才是正确合理的做法，即设置`"main": "dist/library.js"`。而作为库的开发者，也要遵循约定，生成库的开发版本的时候，使用 `development` 环境变量，保留警告信息。

[阅读原文](http://jingsam.github.io/2018/03/12/npm-main.html)

[博客入口](https://jingsam.github.io/archives/)

[阮一峰·package.json 的 main 字段](https://es6.ruanyifeng.com/#docs/module-loader)
