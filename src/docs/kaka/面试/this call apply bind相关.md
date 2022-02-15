<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/this call apply bind相关.md
 * @Date: 2022-02-15 17:30:59
 * @LastEditTime: 2022-02-15 17:34:27
-->

# this call apply bind 相关

## this 绑定的 4 中方式

> - 默认绑定： 在方法里调用全局的变量
> - 隐含绑定： 对象中的方法调用对象中的值
> - 明确(显式)绑定： call(), apply
> - new 绑定: this 指向 new 出来的对象

> 优先级：new > 显示绑定 > 隐式绑定 > 默认绑定

## this 在严格模式下的不同指向

1. 全局作用域中的 this => `window`对象 || 非严格也是`window`对象
2. 全局作用域中`函数中`的 this => `undefined` || 非严格模式指向 window
3. 对象的函数（方法）中的 this => 指向调用函数的对象实例
4. 构造函数的 this => 指向构造函数创建的对象实例。|| 非严格也指向这个对象实例
   [阅读原文\_思否](https://segmentfault.com/a/1190000010108912)

---

> **this 永远指向最后调用它的那个对象**

例 1：

```js
var name = 'windowsName'
function a() {
  var name = 'Cherry'

  console.log(this.name) // windowsName

  console.log('inner:' + this) // inner: Window
}
a()
console.log('outer:' + this) // outer: Window
```

我们看最后调用 a 的地方 a();，前面没有调用的对象那么就是全局对象 window，这就相当于是 window.a()；注意，这里我们没有使用严格模式，如果使用严格模式的话，全局对象就是 undefined。

例 2：

```js
var name = 'windowsName'
var a = {
  name: 'Cherry',
  fn: function () {
    console.log(this.name) // Cherry
  }
}
a.fn()
```

在这个例子中，函数 fn 是对象 a 调用的，所以打印的值就是 a 中的 name 的值。是不是有一点清晰了呢~

例 3：

```js
var name = 'windowsName'
var a = {
  name: 'Cherry',
  fn: function () {
    console.log(this.name) // Cherry
  }
}
window.a.fn()
```

这里打印 Cherry 的原因也是因为刚刚那句话“this 永远指向最后调用它的那个对象”，最后调用它的对象仍然是对象 a。

例 4：

```js
var name = 'windowsName'
var a = {
  // name: "Cherry",
  fn: function () {
    console.log(this.name) // undefined
  }
}
window.a.fn()
```

这里为什么会打印 undefined 呢？这是因为正如刚刚所描述的那样，调用 fn 的是 a 对象，也就是说 fn 的内部的 this 是对象 a，而对象 a 中并没有对 name 进行定义，所以 log 的 this.name 的值是 undefined。  
这个例子还是说明了：this 永远指向最后调用它的那个对象，因为最后调用 fn 的对象是 a，所以就算 a 中没有 name 这个属性，也不会继续向上一个对象寻找 this.name，而是直接输出 undefined。

例 5：

```js
var name = 'windowsName'
var a = {
  name: null,
  // name: "Cherry",
  fn: function () {
    console.log(this.name) // windowsName
  }
}

var f = a.fn
f()
```

这里你可能会有疑问，为什么不是 Cherry，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，再接着跟我念这一句话：“this 永远指向最后调用它的那个对象”，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。  
由以上五个例子我们可以看出，this 的指向并不是在创建的时候就可以确定的，在 es5 中，永远是 this 永远指向最后调用它的那个对象。

例 6：

```js
var name = 'windowsName'

function fn() {
  var name = 'Cherry'
  innerFunction()
  function innerFunction() {
    console.log(this.name) // windowsName
  }
}

fn()
```

读到这里这个例子应该很简单吧，很容易看出来为什么

## 怎么改变 this 的指向

改变 this 的指向我总结有以下几种方法：

- 使用 ES6 的箭头函数
- 在函数内部使用 \_this = this
- 使用 apply、call、bind
- new 实例化一个对象

例 7：

```js
var name = 'windowsName'

var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    setTimeout(function () {
      this.func1()
    }, 100)
  }
}

a.func2() // this.func1 is not a function
```

在不使用箭头函数的情况下，是会报错的，因为最后调用 setTimeout 的对象是 window，但是在 window 中并没有 func1 函数。

### 箭头函数

众所周知，ES6 的箭头函数是可以避免 ES5 中使用 this 的坑的。**箭头函数的 this 始终指向函数定义时的 this，而非执行时**。箭头函数需要记着这句话：**“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”**。

例 8 ：

```js
var name = 'windowsName'

var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    setTimeout(() => {
      this.func1()
    }, 100)
  }
}

a.func2() // Cherry
```

### 在函数内部使用 \_this = this

如果不使用 ES6，那么这种方式应该是最简单的不会出错的方式了，我们是先将调用这个函数的对象保存在变量 \_this 中，然后在函数中都使用这个 \_this，这样 \_this 就不会改变了。

例 9：

```js
var name = 'windowsName'

var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    var _this = this
    setTimeout(function () {
      _this.func1()
    }, 100)
  }
}

a.func2() // Cherry
```

这个例子中，在 func2 中，首先设置 **var \_this = this**;，这里的 **this** 是调用 func2 的对象 a，为了防止在 func2 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 **this** 为 **window**。我们将 this(指向变量 a) 赋值给一个变量 **\_this**，这样，在 func2 中我们使用 **\_this** 就是指向对象 a 了。

### 使用 apply、call、bind

#### 使用 apply

例 10：

```js
var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    setTimeout(
      function () {
        this.func1()
      }.apply(a),
      100
    )
  }
}

a.func2() // Cherry
```

#### 使用 call

例 11：

```js
var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    setTimeout(
      function () {
        this.func1()
      }.call(a),
      100
    )
  }
}

a.func2() // Cherry
```

### 使用 bind

例 12：

```js
var a = {
  name: 'Cherry',

  func1: function () {
    console.log(this.name)
  },

  func2: function () {
    setTimeout(
      function () {
        this.func1()
      }.bind(a)(),
      100
    )
  }
}

a.func2() // Cherry
```

### apply、call、bind 区别

在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 中定义 **apply** 如下:

> apply() 方法调用一个函数, 其具有一个指定的 this 值，以及作为一个数组（或类似数组的对象）提供的参数

语法：

> fun.apply(thisArg, [argsArray])

- thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是 window 对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。

### apply 和 call 的区别

其实 apply 和 call 基本类似，他们的区别只是传入的参数不同。

call 的语法为：

```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

所以 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。

例 13：

```js
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  }
}

var b = a.fn
b.apply(a, [1, 2]) // 3
```

例 14：

```js
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  }
}

var b = a.fn
b.call(a, 1, 2) // 3
```

### bind 和 apply、call 区别

我们先来将刚刚的例子使用 bind 试一下

```js
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  }
}

var b = a.fn
b.bind(a, 1, 2)
```

我们会发现并没有输出，这是为什么呢，我们来看一下 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 上的文档说明：

> bind()方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

所以我们可以看出，**`bind 是创建一个新的函数`**，我们必须要手动去调用：

```js
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  }
}

var b = a.fn
b.bind(a, 1, 2)() // 3
```

[this、apply、call、bind·掘金](https://juejin.im/post/59bfe84351882531b730bac2#comment)
