<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/css/css常用知识点.md
 * @Date: 2021-04-07 09:44:08
 * @LastEditTime: 2021-04-07 19:51:08
-->

# css 常用知识

## 1. 如何隐藏滚动条

```scss
// chrome 和Safari
*::-webkit-scrollbar {
  width: 0 !important;
}
// IE 10+
* {
  -ms-overflow-style: none;
}
// Firefox
* {
  overflow: -moz-scrollbars-none;
}
```

## 2. 修改滚动条样式

```scss
*::-webkit-scrollbar {
  /*定义纵向滚动条宽度*/
  width: 12px !important;
  /*定义横向滚动条高度*/
  height: 12px !important;
}
*::-webkit-scrollbar-thumb {
  /*滚动条内部滑块*/
  border-radius: 16px;
  background-color: #c1c1c1;
  transition: background-color 0.3s;
  &:hover {
    /*鼠标悬停滚动条内部滑块*/
    background: #bbb;
  }
}
*::-webkit-scrollbar-track {
  /*滚动条内部轨道*/
  background: #f1f1f1;
}
```

## 3.修改 input 框 placeholder 的颜色

```scss
input::input-placeholder {
  color: red;
}
```

## 4. 按钮不可点击的样式

```scss
.class {
  cursor: not-allowed;
}
```

## 5. CSS 鼠标指针事件：阻止任何 JS 事件

```scss
.disabled {
  pointer-events: none;
}
```

## 6. 文字超出强制 n 行 超出部分用省略号代替

```scss
div {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: n; // 行数
  -webkit-box-orient: vertical;
}
```

[阅读原文](https://segmentfault.com/a/1190000039767791?utm_source=weekly&utm_medium=email&utm_campaign=SegmentFault%20%E7%B2%BE%E9%80%89%E6%AF%8F%E5%91%A8%E7%B2%BE%E9%80%89%E4%B8%A820%20%E4%B8%AA%E5%B8%B8%E7%94%A8%E7%9A%84%20CSS%20%E7%9F%A5%E8%AF%86%E7%82%B9%E4%B8%A8webpack%20%E6%A0%B8%E5%BF%83%E6%A8%A1%E5%9D%97%20tapable%20%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90)

---
