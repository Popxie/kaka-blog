<!--
 * @Description: css文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/css/常见的css水平垂直居中的5种方法.md
 * @Date: 2021-06-18 14:38:25
 * @LastEditTime: 2022-01-02 11:59:17
-->

# 常见的 css 水平垂直居中的 5 种方法

![02_常见的css水平垂直居中的5种方法](https://user-images.githubusercontent.com/24952644/132442073-16880ba2-896c-4ac9-86ed-c9aab62f9281.png)

## 前言

> 这两天总是在掘金插件上看到一些关于 css 垂直水平居中的基础文章，刚好很久之前自己也总结了一些，那我也就分享一下自己平常用的方法吧~

![12](https://user-images.githubusercontent.com/24952644/132442074-5b830f28-e319-41b1-b5df-e993a3c6cf40.gif)

## 先看效果

![垂直水平居中](https://user-images.githubusercontent.com/24952644/147865690-4a59a521-82c8-4d37-b50e-7bef31f3fc5a.png)

## 代码实践

```html
<div class="parent">
  <div class="children"></div>
</div>
```

```css
/* 方法一 利用flex 作用在父元素 */
.parent {
  height: 300px;
  background: lightcoral;

  display: flex;
  justify-content: center; // 水平方向
  align-items: center; // 垂直方向
}
```

```css
/* 方法二 利用定位 作用在子元素 */
.parent {
  height: 300px;
  background: lightblue;

  position: relative;
}
.children {
  height: 200px;
  width: 200px;
  background: green;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

```

```css
/* 方法三 利用flex 作用在子元素 也适用于高度不固定的情况 */
.parent {
  height: 300px;
  background: lightsalmon;

  display: flex; 
}
.children {
  height: 200px;
  width: 200px;
  background: green;

  align-self: center;
  margin: 0 auto;
}
```

```css
/* 方法四 利用定位 作用在子元素 */
.parent {
  background: lightskyblue;
  height: 300px;

  position: relative;
}
.children {
  width: 200px;
  height: 200px;
  background: green;

  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}
```

```css
/* 方法五 定位 作用在子元素 */
.parent {
  background: yellowgreen;
  height: 300px;

  position: relative;
}
.children {
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

