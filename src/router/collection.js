const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "collection" */ '@/pages/ViewList')

const engineering = {
  path: '/collection',
  name: '博客外链收藏',
  component: RouterView,
  children: [
    { path: 'blog-list', name: '博客外链汇总', component },
  ]
}

export default engineering