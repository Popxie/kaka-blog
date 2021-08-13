<!--
 * @Description: JavaScript文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/encodeURIComponent和encodeURI.md
 * @Date: 2021-08-13 16:31:40
 * @LastEditTime: 2021-08-13 17:07:09
-->

# encodeURIComponent & encodeURI 使用场景

## 名词解释

`URI`: （Uniform Resource Identifier）统一资源标识符

`URL`: （Uniform Resource Locator）统一资源定位符: 不仅标识了 Web 资源，还指定了操作或者获取方式，同时指出了主要访问机制和网络位置。

`URN`: （Uniform Resource Name）统一资源名称: 用特定命名空间的名字标识资源。使用 URN 可以在不知道其网络位置及访问方式的情况下讨论资源。

`URI` 可以被分为 `URL`、`URN` 或两者的组合。

## 案例

这是一个 `URI`: http://bitpoetry.io/posts/hello.html#intro

- http:// 是定义如何访问资源的方式；
- bitpoetry.io/posts/hello.html 是资源存放的位置；
- #intro 是资源。

`URL` 是 `URI` 的一个子集: 告诉我们访问网络位置的方式。在我们的例子中，URL 应该为: http://bitpoetry.io/posts/hello.html

`URN` 是 `URI` 的一个子集，包括名字(给定的命名空间内)，但是不包括访问方式，应该为: bitpoetry.io/posts/hello.html#intro

## 编码 与 解码

`encodeURIComponent()` <=> `decodeURIComponent()`

`encodeURI()` <=> `decodeURI()`

## 相同点

`encodeURIComponent()` 和 `encodeURI()` 都是对 `URI` 进行编码。

## 不同点

`encodeURIComponent()` 不转义的字符: `A-Z` `a-z` `0-9` `-` `_` `.` `!` `~` `*` `(` `)`

`encodeURI()`: 只对空格进行转义

## demo

```js
var set1 = ';,/?:@&=+$' // 保留字符
var set2 = "-_.!~*'()" // 不转义字符
var set3 = '#' // 数字标志
var set4 = 'ABC abc 123' // 字母数字字符和空格

console.log(encodeURI(set1)) // ;,/?:@&=+$
console.log(encodeURI(set2)) // -_.!~*'()
console.log(encodeURI(set3)) // #
console.log(encodeURI(set4)) // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)) // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)) // -_.!~*'()
console.log(encodeURIComponent(set3)) // %23
console.log(encodeURIComponent(set4)) // ABC%20abc%20123 (the space gets encoded as %20)
```

## 使用场景

- `encodeURI`: 适用于 url 跳转时。

- `encodeURIComponent`: 适用于 url 作为参数传递时，对参数解码。

```js
'http://www.我.com?a=?' // 想把?传给服务器'

encodeURI('http://www.我.com?a=?') //"http://www.%E6%88%91.com?a=?"
// 服务器收到的a值为空，因为?是URL保留字符。此时我们需要用encodeURIComponent来编码！
// encodeURIComponent会编码所有的URL保留字，所以不适合编码URL。如：当我们把编码过的/folder1/folder2/default.html发送到服务器时时，由于‘/’也将被编码，服务器将无法正确识别。
encodeURIComponent('http://www.我.com') //"http%3A%2F%2Fwww.%E6%88%91.com"
encodeURI('http://www.我.com') + '?a=' + encodeURIComponent('?')
```

## 参考

[encodeURI()，encodeURIComponent()使用场景](https://www.cnblogs.com/init00/p/12665820.html)  
[你知道 URL、URI 和 URN 三者之间的区别吗？](https://blog.csdn.net/f45056231p/article/details/82530984)  
[encodeURI、encodeURIComponent、btoa 及其应用场景](https://www.cnblogs.com/shytong/p/5102256.html)
