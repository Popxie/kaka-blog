const path = require('path')
const webpack = require('webpack')
// 导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
// 实例化速度分析插件
const smp = new SpeedMeasurePlugin()
// 导入体积分析插件 vue-cli service build 已经带有这个功能 只需要设置 --report
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// 导入代码压缩插件
const TerserPlugin = require("terser-webpack-plugin")

// gzip压缩  https://www.webpackjs.com/plugins/compression-webpack-plugin/
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 本地环境是否需要使用cdn
const devNeedCdn = true

// 是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'

//定义 CDN 路径，这里采用 bootstrap 的 cdn
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue', //vue 是包名 Vue是引入的全局变量
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': '/^(lement)$/i'
  },
  // cdn的css链接
  css: [
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
  ],
  // cdn的js链接
  js: [
    'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
    'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
    'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js'
  ]
}

// gzip压缩
const productionGzipExtensions = ['html', 'js', 'css']

function resolve (dir) {
  return path.join(__dirname, dir)
}

const NODE_ENV = process.env.NODE_ENV
console.log('NODE_ENV: ', NODE_ENV)

// （publicPath）vue-cli 部署相关  https://cli.vuejs.org/zh/guide/deployment.html#github-pag
module.exports = {
  publicPath: isProduction ? '/kaka-blog' : '',
  productionSourceMap: !isProduction, // 线上环境关闭source map
  devServer: {},
  //Build the app in multi-page mode
  pages: {
    index: {
      // entry for the page
      entry: './src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // 如何没有设置这个title字段那么title会默认去package中的name字段的值
      title: 'KaKa’s blog',
      // 
      test: '自定义字段，会被添加到 htmlWebpackPlugin.options对象中'
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            /**
             * 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,
             * 这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
             */
            rootValue: 192, 
            /**
             * 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，
             * 例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，
             * 请把此属性设为默认值
             */
            exclude: /(node_module)/,
            //（布尔值）允许在媒体查询中转换px。
            mediaQuery: false,
          }),
        ]
      }
    }
  },
  // 调整 webpack 配置
  configureWebpack: 
  // smp.wrap(
    {
      devtool: NODE_ENV !== 'production' ? 'source-map' : '',
      resolve: {
        alias: {
          '@': resolve('src'),
          'components': resolve('src/components')
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['thread-loader'] // 多进程构建
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          axios: 'axios'
        }),
        
        // 实例化体积分析插件
        // new BundleAnalyzerPlugin(),

        // 开启gzip会生成.gz文件
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      ],
      //生产环境注入 cdn
      externals: (isProduction || devNeedCdn) && cdn.externals || {},
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: 4
          })
        ]
      }
    },
  // ),
    /**
     * @param {type} 
     * 执行 vue inspect --plugins 命令 查看插件列表
     * cdn报错的原因是 html 改了 改成html-index了
     * https://github.com/staven630/vue-cli4-config/issues/22
     */
    chainWebpack: config => {
      config.plugin('html-index')
        .tap(args => {
          console.log('======args=========: ', args)
          // 生产环境或本地需要cdn时，才注入cdn
          if (isProduction || devNeedCdn) args[0].cdn = cdn
          return args
        })
      config.module
        .rule('md')
          .test(/\.md/)
          .use('vue-loader')
          .loader('vue-loader')
          .end()
          .use('vue-markdown-loader')
          .loader('vue-markdown-loader/lib/markdown-compiler')
          .options({
            raw: true
          })
          .end() //返回到loader配置这一层
          .end()//返回到rules配置这一层
        // .rule('css') 
        //   .test(/\.css$/)
        //   .oneOf('vue')
        //   .resourceQuery(/\?vue/)
        //   .use('px2rem')
        //   .loader('px2rem-loader') // px2rem-loader这里只能仅限于css
        //   .options({
        //     remUnit: 192
        //   })
    },
}
