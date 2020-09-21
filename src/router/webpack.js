const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "webpack" */ '@/pages/ViewList')

const webpack = {
  path: '/webpack',
  name: 'Webpack相关',
  component: RouterView,
  children: [
    { path: 'webpack-one', name: 'webpack', component }
  ]
}

export default webpack