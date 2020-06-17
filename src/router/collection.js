const RouterView = () => import('components/RouterView')

const collection = {
  path: '/collection',
  name: '外链收藏',
  component: RouterView,
  children: [
    {
      path: 'blog-entry',
      name: '博客分享入口',
      component: () => import(/* webpackChunkName: "collection" */ '@/pages/ViewList')
    },
  ]
}

export default collection