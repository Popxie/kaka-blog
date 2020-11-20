const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const yaml = require('js-yaml')
const webpack = require('webpack')
const path = require('path')
const { name, version } = require('./package.json')
const { splitChunksOptions, cdnOptions } = require('./vue.config.data.js')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const isTest = env === 'test'
const isDev = env === 'development'
const configDir = path.join(__dirname, './config')
const defaultEnvFilename = path.resolve(configDir, 'env.yaml')
const configFilename = path.resolve(configDir, `env.${env}.yaml`)
// 将yaml文件内容转换成对象
const defaultEnvObj = yaml.safeLoad(fs.readFileSync(defaultEnvFilename, 'utf8'))
const envConfig = configFilename
  ? yaml.safeLoad(fs.readFileSync(configFilename, 'utf8'))
  : {}

const globalConfig = Object.assign({}, defaultEnvObj, envConfig)
const publicPath = isProduction ? '/' : ''

globalConfig.VUE_APP_VERSION = version
globalConfig.VUE_APP_TITLE = name

function resolve(dir) {
  return path.join(__dirname, dir)
}

const baseUrl = 'http://10.0.10.65/'
const mockUrl = 'http://localhost:8899'
module.exports = {
  devServer: {
    // proxy: 'http://localhost:8899', // will proxy all request 与mock.js里的端口号保持一致
    proxy: {
      '/authority/api/visits/*': { target: baseUrl },
      '/authority/auth/info': { target: baseUrl },
      '/authority': { target: baseUrl },
      '/app-operation': { target: baseUrl },
      '/book2': { target: baseUrl },
      '/story2': { target: baseUrl },
      '/statistics': { target: baseUrl },
      '/media': { target: baseUrl },
      '/cooperation': { target: baseUrl },
      '/activity': { target: baseUrl },
      '/*': { target: mockUrl }
    },
    https: false
  },
  productionSourceMap: env !== 'production',
  publicPath,
  assetsDir: 'static',
  chainWebpack: config => {
    const mapType = isProduction ? '' : 'source-map'
    config.devtool(mapType)
    config.resolve.alias
      .set('@', resolve('src'))

    if (!isDev) config.externals(cdnOptions.externals)

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })

    config.optimization.splitChunks(splitChunksOptions)
    config.optimization.minimizer('terser').tap(args => {
      // 经过测试得出结论： 这玩意儿只在生产环境才会生效！！
      if (process.env.NODE_ENV === 'production') {
        args[0].terserOptions.compress.drop_console = true
        args[0].terserOptions.compress.drop_debugger = true
      }
      return args
    })

    config
      .plugin('define')
        .use(webpack.DefinePlugin, [
          {
            VUE_APP_NAME: JSON.stringify(name),
            GLOBALE_CONFIG: JSON.stringify({ ...globalConfig })
          }
        ])
        .end()
      .plugin('html')
        .use(HtmlWebpackPlugin, [
          {
            template: 'public/index.html',
            BASE_URL: publicPath,
            VUE_APP_TITLE: globalConfig.VUE_APP_TITLE,
            cdn: isProduction || isTest ? cdnOptions : {}
          }
        ])
        .end()
      .plugin('ProvidePlugin')
        .use(webpack.ProvidePlugin, [
          {
            axios: 'axios'
          }
        ])
        .end()
  }
}
