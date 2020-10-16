<!--
 * @Description: 专门用于显示 you dont know js相关文档
 * @Author: xiehuaqiang
 * @Date: 2020-06-28 14:00:02
--> 
<template>
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
    'function': () => import('@/docs/ruanyifeng/docs/function.md')
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
    background: #ffffff;
    padding:  0 20px;
  }
</style>

