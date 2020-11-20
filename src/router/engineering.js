/*
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/router/engineering.js
 * @Date: 2020-11-28 16:11:44
 */
const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "engineering" */ '@/pages/ViewList')

const engineering = {
  path: '/engineering',
  name: '前端工程化',
  component: RouterView,
  children: [
    { path: 'semi-automatic-deploy', name: '如何半自动化地部署到GitHub Pages', component },
  ]
}

export default engineering