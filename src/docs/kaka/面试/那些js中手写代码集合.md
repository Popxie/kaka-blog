<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/那些js中手写代码集合.md
 * @Date: 2022-02-16 00:47:47
 * @LastEditTime: 2022-10-19 11:56:08
-->

# 那些 js 中手写代码集合

## [1. 实现一个 new 操作符·GitHub](https://github.com/mqyqingfeng/Blog/issues/13)

```js
function Person() {
    this.name = 'kaka'
    this.age = 18

    // 如果返回的是数组则实例的属性都是undefined
    // 如果返回的是对象 那么实例就是指向这个返回的对象
    return {
        name: 'haha'
    }

    // 如果返回基本类型，相当于没有任何操作
    return '基本类型'
}

function myNew() {
    const obj = new Object()
    // 将类数组对象arguments转换成真正的数组，从而调用数组的方法
    // 截取 arguments的第一个参数函数f，实际就是Person构造函数
    const Constructor = [].shift.call(arguments) // 等价于 Array.prototype.shift.call(arguments)

    obj.__proto__ = Constructor.prototype

    // 由于使用了 shift 会改变数组原始长度 所以现在的 arguments 是去除第一个形参后的新数组
    const result = Constructor.call(obj, arguments)

    return typeof result === 'object' ? result : obj
}

const person = myNew(Person, 'xx', 30)
```

## [实现 call 和 apply](https://github.com/mqyqingfeng/Blog/issues/11)

> 1. 将**调用call或apply的函数**设为**传入对象**的属性  
> 2. 执行该函数（执行之前要先用 [] 暂存所有的`arguments[${i}]）`
> 3. 删除该函数

```js
Function.prototype.call2 = function(context) {
    context = context || window
    context.fn = this // 这里的this 实际就是调用 call2()的函数，如下demo中的 bar.call2(obj, 'kevin', 18)，此时this 指的就是bar

    const args = []

    for (let i = 1; i < arguments.length; i++) {
        args.push(`arguments[${i}]`)
    }
    // eval(String) 如果String是可执行js脚本就会执行 否则原样返回
    // eval 会自动将 args toString化, '[arguments[1], arguments[2]]' => 'arguments[1], arguments[2]'
    const result = eval(`context.fn(${args})`)
    // 实际执行效果：
    // var result = context.fn(arguments[1], arguments[2], ...)
    delete context.fn

    return result
}
```

```js
Function.prototype.apply2 = function(context, arr) {
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

> 1. 返回一个函数  
> 2. 可以传入参数

* bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但会指向实例，且传入的参数依然生效

```js
Function.prototype.bind2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error(
            'Function.prototype.bind - what is trying to be bound is not callable'
        )
    }

    // self 指调用bind2的函数
    var self = this
    var args = Array.prototype.slice.call(arguments, 1)

    var fNOP = function() {}

    var fBound = function() {
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

## 4. 实现一个 flat 不改变数组中的数据类型

* 不改变数据类型

```js
  // 方法1 ES6特性 array.flat()
  ;
  [1, 2, ['3', 4, '5', [6, [7, 8], 9]]].flat(Infinity) // [1, 2, '3', 4, '5', 6, 7, 8, 9]
```

```js
  // 方法2 forEach + 递归
  const arrs = [1, 2, ['3', 4, '5', [6, [7, 8], 9]]]
  const newArr = []

  function flatFn(params) {
      if (Array.isArray(params)) {
          params.forEach(item => {
              Array.isArray(item) ? flatFn(item) : newArr.push(item)
          })
      }
  }
  flatFn(arrs)
  console.log('newArr:', newArr)
```

```js
  // 方法3 通过reduce + 递归
  const arrs = [1, 2, ['3', 4, '5', [6, [7, 8], 9]]]

  function flatFn2(params) {
      const a = params.reduce((pre, cur) => {
          return pre.concat(Array.isArray(cur) ? flatFn2(cur) : cur)
      }, [])

      return a
  }

  const newArr2 = flatFn2(arrs)

  console.log('newArr2:', newArr2)
```

* 改变数据类型

```js
  //方法4：使用数组方法join和字符串方法split进行数组扁平化
  let arr1 = [1, 2, ['3', 4, '5', [6, [7, 8], 9]]]
  // arr1.join(',') // '1,2,3,4,5,6,7,8,9'
  // arr1.join(',').split(',') // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res1 = arr1.join(',').split(',').map(Number) // 也有String方法
  // 等价于
  let res1 = arr1.join(',').split(',').map((item) => Number(item))
  
  console.log(res1) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```js
  //方法5：通过正则方法和JSON.stringify（）方法和数组方法
  let res3 = JSON.stringify(arr1).replace(/\[|\]/g, '').split(',').map(Number)
  console.log(res3)
```

## 截取地址栏参数

* 获取 `?` 后的参数并组装成 对象

```js
  const url = 'https://localhost:8080/a/b?name=kaka&age=22#token=222'

  function getParams() {
      const obj = {}
      const paramsString = url.split('?')[1]
      const paramsArr = paramsString.split('&')
      paramsArr.forEach(item => {
          const key = item.split('=')[0]
          const value = item.split('=')[1]
          obj[key] = value
          // 剔除value为空的属性
          if (!obj[key]) delete obj[key]
      })
      return obj
  }
```

* 实现一个 `parseUrl函数` 解析当前 url 的各个部分

```js
  // 效果如下
  parts = {
      protocol: 'https',
      host: 'localhost:8080',
      path: '/a/b', // 对应 new URL()的 pathname
      query: { // new URL() 对象 没有这个字段
          name: 'kaka',
          age: '22',
      },
      hash: {
          token: '222'
      }
  }
```

```js
    const urlPath1 = 'https://localhost:8080/a/b?name=kaka&age=22#/home?token=222&color=red'
    const urlPath2 = 'https://localhost:8080/a/b?name=kaka&age=22' // location.search = ?name=kaka&age=22
    const urlPath3 = 'https://localhost:8080/a/b#/home?token=222&color=red' // location.hash = #/home?token=222&color=red

    function getQueryOrHashParams(paramString) {
        if (!paramString) return {}
        // 存放截取出来的 key=value， [key1=val1, key2=val2, ···]
        let arr
        if (paramString.startsWith('?')) {
            // 此问号不是hash（#/）后面的?开头，而是hash前面的
            arr = paramString.split('?')[1].split('&')
        } else if (paramString.startsWith('#')) {
            console.log('paramString:', paramString)
            // 判断hash中是否有 ?
            arr = paramString.indexOf('?') > -1 ? paramString.split('?')[1].split('&') : []
            console.log('arr:', arr)
        }

        // console.log('arr:', arr)
        const obj = {}
        arr.forEach(item => {
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            obj[key] = value
            if (!value) delete obj[key] // 剔除空值属性
        })
        return obj
    }

    function parseUrl(url) {
        const {
            protocol,
            host,
            pathname,
            search,
            hash
        } = new URL(url) // 得到一个 URL 对象

        return {
            protocol,
            host,
            path: pathname,
            query: getQueryOrHashParams(search),
            hash,
            hashParamsObj: getQueryOrHashParams(hash)
        }
    }

    const parts1 = parseUrl(urlPath1)
    const parts2 = parseUrl(urlPath2)
    const parts3 = parseUrl(urlPath3)

    console.log('parts1:', parts1)
    console.log('parts2:', parts2)
    console.log('parts3:', parts3)
```
