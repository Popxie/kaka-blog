<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-08 10:57:00
 * @LastEditTime: 2020-06-09 17:31:58
--> 

<template>
  <section id="nice" data-tool="mdnice编辑器" data-website="https://www.mdnice.com" style="font-size: 16px; padding: 0 10px; word-spacing: 0px; word-break: break-word; word-wrap: break-word; text-align: left; margin-top: -10px; width: 700px; margin: 0 auto; line-height: 1.25; color: #2b2b2b; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; letter-spacing: 2px; background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%); background-size: 20px 20px; background-position: center center;"><p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;"><a href="https://www.cnblogs.com/hashtang/p/11873796.html" style="text-decoration: none; word-wrap: break-word; color: #40B8FA; font-weight: normal; border-bottom: none;">1.webpack 打包优化的四种方法（多进程打包（thread-loader ），多进程压缩（terser-webpack-plugin），资源 CDN（externals），动态 polyfill）</a></p>
<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;"><a href="https://juejin.im/post/5cede821f265da1bbd4b5630" style="text-decoration: none; word-wrap: break-word; color: #40B8FA; font-weight: normal; border-bottom: none;">2.webpack 中那些最易混淆的 5 个知识点</a></p>
<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;"><a href="https://www.jianshu.com/p/476387c7fea3" style="text-decoration: none; word-wrap: break-word; color: #40B8FA; font-weight: normal; border-bottom: none;">3.Vue Cli3 项目打包优化</a></p>
<h2 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 22px; display: block; border-bottom: 4px solid #40B8FA;"></h2>
<table data-tool="mdnice编辑器" style="display: table; text-align: left; width: 100%; border-collapse: collapse;">
<thead>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<th style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-weight: bold; background-color: #f0f0f0; font-size: 14px; color: #595959;">loader</th>
<th style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-weight: bold; background-color: #f0f0f0; font-size: 14px; color: #595959;">作用</th>
</tr>
</thead>
<tbody style="border: 0;">
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">babel-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">转换es6·es7等js新特性</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">css-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">支持css文件的加载和解析</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">less-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将less文件转换成css</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">ts-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将ts转换成js</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">file-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">进行图片字体等打包</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">raw-loader</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将文件以字符串的形式导入</td>
</tr>
</tbody>
</table>
<pre class="custom" data-tool="mdnice编辑器" style="margin-top: 10px; margin-bottom: 10px; border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;"><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; letter-spacing: 0px; padding-top: 15px; background: #1E1E1E; border-radius: 5px;">loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。 

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。

loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
</code></pre>
<table data-tool="mdnice编辑器" style="display: table; text-align: left; width: 100%; border-collapse: collapse;">
<thead>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<th style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-weight: bold; background-color: #f0f0f0; font-size: 14px; color: #595959;">plugin</th>
<th style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-weight: bold; background-color: #f0f0f0; font-size: 14px; color: #595959;">作用</th>
</tr>
</thead>
<tbody style="border: 0;">
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">OptimizeCssAssetsPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">压缩css资源文件</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">UglifyJsPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">压缩混淆JS（默认自带）</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">CleanWebpackPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">清理构建目录</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">ExtractTextWebpackPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将css从bundle文件里提取成一个独<br>立的css文件</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">CommonsChunkPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将chunks相同的模块代码抽离成公<br>共js</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: #F8F8F8;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">HtmlWebpackPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">创建html文件去承载输出的bundle</td>
</tr>
<tr style="border: 0; border-top: 1px solid #ccc; background-color: white;">
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">ZipWebpackPlugin</td>
<td style="border: 1px solid #ccc; padding: 5px 10px; text-align: left; font-size: 14px; color: #595959;">将打包出的资源生成一个zip包</td>
</tr>
</tbody>
</table>
<h2 data-tool="mdnice编辑器" style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 22px; display: block; border-bottom: 4px solid #40B8FA;"><span class="prefix" style="display: flex; width: 20px; height: 20px; background-size: 20px 20px; background-image: url(https://imgkr.cn-bj.ufileos.com/15fdfb3c-b350-4da9-928e-5f8c506ec325.png); margin-bottom: -22px;"></span><span class="content" style="display: flex; color: #40B8FA; font-size: 20px; margin-left: 25px;">Gzip</span><span class="suffix" style="display: flex; box-sizing: border-box; width: 200px; height: 10px; border-top-left-radius: 20px; background: RGBA(64, 184, 250, .5); color: rgb(255, 255, 255); font-size: 16px; letter-spacing: 0.544px; justify-content: flex-end; float: right; margin-top: -10px; box-sizing: border-box !important; overflow-wrap: break-word !important;"></span></h2>
<pre class="custom" data-tool="mdnice编辑器" style="margin-top: 10px; margin-bottom: 10px; border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;"><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: -webkit-box; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; letter-spacing: 0px; padding-top: 15px; background: #1E1E1E; border-radius: 5px;">productionGzip: true
</code></pre>
<p data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px;">开启以后打包构建后的产物是.gz文件，<br>
后台nginx开启gzip模式访问，浏览器访问项目，自动会找到 .gz 的文件。加载速度明显提高。</p>
<p id="nice-suffix-juejin-container" class="nice-suffix-juejin-container" data-tool="mdnice编辑器" style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: #2b2b2b; margin: 10px 0px; letter-spacing: 2px; font-size: 14px; word-spacing: 2px; margin-top: 20px !important;">本文使用 <a href="https://mdnice.com" style="text-decoration: none; word-wrap: break-word; color: #40B8FA; font-weight: normal; border-bottom: none;">mdnice</a> 排版</p></section>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      NODE_ENV: '',
    }
  },
  computed: {},
  methods: {},
  created() {
  
  }
}
</script>

<style lang='' scoped>
</style>