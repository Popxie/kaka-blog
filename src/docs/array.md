关键词：
`数组去重` `数组排序` `数组常用方法` 

## 1.数组去重  

#### 1.1对象数组去重

```
const list = [
    { age: 10 },
    { age: 10 },
    { age: 9 },
    { age: 9 },
]
        
/**
 * 方法一
 **/
function noRepeatFn1(arr) {
    let newArr = []; //盛放去重后数据的新数组
    for (item1 of arr) {
        let flag = true; // true为不重复
        for (item2 of newArr) {
            if (item1.age == item2.age) {
                flag = false;
            }
        }
        if (flag) { //判断是否重复
            newArr.push(item1);
        }
    }
    return newArr;
};
const noRepeatArr1 = noRepeatFn1(list);
console.log('noRepeatArr1:', noRepeatArr1); // [{age: 9}, {age: 10}]

/**
 * 方法二
 * accumulator (累计器，累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue)
 * cur：当前元素
 * index：当前元素索引
 * arr：被遍历的数组
 * accumulator.push(cur) 返回的是数组长度！！！
 **/
function noRepeatFn2(arr) {
    let obj = {}
    arr = arr.reduce((accumulator, cur, index, arr) => {
        // 写法一
        obj[cur.age] ? '' : obj[cur.age] = accumulator.push(cur) // 将累计器的长度赋值给obj[cur.age]且改变accumulator的长度
        
        // 写法二   key in obj (判断key是否在obj中有对应)
        if(!(cur.age in obj)) obj[cur.age] = accumulator.push(cur)
        
        return accumulator
    }, []) // 设置初始迭代值(initialValue)为：[]
    return arr
}
const noRepeatArr2 = noRepeatFn2(list)
console.log('noRepeatArr2:', noRepeatArr2) // [{age: 9}, {age: 10}]
```

#### 1.2.简单数组去重  

```
const simpleArr = [1, 2, 3, 4, 4, 5, 5, 6, 6]

/**
 * 方法一
 **/
function simpleArrFn1(arr) {
    let newArr = new Set(arr);
    return [...newArr]
}
const simpleArr1 = simpleArrFn1(simpleArr);
console.log('simpleArr1:', simpleArr1); // [1,2,3,4,5,6]

/**
 * 方法二
 **/
function simpleArrFn2(arr) {
    let newArr = []
    arr.forEach((item, index) => {
        if (newArr.indexOf(item) === -1) {
            newArr.push(item);
        }
    })
    return newArr
}
const simpleArr2 = simpleArrFn2(simpleArr);
console.log('simpleArr2:', [...simpleArr2]); // [1,2,3,4,5,6]

/**
 * 方法三
 * arr 当前元素属于的数组对象
 **/
const arr2 = simpleArr.filter((item, index, arr) => {
    return arr.indexOf(item)===index;
})
console.log(arr2); // [1,2,3,4,5,6]
```

## 2.数组排序  

#### 2.1.对象数组排序

**方法一** · [原文](http://www.jb51.net/article/67458.htm)
```
const arr = [
    {
        age: 3,
        name: 'lise3'
    },
    {
        age: 1,
        name: 'lise1'
    },
    {
        age: 4,
        name: 'lise4'
    },
    {
        age: 2,
        name: 'lise2'
    },

]
```
```
/**
* 根据property条件排序
*/
sortFn(property) {

  let value1,value2;
  
  return function(a, b) {
    if (typeof a === "object" && typeof b === "object" && a && b) {
      value1 = a[property];
      value2 = b[property];
      if (value1 === value2) return 0;
      // if (typeof value1 === typeof value2) return value1 < value2 ? -1 : 1; // 小->大
      
      if (typeof value1 === typeof value2) return value1 < value2 ? 1 : -1; // 小->大
      
      return typeof value1 < typeof value2 ? -1 : 1;
    }
  }
}



arr.sort(sortFn('age')) // [{age:1},{age:2},{age:3},{age:4}]
```

**方法二**

```
sortFn(property) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    // return value2 - value1; // 大->小
    return value1 - value2; // 小->大
  };
},
arr.sort(sortFn('age')) // [{age:1},{age:2},{age:3},{age:4}]
```

#### 2.2简单数组排序  
- **array.sort()**
```
let arr = [2,10,6,1,4,22,3]
console.log(arr.sort())   // [1, 10, 2, 22, 3, 4, 6]

let arr1 = arr.sort((a, b) => a - b)  
console.log(arr1)   // [1, 2, 3, 4, 6, 10, 22]

let arr2 = arr.sort((a, b) => b - a)  
console.log(arr2)  // [22, 10, 6, 4, 3, 2, 1]
```

- **[冒泡排序](https://juejin.im/post/5d6dcd59e51d45620c1c5416)**  
```
/**
 * 外部循环控制所有的回合(自身原有的排列也是一个回合)
 * 内部循环代表每一轮的冒泡处理，先进行元素比较，再进行元素交换。
 * 之所以‘- i’是为了提升性能，每一回合之后最后面的几（i）个是有序的不需要在遍历，还可以进一步优化
 */
let array = [2,0,1,0,2,1]
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
        if (array[j] > array[j+1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j] ]
        }
      }
}

console.log('array:', array) // [0, 0, 1, 1, 2, 2]


// 性能优化后（其实还可以进一步优化）
let array = [2,0,1,0,2,1]
for (let i = 0; i < array.length; i++) {
    let isSorted = true
    for (let j = 0; j < array.length - 1 - i; j++) {
        if (array[j] > array[j+1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]]
            isSorted = false
        }
    }
    if (isSorted) break
}   
console.log('array:', array) // [0, 0, 1, 1, 2, 2]
```

## 3.数组常用方法

``` 
array.find()
array.findIndex()
array.includes()
array.filter()
array.join()
```

[Array·MDN](https://developer.mozilla.org/zh-CN/search?page=2&q=Array.prototype)

[重学JS：数组·掘金](https://juejin.im/post/6844903901003513869)

[JavaScript数组方法大全·知乎](https://zhuanlan.zhihu.com/p/67287054)

## 4.数组其他  

**1.快速生成指定长度的数组**
- 1.1 Array.from()

```
 let arr = Array.from({ length: 5 }) // 长度为5 值为undefined的数组
```

- 1.2 new Array()

```
 let arr = new Array(5).fill('') // 注意，直接使用new Array()的结果是无法进行遍历的
```


相关文档：  
[1.js 数组详细操作方法及解析合集·掘金](https://juejin.im/post/5b0903b26fb9a07a9d70c7e0)