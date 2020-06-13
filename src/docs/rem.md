## PC端,移动端如何使用rem

> **场景描述1：适配移动端根据不同的手机机型保持整体的缩放比例不变**


这里的适配方案用的是淘宝的lib-flexible下的flexible.js

**1.安装lib-flexible**

```
npm i lib-flexible
```

废话不多！想必大家对这个flexible.js的原理应该已经很了解了！[奸笑]，如不了解请自行`百度` || `谷歌`。大致的原理就是就以设计稿的宽度为基准，将设计稿平分为10份。然后将1/10份的大小设置成根节点的大小。1个rem就是1/10份的宽度值！对，没错！他的作用就是这么个作用（我个人的理解）  

比如设计稿的为`375px`格式的，那么引入这个flexble.js以后，根节点的font-size：37.5px（1rem），接下来先看下代码和效果来验证这个关系

```
<!--html-->
<div class="wrapper">
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
</div>
```

```
<!--css-->
<style lang="scss">
    .wrapper div {
      height: 1rem;
    }
    .box1 {
      width: 2rem;
      background-color: coral;
    }
    .box2 {
      width: 4rem;
      background-color: skyblue;
    }
    .box3 {
      width: 6rem;
      background-color: palegreen;
    }
    .box4 {
      width: 8rem;
      background-color: wheat;
    }
    .box5 {
      width: 10rem;
      background-color: darkred;
    }
</style>
```
![001.png](http://upload-images.jianshu.io/upload_images/12297114-146c22e40bd8eb6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> vue.config.js 

然后 如果我们不借助任何插件的话 我们要怎么跟跟设计稿保持一直呢？？？[狗头]

```
<!--此处用的是less， scss的变量计算必须要单位一致，写起来比较麻烦这里为了方便演示所以用了less-->

<style lang="less">
  @375: 37.5rem;
  .wrapper div {
    height: 37.5/@375;
  }
  .box1 {
    width: 75/@375;
    background-color: coral;
  }
  .box2 {
    width: 150/@375;
    background-color: skyblue;
  }
  .box3 {
    width: 225/@375;
    background-color: palegreen;
  }
  .box4 {
    width: 300/@375;
    background-color: wheat;
  }
  .box5 {
    width: 375/@375;
    background-color: darkred;
  }
</style>
```
实践证明这端代码的效果跟上述的一毛一样~就是写法会比较麻烦在实际项目当中肯定不会这么做。所以接下来就会用到 `px2rem-loader`

**2.安装px2rem-loader**

```
npm i px2rem-loader -D
```

**2.1配置px2rem-loader**  

在vue.config.js中进行配置，配置后记得`重启`项目使配置生效！

```
module.exports = {
    ……
    chainWebpack: config => {
        config.module
            .rule('css') 
              .test(/\.css$/)
              .oneOf('vue')
              .resourceQuery(/\?vue/)
              .use('px2rem')
              .loader('px2rem-loader') // px2rem-loader这里只能仅限于css
              .options({
                remUnit: 37.5
              })
    },
}
```

它的作用就是字如其名一看便知！[旺柴]，这里以上述的为例。将remUnit设置为37.5后！那么他就会自动的帮你以37.5为基准进行px to rem转换。  

举个栗子： 把一个div的宽度设置为37.5px，得到的结果如下所示

```
width: 37.5px; 等价于 width: 37.5/@375; 最终的结果： width: 1rem;
```    

```
<style lang="scss">
  .wrapper div {
    height: 37.5px;
  }
  .box1 {
    width: 75px;
    background-color: coral;
  }
  .box2 {
    width: 150px;
    background-color: skyblue;
  }
  .box3 {
    width: 225px;
    background-color: palegreen;
  }
  .box4 {
    width: 300px;
    background-color: wheat;
  }
  .box5 {
    width: 375px;
    background-color: darkred;
  }
</style
```

所以到这里才算达到大家想要的效果，不在需要关心什么转换关系了。直接使用跟设计稿一致的px了[奸笑]，剩下的一切交给`px2rem-loader`爸爸就好了。[emmmmmmm]这个时候你以为你可以安心的走了[奸笑]，结果苏不知这里有‘坑’！结果：  

![握草.png](http://upload-images.jianshu.io/upload_images/12297114-a33a9194d7cf2838.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/80)

那么究竟是什么'坑'呢？ 其实吧也不是什么坑，就是`px2rem-loader`这个插件只能仅限于css，也就是说 `lang='scss || less'`类型的都不支持！ 

- 正常的css未设置lang 

![003.png](http://upload-images.jianshu.io/upload_images/12297114-6ad5df1029a81835.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 设置lang='less || scss'  

![002.png](http://upload-images.jianshu.io/upload_images/12297114-65dd4efe28823449.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么有没有更好的解决方案呢？答案是有的。

弃用~~px2rem-loader~~（把px2rem-loader 相关配置删除）使用`postcss-plugin-px2rem`


```
npm install postcss-plugin-px2rem --save-dev
```  
依赖安装好以后只需要配置两个地方然后重启项目就~~ojbk~~了!  

- vue.config.js  

```
module.exports = {
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require('postcss-plugin-px2rem')({
                /**
                 * 换算基数， 默认100。
                 * 这样的话把根标签的字体规定为1rem为`${rootValue}px`,
                 * 这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                 */
                rootValue: 37.5, 
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
}
 ```
 
 - package.json
 
 ```
{
    "postcss": {
         "plugins": {
            "autoprefixer": {},
            "precss": {}
         }
    },
}
 ```
 ---
 
 > **场景2： 如何适配PC端或者iPad**
 
 还是以上面的为基础进行分析  先解除手机预览模式，开启浏览器模式
 
 当我们调节浏览器窗口大小的时候会发现一个问题，就是根节点的font-size最大值只有54px，然后不在随着屏幕宽度的变化而变化了。讲道理如果按照1920px的设计稿来开发的话，根节点的font-size应该是192px才对啊。靠！道理讲不通啊[奸笑][奸笑]  
 
 不知你是否还记得flexible是用来适配移动端的，你直接用来适配非移动端的肯定会有点问题。[旺柴][旺柴]看源码  
 
```
// flexible.js

// 本篇文章以dpr为1的情况来分析
function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}

```  

从上面代码分析不难看出，当width > 540的时候 with就不在改变了。所以要想使得根字体大小跟设计稿一致，那就把540改成动态的不就完事了嘛

```
// flexible.js

function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > width) {
        width = width * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
```
然后你在你的宽为1920px的显示器上按照设计稿开始撸代码，那可谓撸码一时爽，一直撸码一直爽[奸笑]，最后完美收工开心的不了。  

<!--![表情]()  -->
![image.png](https://upload-images.jianshu.io/upload_images/12297114-67aa78bb2a5f8f42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


结果产品家里有个21:9（3440*1440）的超宽的曲面屏显示器,打开了你认为完美的产品，然后惊奇的一幕发生了！  

![image.png](https://upload-images.jianshu.io/upload_images/12297114-08a624f663b0b4b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![握草.png](http://upload-images.jianshu.io/upload_images/12297114-a33a9194d7cf2838.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/80)  

字体太大了！！亮瞎我的狗眼[旺柴]  所以在这里要改一下，让他在一定的范围内进行自适应，不在这个规定的范围内就不在随着屏幕的改变而改变了，完美~

```
// flexible.js

function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    // 当屏幕超过1920px以后就不在随着屏幕的变大而变大了
    if (width / dpr > 1920) {
        width = 1920 * dpr;
    }
    // 当屏幕小于1300px以后就不再随着屏幕的变小而变小了
    if (width / dpr < 1300) {
        width = 1300 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
```

以上就是大体的一个思路，因为自己在弄自己的blog，刚好也想记录下自己遇到的问题。纯属个人的总结，可能理解的有出入，望指正~我虚心接受。哈哈哈哈哈


### 总结一下：

- `flexible.js`: 根据屏幕的宽度，动态地设置根节点的字体大小（因为rem是根据根节点的字体大小来进行缩放的）
    - 但是默认根节点的最大font-size为54px，所以屏幕宽度超过540px的时候就不在随着宽度变大而变大了。如果需要定制化那就改下源码就好啦
    - 如果自定义化的话 建议把他的js复制到自己的项目当中
- `px2rem-loader`：将px转换成rem  
  - 缺点：只能转换普通的css样式，如果设置了lang='less || scss',就无法转换成rem了
- `postcss-plugin-px2rem`：同样也是将px转换成rem但是**更吊**，**更棒** [旺柴]