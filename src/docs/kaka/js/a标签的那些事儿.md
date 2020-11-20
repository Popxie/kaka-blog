<!--
 * @Description: JavaScript文件 a标签的那些事儿
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/a标签的那些事儿.md
 * @Date: 2021-06-11 09:42:10
 * @LastEditTime: 2021-06-17 19:49:40
-->

# \<a>标签点击事件方法汇总

> `<a>` 标签的 `href` 属性用于指定超链接目标的 `URL`，href 属性的值可以是任何有效文档的相对或绝对 URL，包括片段标识符和 JavaScript 代码段。

这里的 href="javascript:;"，其中 javascript:是伪协议，它可以让我们通过一个链接来调用 javascript 函数.而采用这个方式

javascript:;可以实现 A 标签的点击事件运行时，如果页面内容很多，有滚动条时，页面不会乱跳，用户体验更好。

## 方法一

```html
<a href="javascript:js_method();"></a>
```

这是平台上常用的方法，但是这种方法在传递 this 等参数的时候很容易出问题，而且 javascript:协议作为 a 的 href 属性的时候不仅会导致不必要的触发 window.onbeforeunload 事件，在 IE 里面更会使 gif 动画图片停止播放。W3C 标准不推荐在 href 里面执行 javascript 语句

## 方法二

```html
<a href="javascript:void(0);" onclick="js_method()></a>
```

这种方法是很多网站最常用的方法，也是最周全的方法，onclick 方法负责执行 js 函数，而 void 是一个操作符，void(0)返回 undefined，地址不发生跳转。而且这种方法不会像第一种方法一样直接将 js 方法暴露在浏览器的状态栏。

## 方法三

```html
<a href="javascript:;" onclick="js_method()></a>
```

这种方法跟跟 2 种类似，区别只是执行了一条空的 js 代码。

## 方法四

```html
<a href="#" onclick="js_method()></a>
```

这种方法也是网上很常见的代码，#是标签内置的一个方法，代表 top 的作用。所以用这种方法点击后网页后返回到页面的最顶端。

```html
<a href="#"></a>
```

如果页面有滚动条 点击后网页后返回到页面的最顶端

## 方法五

```html
<a href="#" onclick="js_method();return false;"></a>
```

这种方法点击执行了 js 函数后 return false，页面不发生跳转，执行后还是在页面的当前位置。 `return false`为`js_method()`的返回值

综合上述，在 a 中调用 js 函数最适当的方法推荐使用

- `a href="javascript:void(0);" onclick="js_method()"`
- `a href="javascript:;" onclick="js_method()"`
- `a href="#" onclick="js_method();return false;"`

[阅读原文·CSDN](https://blog.csdn.net/xiongdaandxiaomi/article/details/88237188)
