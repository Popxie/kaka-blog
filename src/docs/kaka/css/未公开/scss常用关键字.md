<!--
 * @Description: scss 常用关键词
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/css/scss常用关键字.md
 * @Date: 2021-04-06 17:10:46
 * @LastEditTime: 2021-04-06 17:11:03
-->

# scss 常用关键词

## 1.`@mixin` & `@include`

```scss
// 定义混合指令
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

// 引用混合指令
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

// 编译后的结果
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px;
}
```

## 2. `%` & `@extend`

Sass 额外提供了一种特殊类型的选择器：占位符选择器 (placeholder selector)。与常用的 id 与 class 选择器写法相似，只是 `#` 或 `.` 替换成了 %。必须通过 [@extend](https://www.sass.hk/docs/#t7-3) 指令调用

如果使用普通的 CSS 规则，最后会编译出很多用不到的样式，也容易与其他样式名冲突，所以，Sass 引入了“占位符选择器” (placeholder selectors)，看起来很像普通的 id 或 class 选择器，只是 # 或 . 被替换成了 %。可以像 class 或者 id 选择器那样使用，当它们单独使用时，不会被编译到 CSS 文件中。

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

占位符选择器需要通过延伸指令使用，用法与 class 或者 id 选择器一样，被延伸后，占位符选择器本身不会被编译。

```scss
.notice {
  @extend %extreme;
}
```

编译为

```scss
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```
