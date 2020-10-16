## Object & Array的深拷贝  

首先看个例子:
```
let a = { name: '张三' } 
let b = a
b.name = '李四'
console.log('a:', a) // 李四
console.log('b:', b) // 李四

var a = [1,2,3];
var b = a;
b.push(4);
console.log('a:', a) //1,2,3,4
console.log('b:', b) //1,2,3,4

``` 

因为在JavaScript中,对象跟数组属于引用数据类型,指针都会指向同一个,所以一改都改.
如何各改各的呢?(深拷贝)

* 方法一 (拓展运算符，只深拷贝第一层)  

```
let a = { name: '张三' } 
let b = { ...a } 
b.name = '李四' 
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [ 1, 2 ] 
let b = [...a] 
b[1] = 3 
console.log('a:', a) // [1, 2]
console.log('b:', b) // [1, 3]
```  

* 方法二  (JSON.parse(JSON.stringify()))

```
let a = { name: '张三' } 
let b = {} 
b = JSON.parse(JSON.stringify(a)) 
b.name = '李四' 
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [ 1, 2 ] 
let b = [] 
b = JSON.parse(JSON.stringify(a)) 
b[1] = 3 
console.log('a:', a) // [1,2]
console.log('b:', b) // [3]
```

* 方法三 (函数方法)  
 
```
function deepcopy(source) { 
    if (!source) { return source } 
    const sourceCopy = source instanceof Array ? [] : {} 
    for (const item in source) { 
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item] 
    } 
    return sourceCopy 
}

let a = { name: '张三' } 
const b = deepcopy(a)
b.name = '李四'
console.log('a:', a) // {name: "张三"}
console.log('b:', b) // {name: "李四"}

let a = [ 1, 2 ] 
b = deepcopy(a) 
b[1] = 3 
console.log('a:', a) // [1,2]
console.log('b:', b) // [3]
```

方法4
```
 /**
   * 深度复制对象
   * @param {Object} obj
   * @return {Object}
   */
  function deepClone (obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item))
    }
    if (typeof obj === 'object') {
      return Object.assign({}, obj)
    }
    return obj
  }
```