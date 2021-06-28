const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')

const javaScript = {
  path: '/java-script',
  name: 'JavaScript',
  component: RouterView,
  children: [
    { path: 'array', name: '数组相关', component },
    { path: 'event-loop', name: '事件循环', component },
    { path: 'prototype', name: '原型继承', component },
    { path: 'es-678', name: 'ES6/7/8', component },
    { path: 'es-2020-operator', name: 'ES2020操作符', component },
    { path: 'options', name: 'options请求', component },
    { path: 'new-date', name: 'new Date()', component },
    { path: 'deep-copy', name: '深拷贝那些事儿', component },
    { path: 'debounce-throttle', name: '函数节流&防抖', component },
    { path: 'a-tag', name: 'a标签的那些事儿', component },
    { path: 'module-loader-summary', name: 'ES6 Module总结', component },
    { path: 'class-summary', name: 'ES6 Class总结', component },
    { path: 'blob-download', name: '文件流下载文件', component },
  ]
}

export default javaScript