<!--
 * @Description: css文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/css/常见的css水平垂直居中的5种方法.md
 * @Date: 2021-06-18 14:38:25
 * @LastEditTime: 2021-06-18 15:02:53
-->

# 常见的 css 水平垂直居中的 5 种方法

![02_常见的css水平垂直居中的5种方法.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/blogs/02_常见的css水平垂直居中的5种方法.png)

## 前言

> 这两天总是在掘金插件上看到一些关于 css 垂直水平居中的基础文章，刚好很久之前自己也总结了一些，那我也就分享一下自己平常用的方法吧~

![12.gif](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/funny/12.gif)

## 代码实践

```css
/* 方法一 利用定位 作用在子元素 */
.parent1 {
  height: 300px;
  background: lightblue;
  position: relative;
}
.children1 {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  width: 200px;
  background: green;
  transform: translate(-50%, -50%);
}

/* 方法二 用flex 作用在父元素 */
.parent2 {
  height: 300px;
  background: lightcoral;
  justify-content: center; // 水平方向
  align-items: center; // 垂直方向
  display: flex;
}
.children2 {
  height: 200px;
  width: 200px;
  background: green;
}

/* 方法三 也适用于高度不固定的情况 */
.parent3 {
  height: 300px;
  background: lightsalmon;
  display: flex;
}
.children3 {
  height: 200px;
  width: 200px;
  background: green;
  align-self: center;
  margin: 0 auto;
}
/* 方法四 */
.parent4 {
  background: lightskyblue;
  height: 300px;
  position: relative;
}
.children4 {
  width: 200px;
  height: 200px;
  background: green;
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}
/* 方法五 */
.parent5 {
  background: yellowgreen;
  height: 300px;
  position: relative;
}
.children5 {
  width: 200px;
  height: 200px;
  background: green;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

```html
<div class="parent1">
  <div class="children1">方法1</div>
</div>

<div class="parent2">
  <div class="children2">方法2</div>
</div>

<div class="parent3">
  <div class="children3">方法3</div>
</div>

<div class="parent4">
  <div class="children4">方法4</div>
</div>

<div class="parent5">
  <div class="children5">方法5</div>
</div>
```

## 实际效果

![垂直水平居中](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/5_垂直水平居中.png)

> 图片上的注释文字不是很对，但是效果都是一样的
