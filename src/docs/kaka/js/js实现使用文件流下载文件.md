<!--
 * @Description: JavaScript文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\js\js实现使用文件流下载文件.md
 * @Date: 2021-07-25 11:19:22
 * @LastEditTime: 2021-07-31 17:00:04
-->

# js 实现使用文件流下载文件

## 1. 理解 Blob 对象

在 `Blob` 对象出现之前，在 `javascript` 中一直没有比较好的方式处理二进制文件，自从有了 `Blob` 了，我们就可以使用它操作二进制数据了。现在我们开始来理解下 `Bolb` 对象及它的文件流下载应用场景.

## 2. 创建 Blob 对象

- 创建一个 blob 对象

  ```js
  var blob = new Blob(dataArray, options)
  ```

  dataArray: 它是一个数组，它包含了要添加到 Blob 对象中的数据。数组可以是二进制对象或者字符串。

  options 是可选的对象参数，用于设置数组中数据的 MIME 类型。

- 2.1. 创建一个 DOMString 对象的 Blob 对象。如下代码：

  ```js
  var str = '<div>Hello World</div>'
  var blob = new Blob([str], { type: 'text/xml' })
  console.log(blob) // 输出：Blob {size: 22, type: "text/xml"}
  ```

## 3. 理解 URL.createObjectURL 对象

`window` 对象的 `URL` 对象是用来将 `blob` 或 `file` 读取成一个 `url` 的。

```js
window.URL.createObjectURL(file / blob)
```

比如我现在结合上面的 blob 对象来生成一个 url 的简单 demo 实列如下所示：

```js
var str = '<div>Hello World</div>'
var blob = new Blob([str], {
  type:
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
})
console.log(blob)

const url3 = window.URL.createObjectURL(blob)
console.log(url3)
```

如上代码第一个打印 blob 变量值如下：

```js
Blob {size: 22, type: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
```

打印第二个 url3 变量值信息如下：

```js
blob:null/2c75a56e-0104-4572-bc19-391d3bf93d9d
```

## 4. 理解 HTML5 中 a 标签的 download 属性

`HTMl5` 中给 `<a>` 标签新增了一个 `download` 属性，只要我们设置该属性值，那么点击该链接时浏览器不会打开新链接，而是会直接下载文件，并且文件名就是 `download` 的属性值。

因此结合这个特点，我们就可以简单的实现文件流下载文件了，我们首先在原来的代码基础之上，再动态创建一个 `<a>` 链接，然后把该 `<a>` 标签的样式设置 `none`, 该链接的 `href` 属性 就是我们上面是有 `window.URL.createObjectURL(blob)` 生成的 `url`，然后我们把 `<a>` 链接的 `download` 属性设置下，该属性值就是我们的下载文件的文件名。最后触发点击功能即可下载了。如下代码：

```js
var str = '<div>Hello World</div>'
var blob = new Blob([str], {
  type:
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
})
console.log(blob)
const url3 = window.URL.createObjectURL(blob)
console.log(url3)

var filename = '文件流下载' + '.csv'
const link = document.createElement('a')
link.style.display = 'none'
link.href = url3
link.setAttribute('download', filename)
document.body.appendChild(link)
link.click()
```

<!-- [阅读原文](https://www.cnblogs.com/tugenhua0707/p/11188117.html) -->
