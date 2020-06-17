const RouterView = () => import('components/RouterView')

const css = {
  path: '/css',
  name: 'CSS相关',
  component: RouterView,
  children: [
    {
      path: 'css-1',
      name: '待定',
      component: () => import(/* webpackChunkName: "css" */ '@/pages/ViewList')
    },
  ]
}

export default css