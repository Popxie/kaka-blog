<!--
 * @Description: JavaScript文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/class类总结.md
 * @Date: 2021-06-17 19:46:59
 * @LastEditTime: 2021-06-17 19:48:29
-->

# ES6 class 总结篇

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
```

- 定义`“类”`的方法的时候，前面`不需要`加上`function`这个关键字,方法之间`不需要逗号`分隔，加了会报错。

---

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

- 类的数据类型就是函数，类本身就指向构造函数。

---

- 类的所有方法都定义在类的 prototype 属性上面。

---

## 方法

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {}
}
```

- 在`类`的`实例上面`调用方法，其实就是调用`原型上`的方法。

---

## constructor

```js
class B {}
let b = new B()

b.constructor === B.prototype.constructor // true
```

- 实例的`constructor`方法就是`类`的原型的`constructor`方法

---

- `类`的`方法`都定义在`prototype对象`上面

```js
Point.prototype.constructor === Point // true
```

- `prototype` 对象的 `constructor` 属性，直接指向`“类”的本身`，这与 ES5 的行为是一致的
- 类的内部`所有`定义的方法，都是`不可枚举`的（non-enumerable）,ES5 是可以的

---

```js
class Point {}

// 等同于
class Point {
  constructor() {}
}
```

- constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

---

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}

var point = new Point(2, 3)

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

- 与 ES5 一样，`实例的属性`除非显式定义在其本身（即`定义在this对象上`），否则都是定义在`原型上`（即`定义在class上`）

---

```js
let methodName = 'getArea'

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

- 类的属性名，可以采用表达式

---

- 类和模块的内部，默认就是`严格模式`，所以不需要使用 use strict 指定运行模式

- 不存在提升

---

- 箭头函数内部的 this 总是指向定义时所在的对象

---

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo()
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

- `静态方法`，可以直接在 Foo 类上调用（`Foo.classMethod()`），而不是在 Foo 类的实例上调用。

- 父类的`静态方法`，可以被`子类继承`。

## 属性

### 实例属性

```js
// 定义在constructor()方法里面的this上面 (this指向实例)
class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('Getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
// 定义在类的最顶层
class IncreasingCounter {
  _count = 0 // 一眼就能看出这个类有哪些实例属性
  get value() {
    console.log('Getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

- `实例属性`除了定义在 constructor()方法里面的`this上面`，也可以定义在类的`最顶层`。

---

### 静态属性

```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1

// 新写法
class Foo {
  static prop = 1
}
```

- `静态属性`指的是 `Class 本身`的属性，即`Class.propName`，而不是定义在实例对象（this）上的属性。

## 继承

```js
class Point {
  //
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y) // 调用父类的constructor(x, y)
    this.color = color
  }

  toString() {
    return this.color + ' ' + super.toString() // 调用父类的toString()
  }
}
```

- `super`关键字，它在这里表示`父类的构造函数`，用来`新建父类的this对象`。

- 子类必须在`constructor方法`中调用`super`方法

---

```js
Object.getPrototypeOf(ColorPoint) === Point // true
```

- `Object.getPrototypeOf`方法可以用来从子类上获取父类。

---

### super

- super 这个关键字，既可以当作函数使用，也可以当作对象使用

#### 函数

```js
class A {}

class B extends A {
  constructor() {
    super()
  }
}
```

- `super()`表示父类的构造函数

#### 对象

待补充····
