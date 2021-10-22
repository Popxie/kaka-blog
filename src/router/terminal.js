/*
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/router/terminal.js
 * @Date: 2021-10-18 17:48:48
 * @LastEditTime: 2021-10-22 17:55:00
 */

const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "terminal" */ '@/pages/ViewList')

const javaScript = {
  path: '/terminal',
  name: 'Terminal相关',
  component: RouterView,
  children: [
    { path: 'shell-bash-zsh', name: '带你了解shell、bash、zsh', component },
    { path: 'bash-zsh', name: 'bash&zsh的四种运行模式', component },
  ]
}

export default javaScript