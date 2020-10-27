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
    { path: 'deep-copy', name: 'deep copy', component },
    { path: 'debounce-throttle', name: '函数节流&防抖', component },
  ]
}

export default javaScript