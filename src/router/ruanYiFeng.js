const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "ruanYiFeng" */ '@/pages/bookViewList')

const ruanYiFeng = {
  path: '/ruanyifeng',
  name: "ECMAScript 6",
  component: RouterView,
  children: [
    { path: 'class', name: 'Class的基本语法', component },
    { path: 'class-extends', name: 'Class的继承', component },
    { path: 'promise', name: 'Promise', component }
  ]
}

export default ruanYiFeng