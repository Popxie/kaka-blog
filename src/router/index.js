/*
 * @Description: 
 * @Author: xiehuaqiang
 * @Date: 2020-06-05 16:34:53
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'

import webpack from './webpack'
import engineering from './engineering'
import javaScript from './javaScript'
import git from './git'
import other from './other'
import collection from './collection'
import css from './css'
import youDontKonwJs from './youDontKonwJs'
import ruanYiFeng from './ruanYiFeng'

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
  youDontKonwJs,
  ruanYiFeng,
  webpack,
  engineering,
  javaScript,
  git,
  other,
  collection,
  css,
]

const router = new VueRouter({ routes })
export default router
