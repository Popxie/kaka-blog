/*
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-05 16:34:53
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
const RouterView = () => import('components/RouterView')

/**
 * 通过cdn的形式注入 VueRouter Vuex  Vue 都会挂载到window下面，反之没有
 */
if (!window.VueRouter) Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home')
  },
  {
    path: '/webpack',
    name: 'Webpack相关',
    component: RouterView,
    children: [
      {
        path: 'webpack-one',
        name: 'webpack',
        component: () => import(/* webpackChunkName: "book" */ '@/pages/ViewList')
      }
    ]
  },
  {
    path: '/engineering',
    name: '前端工程化',
    component: RouterView,
    children: [
      {
        path: 'book-list',
        name: '文章列表',
        component: () => import(/* webpackChunkName: "book" */ '@/pages/ViewList')
      }
    ]
  },
  {
    path: '/java-script',
    name: 'JavaScript',
    component: RouterView,
    children: [
      {
        path: 'array',
        name: '数组去重',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'event-loop',
        name: '事件循环',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'es-678',
        name: 'ES6/7/8',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'options',
        name: 'OPTIONS请求',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
    ]
  },
  {
    path: '/css',
    name: 'CSS相关',
    component: RouterView,
    children: [
      {
        path: 'css-1',
        name: '待定',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
    ]
  },
  {
    path: '/git',
    name: 'Git相关',
    component: RouterView,
    children: [
      {
        path: 'git-config',
        name: 'Git Config',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'git-order',
        name: 'Git常用命令',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
    ]
  },
  {
    path: '/other',
    name: '日常随笔',
    component: RouterView,
    children: [
      {
        path: 'picture-403',
        name: '图片资源403',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'rem',
        name: 'PC端,移动端如何使用rem',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'mac-terminal',
        name: 'Mac Terminal命令',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
      {
        path: 'install-private-npm',
        name: '如何安装私有npm包',
        component: () => import(/* webpackChunkName: "view" */ '@/pages/ViewList')
      },
    ]
  },
]

const router = new VueRouter({ routes })
export default router
