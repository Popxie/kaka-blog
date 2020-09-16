const RouterView = () => import('components/RouterView')

const javaScript = {
  path: '/java-script',
  name: 'JavaScript',
  component: RouterView,
  children: [
    {
      path: 'array',
      name: '数组去重',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'event-loop',
      name: '事件循环',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'prototype',
      name: '原型继承',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'es-678',
      name: 'ES6/7/8',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'options',
      name: 'options请求',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'promise',
      name: 'Promise',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'new-date',
      name: 'new Date()',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'deep-copy',
      name: 'deep copy',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
    {
      path: 'debounce-throttle',
      name: '函数节流&防抖',
      component: () => import(/* webpackChunkName: "javascript" */ '@/pages/ViewList')
    },
  ]
}

export default javaScript