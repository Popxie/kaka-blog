<!--
 * @Description: 面试文件夹: '原型，原型链，原型继承'
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/js/prototype.md
 * @Date: 2021-06-10 15:38:00
 * @LastEditTime: 2021-06-17 19:25:57
-->

# 原型链

[1. 一张图理解 JS 的原型](http://juejin.im/post/5b729c24f265da280f3ad010)

![原型.png](https://raw.githubusercontent.com/Popxie/kaka-img-repo/master/img/daily-notes/22_原型.png)

[2. 看完秒懂原型和原型链](https://juejin.im/post/5cf646466fb9a07eb3096802)

```js
p1.constructor === p1.__proto__.constructor
p1.constructor === Person.prototype.constructor

// 由此得出结论：
p1.__proto__ === Person.prototype

// 另外：
Person.prototype.constructor === Person
```

---

## 1.原型链继承

```js
SubType.prototype = new SuperType() // SubType继承SuperType
```

```js
function SuperType() {
  this.property = true
}

SuperType.prototype.getSuperValue = function() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

//继承SuperType
SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function() {
  return this.subproperty
}

var instance = new SubType()
console.log(instance.getSuperValue()) // true
```

## 2.构造函数继承

- 缺点：

  > 构造函数继承方式并没有继承父类原型上的（SuperType.prototype.xxx）属性（sayName() & text)，只能继承非原型上的属性！

- 优点：
  > 每个实例都有自己的 colors 属性的副本

```js
function SuperType() {
  this.colors = ['red', 'blue']
  SuperType.prototype.text = '3q'
  SuperType.prototype.sayName = function() {
    console.log('sayName')
  }
}

function SubType() {
  SuperType.call(this) // 继承！ 但是无法继承SuperType.prototype
}
let instance = new SubType()
console.log('instance:', instance) // {colors:["red", "blue"]}

let instance1 = new SubType()
instance1.colors.push('black')

console.log('instance1.colors:', instance1.colors) // ["red", "blue", "black"]

let instance2 = new SubType()
console.log('instance2.colors:', instance2.colors)[('red', 'blue')]
```

## 3.组合继承

```js
function SuperType(name) {
  this.colors = ['red', 'blue']
  this.name = name
  SuperType.prototype.sayName = function() {
    console.log('name:', this.name)
  }
}

/**
 * 当调用call()后
 * 继承SuperType的colors 和 name属性
 * 此时SubType的实例（new SubType()）的__proto__的值还是SubType.prototype
 **/
function SubType(name, age) {
  SuperType.call(this, name) // 继承！
  this.age = age
}

/**
 * 当 SubType.prototype = new SuperType() 以后
 * 此时SubType的实例（new SubType()）的__proto__的值SuperType的实例
 **/
SubType.prototype = new SuperType() // 导致SubType.prototype原有的constructor没有了

/**
 * 构造函数.prototype.constructor = 构造函数
 * 所以这里要重新赋值原有的constructor
 **/
SubType.prototype.constructor = SubType

SubType.prototype.sayAge = function() {
  console.log('age:', this.age)
}

let instance1 = new SubType('kaka', 24)
instance1.colors.push('black')
instance1.sayName() // name: kaka
instance1.sayAge() // age:24
console.log('instance1.colors:', instance1.colors) // ["red", "blue", "black"]

let instance2 = new SubType('xiehuaqiang', 99)
instance2.sayName() // name: xiehuaqiang
instance2.sayAge() // age: 99
console.log('instance2.colors:', instance2.colors) // ["red", "blue"]
```
