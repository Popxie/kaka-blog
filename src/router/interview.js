/*
 * @Description: 面试
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/router/interview.js
 * @Date: 2021-10-13 16:15:35
 * @LastEditTime: 2021-10-13 16:16:44
 */
const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "interview" */ '@/pages/ViewList')

const javaScript = {
  path: '/interview',
  name: '面试题库',
  component: RouterView,
  children: [
    { path: 'interview-summary', name: '汇总集合', component },
  ]
}

export default javaScript