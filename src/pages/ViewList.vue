<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/pages/ViewList.vue
 * @Date: 2020-11-19 14:51:39
-->
<template>
  <div class="markdown-body">
    <webpack-one v-if="path === 'webpack-one'" v-highlight/>
    <array v-else-if="path === 'array'" v-highlight/>
    <event-loop v-else-if="path === 'event-loop'" v-highlight/>
    <es-678 v-else-if="path === 'es-678'" v-highlight/>
    <options v-else-if="path === 'options'" v-highlight/>
    <git-config v-else-if="path === 'git-config'" v-highlight/>
    <git-order-list v-else-if="path === 'git-order-list'" v-highlight/>
    <picture-403 v-else-if="path === 'picture-403'" v-highlight/>
    <rem v-else-if="path === 'rem'" v-highlight/>
    <mac-terminal v-else-if="path === 'mac-terminal'" v-highlight/>
    <install-private-npm v-else-if="path === 'install-private-npm'" v-highlight/>
    <prototype v-else-if="path === 'prototype'" v-highlight/>
    <blog-entry v-else-if="path === 'blog-entry'" v-highlight/>
    <new-date v-else-if="path === 'new-date'" v-highlight/>
    <deep-copy v-else-if="path === 'deep-copy'" v-highlight/>
    <book-list v-else-if="path === 'book-list'" v-highlight/>
    <debounce-throttle v-else-if="path === 'debounce-throttle'" v-highlight/>
    <github-https-to-ssh v-else-if="path === 'github-https-to-ssh'" v-highlight/>
    <npm-yarn v-else-if="path === 'npm-yarn'" v-highlight/>
    <npm-orders v-else-if="path === 'npm-orders'" v-highlight/>
    <npm-version-control v-else-if="path === 'npm-version-control'" v-highlight/>
    <git-rebase v-else-if="path === 'git-rebase'" v-highlight/>
    <git-common-orders v-else-if="path === 'git-common-orders'" v-highlight/>
    <es-2020-operator v-else-if="path === 'es-2020-operator'" v-highlight/>
    <u-dont-konw-npm v-else-if="path === 'u-dont-konw-npm'" v-highlight/>
  </div>
</template>

<script>

export default {
  components: {
    'webpack-one': () => import('@/docs/webpack-one.md'),
    'array': () => import('@/docs/array.md'),
    'event-loop': () => import('@/docs/event-loop.md'),
    'es-678': () => import('@/docs/es678.md'),
    'options': () => import('@/docs/options.md'),
    'git-config': () => import('@/docs/git-config.md'),
    'git-order-list': () => import('@/docs/git-order-list.md'),
    'picture-403': () => import('@/docs/picture-403.md'),
    'rem': () => import('@/docs/rem.md'),
    'mac-terminal': () => import('@/docs/mac-terminal.md'),
    'install-private-npm': () => import('@/docs/install-private-npm.md'),
    'prototype': () => import('@/docs/prototype.md'),
    'blog-entry': () => import('@/docs/blog-entry.md'),
    'new-date': () => import('@/docs/new-date.md'),
    'deep-copy': () => import('@/docs/deep-copy.md'),
    'book-list': () => import('@/docs/book-list.md'),
    'debounce-throttle': () => import('@/docs/function-debounce-throttle.md'),
    'github-https-to-ssh': () => import('@/docs/github-https-to-ssh.md'),
    'npm-yarn': () => import('@/docs/npm-yarn.md'),
    'npm-orders': () => import('@/docs/npm-orders.md'),
    'npm-version-control': () => import('@/docs/npm-version-control.md'),
    'git-rebase': () => import('@/docs/git-rebase.md'),
    'git-common-orders': () => import('@/docs/git-common-orders.md'),
    'es-2020-operator': () => import('@/docs/es-2020-operator.md'),
    'u-dont-konw-npm': () => import('@/docs/u-dont-konw-npm.md')
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

