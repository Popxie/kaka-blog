<!--
 * @Description: 专门用于显示 ‘you dont know js’ & 'es6文章'相关文档
 * @Author: xiehuaqiang
 * @Date: 2020-06-28 14:00:02
--> 
<template>
  <div>
    <div class="markdown-body">
      <this-ch1 v-if="path === 'ch1'" v-highlight/>
      <this-ch2 v-else-if="path === 'ch2'" v-highlight/>
      <this-ch3 v-else-if="path === 'ch3'" v-highlight/>
      <this-ch4 v-else-if="path === 'ch4'" v-highlight/>
      <this-ch5 v-else-if="path === 'ch5'" v-highlight/>
      <this-ch6 v-else-if="path === 'ch6'" v-highlight/>
      <types-grammar-ch1 v-else-if="path === 'types-grammar-ch1'" v-highlight/>
      <types-grammar-ch2 v-else-if="path === 'types-grammar-ch2'" v-highlight/>
      <types-grammar-ch3 v-else-if="path === 'types-grammar-ch3'" v-highlight/>
      <types-grammar-ch4 v-else-if="path === 'types-grammar-ch4'" v-highlight/>
      <types-grammar-ch5 v-else-if="path === 'types-grammar-ch5'" v-highlight/>
      <class v-else-if="path === 'class'" v-highlight/>
      <class-extends v-else-if="path === 'class-extends'" v-highlight/>
      <promise v-else-if="path === 'promise'" v-highlight/>
      <object-extends v-else-if="path === 'object'" v-highlight/>
      <destructuring v-else-if="path === 'destructuring'" v-highlight/>
      <regex v-else-if="path === 'regex'" v-highlight/>
      <object-methods v-else-if="path === 'object-methods'" v-highlight/>
      <function v-else-if="path === 'function'" v-highlight/>
      <module v-else-if="path === 'module'" v-highlight/>
      <module-loader v-else-if="path === 'module-loader'" v-highlight/>
      <deep-01 v-else-if="path === 'deep-01'" v-highlight/>
      <deep-02 v-else-if="path === 'deep-02'" v-highlight/>
      <deep-03 v-else-if="path === 'deep-03'" v-highlight/>
      <deep-04 v-else-if="path === 'deep-04'" v-highlight/>
      <deep-05 v-else-if="path === 'deep-05'" v-highlight/>
      <deep-06 v-else-if="path === 'deep-06'" v-highlight/>
      <deep-07 v-else-if="path === 'deep-07'" v-highlight/>
      <deep-08 v-else-if="path === 'deep-08'" v-highlight/>
      <deep-09 v-else-if="path === 'deep-09'" v-highlight/>
      <deep-10 v-else-if="path === 'deep-10'" v-highlight/>
      <deep-11 v-else-if="path === 'deep-11'" v-highlight/>
      <deep-12 v-else-if="path === 'deep-12'" v-highlight/>
      <deep-13 v-else-if="path === 'deep-13'" v-highlight/>
      <deep-14 v-else-if="path === 'deep-14'" v-highlight/>
      <deep-15 v-else-if="path === 'deep-15'" v-highlight/>
    </div>
    <div id="gitalk-container" class="1"></div>
  </div>
</template>
<script>

export default {
  components: {
    'this-ch1': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch1.md'),
    'this-ch2': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch2.md'),
    'this-ch3': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch3.md'),
    'this-ch4': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch4.md'),
    'this-ch5': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch5.md'),
    'this-ch6': () => import('@/docs/You-Dont-Know-JS/this & object prototypes/ch6.md'),
    'types-grammar-ch1': () => import('@/docs/You-Dont-Know-JS/types & grammar/ch1.md'),
    'types-grammar-ch2': () => import('@/docs/You-Dont-Know-JS/types & grammar/ch2.md'),
    'types-grammar-ch3': () => import('@/docs/You-Dont-Know-JS/types & grammar/ch3.md'),
    'types-grammar-ch4': () => import('@/docs/You-Dont-Know-JS/types & grammar/ch4.md'),
    'types-grammar-ch5': () => import('@/docs/You-Dont-Know-JS/types & grammar/ch5.md'),
    'class': () => import('@/docs/ruanyifeng/docs/class.md'),
    'class-extends': () => import('@/docs/ruanyifeng/docs/class-extends.md'),
    'promise': () => import('@/docs/ruanyifeng/docs/promise.md'),
    'object-extends': () => import('@/docs/ruanyifeng/docs/object.md'),
    'destructuring': () => import('@/docs/ruanyifeng/docs/destructuring.md'),
    'regex': () => import('@/docs/ruanyifeng/docs/regex.md'),
    'object-methods': () => import('@/docs/ruanyifeng/docs/object-methods.md'),
    'function': () => import('@/docs/ruanyifeng/docs/function.md'),
    'module': () => import('@/docs/ruanyifeng/docs/module.md'),
    'module-loader': () => import('@/docs/ruanyifeng/docs/module-loader.md'),
    'deep-01': () => import('@/docs/qingfeng/深入系列文章/01从原型到原型链.md'),
    'deep-02': () => import('@/docs/qingfeng/深入系列文章/02词法作用域和动态作用域.md'),
    'deep-03': () => import('@/docs/qingfeng/深入系列文章/03执行上下文栈.md'),
    'deep-04': () => import('@/docs/qingfeng/深入系列文章/04变量对象.md'),
    'deep-05': () => import('@/docs/qingfeng/深入系列文章/05作用域链.md'),
    'deep-06': () => import('@/docs/qingfeng/深入系列文章/06从ECMAScript规范解读this.md'),
    'deep-07': () => import('@/docs/qingfeng/深入系列文章/07执行上下文.md'),
    'deep-08': () => import('@/docs/qingfeng/深入系列文章/08闭包.md'),
    'deep-09': () => import('@/docs/qingfeng/深入系列文章/09参数按值传递.md'),
    'deep-10': () => import('@/docs/qingfeng/深入系列文章/10call和apply的模拟实现.md'),
    'deep-11': () => import('@/docs/qingfeng/深入系列文章/11bind的模拟实现.md'),
    'deep-12': () => import('@/docs/qingfeng/深入系列文章/12new的模拟实现.md'),
    'deep-13': () => import('@/docs/qingfeng/深入系列文章/13类数组对象与arguments.md'),
    'deep-14': () => import('@/docs/qingfeng/深入系列文章/14创建对象的多种方式以及优缺点.md'),
    'deep-15': () => import('@/docs/qingfeng/深入系列文章/15继承的多种方式和优缺点.md'),
  },
  data() {
    return {
      path: ''
    }
  },
  watch: {
    $route: 'routerchange'
  },
  created() {
    this.path = this.$route.path.split('/').pop()
  },
  methods: {
    routerchange(route) {
      const arr = route.path.split('/')
      this.path = arr.pop()
    }
  }
}
</script>

<style lang="scss">
  .markdown-body {
    max-width: 1100px;
    background: #ffffff;
    padding:  0 20px;
  }
</style>

