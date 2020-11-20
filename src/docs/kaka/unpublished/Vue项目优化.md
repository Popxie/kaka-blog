<!--
 * @Description: 前端工程化文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/unpublished/Vue项目优化.md
 * @Date: 2021-03-03 17:55:12
 * @LastEditTime: 2021-06-17 21:42:38
-->

# vue 项目优化

## 1.如何去除项目中指定环境的 console

### 方案 1

#### 1.1 安装`babel-plugin-transform-remove-console`依赖

```bash
npm install babel-plugin-transform-remove-console -D
# 或者
yarn add babel-plugin-transform-remove-console -D
```

#### 1.2 配置`babel.config.js`

```bash
let plugins = []
const isProduction = ['production'].includes(process.env.NODE_ENV)

if (isProduction) plugins.push('transform-remove-console')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset' # vue-cli3+ 自带配置
  ],
  plugins
}
```

### 方案 2

> `terser-webpack-plugin`插件 vue-cli@4 默认配置是开启的

#### 相关官方文档

- [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
- [terser](https://github.com/terser/terser#minify-options)
- [webpack-chain](https://github.com/neutrinojs/webpack-chain)
- [chainWebpack·Vue 官方](https://cli.vuejs.org/migrating-from-v3/#vue-cli-service)

#### 解决问题相关文档

- [drop console - ‘it does work for me,can you check this link’](https://forum.vuejs.org/t/vue3-cli-4-drop-console-not-working-tried-with-terser-babel-and-uglify-as-a-last-resort/104874)
- [webpack-chain/issues/204](https://github.com/neutrinojs/webpack-chain/issues/204)
- [vueCli4 配置 config.optimization.minimizer(‘terser‘)](https://blog.csdn.net/qq_15006083/article/details/108379297)

```js
// 非链式
configureWebpack: config => {
  config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
    'console.log'
  ]
}
// 链式webpack
chainWebpack: config => {
  config.when(true, config => {
    config.optimization.minimizer('terser').tap(args => {
      // 注释console.*
      args[0].terserOptions.compress.drop_console = true
      // remove debugger
      args[0].terserOptions.compress.drop_debugger = true
      // 移除 console.log
      args[0].terserOptions.compress.pure_funcs = ['console.log']
      // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
      args[0].terserOptions.output = {
        comments: false
      }
      return args
    })
  })
}
```

> 配置成功后，vue inspect --mode=production > output.js 项目根目录输入命令，生成生产环境的配置 看看是否配置成功，出现配置的字段说明配置成功

![6_开启了source-map.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/6_开启了source-map.png)

![7_未开启source-map.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/7_未开启source-map.png)

## 2.优化 webpack 编译速度

- [使用 webpack4 提升 180%编译速度](https://juejin.cn/post/6844903752835547144)

## 3.优化 moment 包

`297.44kb => 69.23kb => 6.29kb`

> 原始的 moment.js 拆包以后的大小为`297.44kb`,其中 locale 语言包占总体积的`80%`,所以如果不考虑支持多语言就完全可以剔除这个。

![8_moment未去除locale.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/8_moment未去除locale.png)

- 使用到了[webpack.IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/),官网以 moment 为例进行了说明

```js
configureWebpack: config => {
  config.plugins = [
    ...config.plugins, // 必须要写
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/
    })
  ]
}
// 或者
chainWebpack: config => {
  config
    .plugin('IgnorePlugin')
    .use(webpack.IgnorePlugin, [
      {
        resourceRegExp: /^\.\/locale$/
      }
    ])
    .end()
}
```

`忽而locale`以后：

![9_moment去除locale.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/9_moment去除locale.png)

### 当然我们还有更好的方案，就是用[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)去代替 moment，来减小包的体积

- api 与 moment 保持一致
- 体积更小

改用`dayjs`编译产物：

![10_改用dayjs.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/10_改用dayjs.png)
