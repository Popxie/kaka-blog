<template>
  <div>
    <div class="markdown-body">
      <!-- git相关 -->
      <git-config v-if="path === 'git-config'" v-highlight />
      <git-order-list v-else-if="path === 'git-order-list'" v-highlight />
      <github-https-to-ssh v-else-if="path === 'github-https-to-ssh'" v-highlight />
      <git-rebase v-else-if="path === 'git-rebase'" v-highlight />
      <git-common-orders v-else-if="path === 'git-common-orders'" v-highlight />
      <!-- 日常随笔 -->
      <picture-403 v-else-if="path === 'picture-403'" v-highlight />
      <rem v-else-if="path === 'rem'" v-highlight />
      <mac-terminal v-else-if="path === 'mac-terminal'" v-highlight />
      <install-private-npm v-else-if="path === 'install-private-npm'" v-highlight />
      <!-- js -->
      <array v-else-if="path === 'array'" v-highlight />
      <event-loop v-else-if="path === 'event-loop'" v-highlight />
      <prototype v-else-if="path === 'prototype'" v-highlight />
      <es-678 v-else-if="path === 'es-678'" v-highlight />
      <es-2020-operator v-else-if="path === 'es-2020-operator'" v-highlight />
      <options v-else-if="path === 'options'" v-highlight />
      <new-date v-else-if="path === 'new-date'" v-highlight />
      <deep-copy v-else-if="path === 'deep-copy'" v-highlight />
      <debounce-throttle v-else-if="path === 'debounce-throttle'" v-highlight />
      <a-tag v-else-if="path === 'a-tag'" v-highlight />
      <module-loader-summary v-else-if="path === 'module-loader-summary'" v-highlight />
      <class-summary v-else-if="path === 'class-summary'" v-highlight />
      <!-- npm -->
      <npm-yarn v-else-if="path === 'npm-yarn'" v-highlight />
      <npm-orders v-else-if="path === 'npm-orders'" v-highlight />
      <u-dont-konw-npm v-else-if="path === 'u-dont-konw-npm'" v-highlight />
      <npm-version-control v-else-if="path === 'npm-version-control'" v-highlight />
      <!-- VUE -->
      <mixin-extend v-else-if="path === 'mixin-extend'" v-highlight />
      <!-- 工程化 -->
      <semi-automatic-deploy v-else-if="path === 'semi-automatic-deploy'" v-highlight />
      <!-- webpack -->
      <webpack-one v-else-if="path === 'webpack-one'" v-highlight />
      <!-- 博客外链收藏 -->
      <blog-list v-else-if="path === 'blog-list'" v-highlight />
      <!-- css -->
      <css-selector v-else-if="path === 'css-selector'" v-highlight />
      <flex-box v-else-if="path === 'flex-box'" v-highlight />
      <align-center v-else-if="path === 'align-center'" v-highlight />
    </div>
    <div id="gitalk-container" class="2"></div>
  </div>
</template>

<script>

export default {
  components: {
    // git相关
    'git-config': () => import('kaka/git/git-config.md'),
    'git-order-list': () => import('kaka/git/git命令大全.md'),
    'github-https-to-ssh': () => import('kaka/git/github协议变更.md'),
    'git-rebase': () => import('kaka/git/如何创建一个优美的commit记录.md'),
    'git-common-orders': () => import('kaka/git/git高频使用命令.md'),
    // 日常随笔
    'picture-403': () => import('kaka/daily-notes/picture-403.md'),
    'rem': () => import('kaka/daily-notes/PC端和Mobile端如何使用rem.md'),
    'mac-terminal': () => import('kaka/daily-notes/Mac终端常用命令.md'),
    'install-private-npm': () => import('kaka/daily-notes/如何安装私有npm包.md'),
    // js
    'array': () => import('kaka/js/数组相关.md'),
    'event-loop': () => import('kaka/js/event-loop.md'),
    'prototype': () => import('kaka/js/prototype.md'),
    'es-678': () => import('kaka/js/es678.md'),
    'es-2020-operator': () => import('kaka/js/es-2020-操作符.md'),
    'options': () => import('kaka/js/options.md'),
    'new-date': () => import('kaka/js/new-date.md'),
    'deep-copy': () => import('kaka/js/deep-copy.md'),
    'debounce-throttle': () => import('kaka/js/函数防抖和函数节流.md'),
    'a-tag': () => import('kaka/js/a标签的那些事儿.md'),
    'module-loader-summary': () => import('kaka/js/module加载实现总结.md'),
    'class-summary': () => import('kaka/js/class类总结.md'),
    // npm
    'npm-yarn': () => import('kaka/npm-yarn/npm和yarn.md'),
    'npm-orders': () => import('kaka/npm-yarn/npm相关命令.md'),
    'u-dont-konw-npm': () => import('kaka/npm-yarn/你不知道的npm.md'),
    'npm-version-control': () => import('kaka/npm-yarn/npm语义版本控制.md'),
    // VUE
    'mixin-extend': () => import('kaka/vue/mixin混入&extend的覆盖逻辑.md'),
    // webpack
    'webpack-one': () => import('kaka/webpack-one.md'),
    // 工程化 engineering 
    'semi-automatic-deploy': () => import('kaka/blogs/如何半自动化地部署到GitHubPages.md'),
    // 外链收藏
    'blog-list': () => import('kaka/collection/博客外链汇总.md'),
    // css
    'css-selector': () => import('kaka/css/css类名选择器.md'),
    'flex-box': () => import('kaka/css/弹性盒子.md'),
    'align-center': () => import('kaka/css/常见的css水平垂直居中的5种方法.md'),
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
    console.log('$root: ', this.$root)
  },
  methods: {
    routerchange(route) {
      const arr = route.path.split('/')
      this.path = arr.pop()
    },
  }
}
</script>

<style lang="scss">
  .markdown-body {
    background: #ffffff;
    margin-top: -40px;
  }
</style>

