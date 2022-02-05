<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/如何获取dom的高度.md
 * @Date: 2022-02-05 17:39:58
 * @LastEditTime: 2022-02-05 17:48:22
-->

# 如何获取 dom 的高度

- **1.dom.offsetWidth/offsetHeight**

  > 这个就没什么好说的了，最常用的，也是兼容最好的

- **2.dom.style.width/height**

  > 这种方式只能取到 dom 元素内联样式所设置的宽高，也就是说如果该节点的样式是在 style 标签中或外联的 CSS 文件中设置的话，通过这种方法是获取不到 dom 的宽高的。

- **3.window.getComputedStyle(dom).width/height**

  > 这种方式的原理和 2 是一样的，这个可以兼容更多的浏览器，通用性好一些。

- **4.dom.getBoundingClientRect().width/height**

  > 这种方式是根据元素在视窗中的绝对位置来获取宽高的

- **5.dom.currentStyle.width/height (慎用)**

  > 这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。但这种方式**只有 IE 浏览器支持**。

---

```html
<!-- demo1 -->
<div id="big-content" style="width: 110px;height:200px">content</div>

<!-- demo2 -->
<style>
  #big-content {
    width: 110px;
    height: 200px;
  }
</style>

<div id="big-content">content</div>
```

- 行内样式

  ```js
  // 这种方式只能取到dom元素内联样式所设置的宽高，也就是说如果该节点的
  // 样式是在style标签中或外联的CSS文件中设置的话，通过这种方法是获取不到dom的宽高的。
  const dom = document.getElementById('big-content')

  const width = dom.style.width
  const height = dom.style.height
  ```

- 非行内样式

  ```js
  const dom = document.getElementById('big-content')
  const height = dom.offsetHeight
  const width = dom.offsetWidth

  console.log('width:', width)
  ```
