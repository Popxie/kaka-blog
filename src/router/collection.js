const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "collection" */ '@/pages/bookViewList')

const collection = {
  path: '/collection',
  name: '外链收藏',
  component: RouterView,
  children: [
    { path: 'blog-entry', name: '博客分享入口', component },
  ]
}

export default collection