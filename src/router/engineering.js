const RouterView = () => import('components/RouterView')

const engineering = {
  path: '/engineering',
  name: '前端工程化',
  component: RouterView,
  children: [
    {
      path: 'book-list',
      name: '文章列表',
      component: () => import(/* webpackChunkName: "engineering" */ '@/pages/ViewList')
    }
  ]
}

export default engineering