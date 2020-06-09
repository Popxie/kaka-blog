/*
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-05 16:34:53
 * @LastEditTime: 2020-06-09 17:35:00
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
        name: 'webpack1',
        component: () => import(/* webpackChunkName: "webpack" */ '@/pages/Webpack')
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
        component: () => import(/* webpackChunkName: "book" */ '@/pages/BookList')
      }
    ]
  }
]

const router = new VueRouter({ routes })
export default router
