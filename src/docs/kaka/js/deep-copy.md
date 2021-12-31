<!--
 * @Description: 面试文件夹 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/deep-copy.md
 * @Date: 2021-06-11 11:05:19
 * @LastEditTime: 2021-12-31 14:55:19
-->

# Object & Array 的深拷贝

首先看个例子:

```js
let a = { name: '张三' }
let b = a
b.name = '李四'
console.log('a:', a) // 李四
console.log('b:', b) // 李四

var a = [1, 2, 3]
var b = a
b.push(4)
console.log('a:', a) //1,2,3,4
console.log('b:', b) //1,2,3,4
```

因为在 JavaScript 中,对象跟数组属于引用数据类型,指针都会指向同一个,所以一改都改.
如何各改各的呢?(深拷贝)

## 方法一 (拓展运算符，只深拷贝第一层)

```js
let a = { name: '张三' }
let b = { ...a }
b.name = '李四'
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [1, 2]
let b = [...a]
b[1] = 3
console.log('a:', a) // [1, 2]
console.log('b:', b) // [1, 3]
```

## 方法二 (JSON.parse(JSON.stringify()))

```js
let a = { name: '张三' }
let b = {}
b = JSON.parse(JSON.stringify(a))
b.name = '李四'
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [1, 2]
let b = []
b = JSON.parse(JSON.stringify(a))
b[1] = 3
console.log('a:', a) // [1,2]
console.log('b:', b) // [3]
```

### 缺点

> - **正则会被处理为空对象**
> - **具备函数/symbol/undefined 属性值直接被干掉**
> - **BigInt 还处理不了，会报错 // Uncaught TypeError: Do not know how to serialize a BigInt**
> - **日期对象最后还是字符串**

```js
let obj = {
  a:1,
  b:/^$/,
  c:undefined,
  d:new Date()
}
console.log(JSON.parse(JSON.stringify(obj)))
// 结果如下
{
  a:1,
  b:{},
  d:"2020-11-20T07:04:10.653Z"
}
```

## 方法三 (函数方法)

```js
function deepCopy(param) {
  if (!param) return param

  if (param instanceof Date) return new Date(param)
  
  if (param instanceof RegExp) return new RegExp(param)

  if (typeof param !== "object") return param

  // const blankArrOrObj = param instanceof Array ? [] : {}
  // 或者
  const blankArrOrObj = Array.isArray(param) ? [] : {}

  // tips: for in 如果是数组那么就是 (index in arr) 如果是 对象 则就是 (key in obj)
  for (const keyOrIndex in param) {
    blankArrOrObj[keyOrIndex] = typeof param[keyOrIndex] === 'object' 
      ? deepCopy(param[keyOrIndex]) 
      : param[key]
  }
  return blankArrOrObj
}

let a = { name: '张三' }
b = deepCopy(a)
b.name = '李四'
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [1, 2]
b = deepCopy(a)
b[1] = 3
console.log('a:', a) // [1,2]
console.log('b:', b) // [3]
```

[深拷贝的终极探索·掘金](https://juejin.im/post/6844903692756336653)  
[浅拷贝与深拷贝·掘金](https://juejin.cn/post/6844904197595332622)
