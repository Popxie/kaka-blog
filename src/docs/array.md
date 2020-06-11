
[更多数组详细操作](https://juejin.im/post/5b0903b26fb9a07a9d70c7e0)

## 对象数组排序


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

## 简单数组排序  
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