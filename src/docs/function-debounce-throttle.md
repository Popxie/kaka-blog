## 1.为什么需要函数防抖和函数节流？

> - 在浏览器中某些计算和处理要比其他的昂贵很多。例如DOM操作比起非DOM交互需要更多的内存和CPU占用时间。连续尝试进行过多的DOM操作可能会导致浏览器挂起，甚至崩溃；
> - 例如当调整浏览器大小的时候，resize事件会连续触发；如果在resize事件处理程序内部尝试进行DOM操作，其高频率的更改可能会让浏览器崩溃；
> - 为了绕开上面的问题，需要对该类函数进行节流；

## 2.什么是函数防抖和函数节流

> 防抖（`debounce`）和节流（`throttle`）都是用来控制某个函数在一定时间内执行多少次的技巧，两者相似而又不同。 背后的基本思想是某些代码不可以在没有间断的情况下连续重复执行。

### 2.1 函数防抖·`debounce`

> 如果一个事件被频繁触发多次，并且触发的时间间隔过短，则防抖函数可以使得对应的事件处理函数只执行最后触发的一次。 函数防抖可以把多个顺序的调用合并成一次。  

2.2 函数节流·`throttle`

> 如果一个事件被频繁触发多次，节流函数可以按照固定频率去执行对应的事件处理方法。 函数节流保证一个事件一定时间内只执行一次。

## 3.应用场景  
|类型|场景|  
--|--|
函数防抖|1.手机号、邮箱输入检测 <br/>2.搜索框搜索输入（只需最后一次输入完后，再放松Ajax请求 <br/>3.窗口大小`resize`（只需窗口调整完成后，计算窗口大小，防止重复渲染）<br/>4.滚动事件`scroll`（只需执行触发的最后一次滚动事件的处理程序）<br/>5. 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，（停止输入后）验证一次就好
函数节流 | 1.DOM元素的拖拽功能实现（`mousemove`） <br/>2.射击游戏的 `mousedown`/`keydown` 事件（单位时间只能发射一颗子弹） <br/>3.计算鼠标移动的距离（`mousemove`） <br/>4.搜索联想（`keyup`） <br/>5.滚动事件`scroll`，（只要页面滚动就会间隔一段时间判断一次）  

## 4.如何实现  

### 4.1函数防抖实验

```
// bad
function debounce(fn, delay) {
    let timer = null
    // 返回函数对debounce作用域形成闭包
    return function () {
        // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
        let _this = this, args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(_this, args)
        }, delay)
    }
}
// good
function debouncesss (fn, delay) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(args)
    }, delay)
  }
}
```

代码解读  

- 第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码
- 当第二次调用该函数时，它会清除前一次的定时器并设置另一个
- 如果前一个定时器已经执行过了，这个操作就没有任何意义
- 然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器
- 目的是**只有在执行函数的请求停止了delay时间之后才执行。**

### 4.2函数节流实现

#### 4.2.1 利用时间戳简单实现

```
// bad
function throttle(fn, threshold) {
    let timer
    let prev = Date.now()
    return function () {
        let _this = this, args = arguments
        let now = Date.now()
        if (now - prev > threshold) {
            prev = now
            fn.apply(_this, args)
        }
    }
}
// good
function throttle (fn, threshold) {
  let prev = Date.now()
  return (...args) => {
    let now = Date.now()
    if (now - prev > threshold) {
      prev = now
      fn(args)
    }
  }
}

```

#### 4.2.2 利用定时器简单实现

```
// bad
function throttle2(fn, threshold) {
    let timer
    return function () {
        let _this = this, args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(_this, args)
                timer = null
            }, threshold)
        }
    }
}

// good
function throttle2(fn, threshold) {
    let timer
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn(args)
                timer = null
            }, threshold)
        }
    }
}
```

## 总结

- `debounce`和`throttle`均是通过减少高频触发事件的实际事件处理程序的执行来提高事件处理函数运行性能的手段，并没有实质上减少事件的触发次数。
- `debounce`可以把多个顺序的调用合并成一次。
- `throttle`保证一个事件一定时间内只执行一次。
- 

[JS函数节流和函数防抖](https://juejin.im/post/6844903728328212488)  

[函数防抖与函数节流](https://juejin.im/post/6844904163848011783#comment)