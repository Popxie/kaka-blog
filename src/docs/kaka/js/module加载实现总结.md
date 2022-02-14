<!--
 * @Description: ES6文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/module加载实现总结.md
 * @Date: 2021-06-17 19:37:49
 * @LastEditTime: 2022-02-14 21:55:12
-->

# Module 的加载实现总结

## 1 浏览器加载

### 1.1 传统方法

```xml || html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

`defer`&`async`都是异步加载，但是有差异

- `defer`: 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行
- `async`: 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

口诀： `defer`是“渲染完再执行”，`async`是“下载完就执行”。`多个defer`按顺序执行，多个`async`不能保证加载顺序

### 1.2 加载规则（es6模块）

```xml
<script type="module" src="./foo.js"></script>
```

浏览器对于带有type="module"的`<script>`，都是异步加载,不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

```xml
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

- 默认是`defer`
- `<script>`标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
- 一旦使用了`async`属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

## 2 ES6 模块与 CommonJS 模块的差异 [[CommonJs和Es Module及它们的区别](https://juejin.cn/post/6938581764432461854)]

- `CommonJS` 模块输出的是一个`值的拷贝`，ES6 模块输出的是`值的引用`。
- `CommonJS` 模块是`运行时加载`，ES6 模块是`编译时输出接口`。
- `CommonJS` 模块的`require()`是`同步加载模块`，`ES6` 模块的`import`命令是`异步加载`，有一个独立的模块依赖的解析阶段。

第二个差异是因为 CommonJS 加载的是一个`对象`（即`module.exports`属性），该对象只有在脚本`运行完`才会生成。而 ES6 模块`不是对象`，它的对外接口只是一种`静态定义`，在代码`静态解析阶段`就会生成。

## 3 Node.js的模块加载方法

JavaScript 现在有两种模块。一种是 `ES6 模块`，简称 `ESM`；另一种是 `CommonJS 模块`，简称 `CJS`。

CommonJS 模块使用`require()`和`module.exports`，ES6 模块使用`import`和`export`。

### CommonJS 模块加载 ES6 模块

CommonJS 的require()命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。

```js
(async () => {
  await import('./my-app.mjs');
})()
```

上面代码可以在 CommonJS 模块中运行。

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被同步加载。

### ES6 模块加载 CommonJS 模块

ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

可以改成这样

```js
import packageMain from 'commonjs-package';
const { method } = packageMain
```

## 4 循环加载

### CommonJS 模块的加载原理

CommonJS 的一个模块，就是一个脚本文件。`require`命令第一次加载该脚本，就会`执行整个脚本`，然后`在内存生成一个对象`。

### CommonJS 模块的循环加载

CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

### ES6 模块的循环加载

ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

`a.mjs`中引用 `b.mjs`:  
当执行a.mjs以后，引擎发现它加载了b.mjs，因此会`优先执行`b.mjs，然后再执行a.mjs。

- 函数具有提升作用
- 函数表达式没有（带等号 = ）

[阅读原文](https://es6.ruanyifeng.com/#docs/module-loader)
