const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "engineering" */ '@/pages/ViewList')

const engineering = {
  path: '/engineering',
  name: '前端工程化',
  component: RouterView,
  children: [
    { path: 'book-list', name: '文章列表', component }
  ]
}

export default engineering