const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "css" */ '@/pages/ViewList')

const css = {
  path: '/css',
  name: 'CSS相关',
  component: RouterView,
  children: [
    { path: 'css-1', name: '待定', component },
  ]
}

export default css