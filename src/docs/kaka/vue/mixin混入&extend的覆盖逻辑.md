<!--
 * @Description: VUE文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/vue/mixin混入&extend的覆盖逻辑.md
 * @Date: 2021-06-17 20:15:52
 * @LastEditTime: 2021-06-17 20:15:53
-->

# mixin 混入 & extend 覆盖逻辑

## 1.data: 组件数据优先

> 当`组件`和`混入对象`含有`同名选项`时，这些选项将以恰当的方式进行“`合并`”。比如，数据对象在内部会进行递归合并，并在发生冲突时以`组件数据优先`。

```js
var mixin = {
  data: function() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function() {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

## 2.钩子: 混入对象的钩子将在组件自身钩子之前调用

> `同名钩子函数`将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子`之前`调用。

```js
var mixin = {
  created: function() {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function() {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

## 3.对象：取组件对象的键值对

> 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取`组件对象`的键值对。

```js
var mixin = {
  methods: {
    foo: function() {
      console.log('foo')
    },
    conflicting: function() {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function() {
      console.log('bar')
    },
    conflicting: function() {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

注意：`Vue.extend()` 也使用同样的策略进行合并。

> 已上都是官方默认的合并策略，当然也可以`自定义选项合并策略`

[阅读官方文档](https://cn.vuejs.org/v2/guide/mixins.html#%E5%9F%BA%E7%A1%80)

[相关 vue 面试题文档·附：简述 mixin、extends 的覆盖逻辑](https://juejin.cn/post/6919373017218809864#heading-27)
