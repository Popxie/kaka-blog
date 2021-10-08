const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "css" */ '@/pages/ViewList')

const css = {
  path: '/css',
  name: 'CSS相关',
  component: RouterView,
  children: [
    // { path: 'css-1', name: '待定', component },
    { path: 'css-selector', name: 'css选择器', component },
    { path: 'flex-box', name: '弹性盒子布局', component },
    { path: 'align-center', name: '垂直水平居中有哪些方法', component },
    { path: 'dom-tag', name: '彻底理解行内元素和块级元素', component },
  ]
}

export default css