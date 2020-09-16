<template>
  <div class="markdown-body">
    <webpack-one v-if="path === 'webpack-one'" v-highlight/>
    <array v-else-if="path === 'array'" v-highlight/>
    <event-loop v-else-if="path === 'event-loop'" v-highlight/>
    <es-678 v-else-if="path === 'es-678'" v-highlight/>
    <options v-else-if="path === 'options'" v-highlight/>
    <git-config v-else-if="path === 'git-config'" v-highlight/>
    <git-order v-else-if="path === 'git-order'" v-highlight/>
    <picture-403 v-else-if="path === 'picture-403'" v-highlight/>
    <rem v-else-if="path === 'rem'" v-highlight/>
    <mac-terminal v-else-if="path === 'mac-terminal'" v-highlight/>
    <install-private-npm v-else-if="path === 'install-private-npm'" v-highlight/>
    <prototype v-else-if="path === 'prototype'" v-highlight/>
    <promise v-else-if="path === 'promise'" v-highlight/>
    <blog-entry v-else-if="path === 'blog-entry'" v-highlight/>
    <new-date v-else-if="path === 'new-date'" v-highlight/>
    <deep-copy v-else-if="path === 'deep-copy'" v-highlight/>
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
    'git-order': () => import('@/docs/git-order.md'),
    'picture-403': () => import('@/docs/picture-403.md'),
    'rem': () => import('@/docs/rem.md'),
    'mac-terminal': () => import('@/docs/mac-terminal.md'),
    'install-private-npm': () => import('@/docs/install-private-npm.md'),
    'prototype': () => import('@/docs/prototype.md'),
    'promise': () => import('@/docs/promise.md'),
    'blog-entry': () => import('@/docs/blog-entry.md'),
    'new-date': () => import('@/docs/new-date.md'),
    'deep-copy': () => import('@/docs/deep-copy.md')
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

