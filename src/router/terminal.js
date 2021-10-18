/*
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/router/terminal.js
 * @Date: 2021-10-18 17:48:48
 * @LastEditTime: 2021-10-18 17:50:07
 */

const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "terminal" */ '@/pages/ViewList')

const javaScript = {
  path: '/terminal',
  name: 'Terminal相关',
  component: RouterView,
  children: [
    { path: 'shell-bash-zsh', name: '带你了解shell、bash、zsh', component },
  ]
}

export default javaScript