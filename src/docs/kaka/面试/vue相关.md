<!--
 * @Description: 面试文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/vue相关.md
 * @Date: 2021-10-28 16:39:52
 * @LastEditTime: 2021-10-29 19:49:22
 * https://github.com/lgwebdream/FE-Interview/issues/1186 相关面经仓库
-->

# Vue 相关面试题

## 1.下列代码会输出什么（字节）？？

```js
for (let i = 0; i < 10; i++) {
  this.a = i
  this.$nextTick(() => {
    console.log(this.a)
  })
}
// 10次9
```

- 分析

  因为通过 `this.$nextTick` 注册的回调函数会被放到视图更新后的下一个事件循环执行、而 for 循环每次都是更改的 `this` 实例上的 `a` 属性的值、当 for 执行完后 `this.a = 9`在执行 `this.$nextTick` 注朋的回调函数的时候获取 `this.a` 的时候获取到的值也就是 9 了

## 2.页面渲染出来的值是什么？

```html
<template>
  <div>{{a.b}}</div>
</template>

<script>
  export default {
    data() {
      return {
        a: {}
      }
    },
    created() {
      this.a.b = 1
    },
    mounted() {
      this.a.b = 2
    }
  }
</script>
```

- 答案

  ```JS
  // vue3 之前
  1;
  // vue3
  2;
  ```

- 分析

  涉及到两个知识点，一个是 vue 响应式原理，一个是
  created 和 mounted 两个生命周期的区别。

  - 1 . `Vue` 无法检测 `property` 的添加或移除。由于 `Vue`会在初始化实例时对 `property` 执行`getter/setter` 转化，所以 `property` 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。所以 `this.a.b` 中的 `b` 是非响应式的

  - 2 .又因为在 `created` 视图未渲染时直接对对象 `a`的属性 `b` 赋值 `data` 里面的初值会改变的，但是在 `mounted` 里面更新 `this.a.b` 的值的时候是非响应式的，所以视图不会更新。注意，`Vue3` 之后采用了 `proxy` 方式，所以 Vue3 版本会渲染出 2

## Vue 如何做权限校验

- 1.1 接口权限控制

  在用户登录成功之后,后台将返回一个 `token`,之后前端每次进行接口请求的时候,都要带上这个 `token`。后台拿到这个 `token` 后进行判断,如果此 `token` 确实存在并且没有过期,则可以通过访问。如果 `token` 不存在或后台判断已过期,则会跳转到登录页面,要求用户重新登录获取 `token`。

- 1.2 页面权限控制

  - 实现页面访问权限又可分为以下两种方案

    - 初始化即挂载全部路由,每次路由跳转前做校验

    - 只挂载当前用户拥有的路由,如果用户通过 `URL` 进行强制访问,则会直接进入 `404`,相当于从源头上做了控制

  - 页面中的按钮(增、删、改、查)的权限控制是否
    显示

  - `Vue` 提供的自定义指令,实现按钮权限控制
