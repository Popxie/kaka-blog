const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "vue" */ '@/pages/ViewList')

const other = {
    path: '/vue',
    name: 'VUE相关',
    component: RouterView,
    children: [
      { path: 'mixin-extend', name: 'mixin混入&extend的覆盖逻辑', component },
    ]
  }

export default other