const RouterView = () => import('components/RouterView')

const webpack = {
  path: '/webpack',
  name: 'Webpack相关',
  component: RouterView,
  children: [
    {
      path: 'webpack-one',
      name: 'webpack',
      component: () => import(/* webpackChunkName: "webpack" */ '@/pages/ViewList')
    }
  ]
}



export default webpack