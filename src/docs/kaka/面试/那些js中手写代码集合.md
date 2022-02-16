<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/那些js中手写代码集合.md
 * @Date: 2022-02-16 00:47:47
 * @LastEditTime: 2022-02-16 22:13:50
-->

# 那些 js 中手写代码集合

## [1.实现一个 new 操作符·GitHub](https://github.com/mqyqingfeng/Blog/issues/13)

```js
function Person() {
  this.name = 'kaka'
  this.age = 18

  // 如果返回的是数组则实例的属性都是undefined
  // 如果返回的是对象 那么实例就是指向这个返回的对象
  return { name: 'haha' }

  // 如果返回基本类型，相当于没有任何操作
  return '基本类型'
}

function myNew() {
  const obj = new Object()
  // 将类数组对象arguments转换成真正的数组，从而调用数组的方法
  const Constructor = [].shift.call(arguments) // 等价于 Array.prototype.shift.call(arguments)
  
  obj.__proto__ = Constructor.prototype

  // 由于使用了 shift 会改变数组原始长度 所以现在的 arguments 是去除首部的新数组
  const result = Constructor.call(obj, arguments)

  return typeof result === 'object' ? result : obj
}

const person = myNew(Person, 'xx', 30)
```

## [实现一个 bind](https://github.com/mqyqingfeng/Blog/issues/12)

```js

```

## [实现 call 和 apply](https://github.com/mqyqingfeng/Blog/issues/11)

> 1.将函数设为对象的属性  
> 2.执行该函数  
> 3.删除该函数

```js
Function.prototype.call2 = function (context) {
  context = context || window
  context.fn = this

  const args = []

  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }
  // eval(String) 如果String是可执行js脚本就会执行 否则原样返回
  // eval 会 自动将 args toString, '[2,3]' => '2,3'
  const result = eval(`context.fn(${args})`)
  // 实际执行效果：
  // var result = context.fn(arguments[1], arguments[2], ...)
  delete context.fn

  return result
}
```

```js
Function.prototype.apply2 = function (context, arr) {
  context = context || window
  context.fn = this

  if (!arr) return context.fn()

  const args = []

  for (let i = 0; i < arr.length; i++) {
    args.push(`arr[${i}]`)
  }

  const result = eval(`context.fn(${args})`)

  delete context.fn

  return result
}
```

```js
// 测试一下
var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call2(null) // 2

bar.call2(obj, 'kevin', 18)

bar.apply2(null)
bar.apply2(obj, ['kevin', 18]) // {value: 1, name: 'kevin', age: 18}
```

## 3.[实现一个 bind](https://github.com/mqyqingfeng/Blog/issues/12)

> 1.返回一个函数  
> 2.可以传入参数

- bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但会指向实例，且传入的参数依然生效

```js
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  // self 指调用bind2的函数
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }
  // 中转一下 低啊用bind2的函数的原型
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

