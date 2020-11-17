const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "ruanYiFeng" */ '@/pages/bookViewList')

const ruanYiFeng = {
  path: '/ruanyifeng',
  name: "ECMAScript 6",
  component: RouterView,
  children: [
    { path: 'destructuring', name: '变量的结构赋值', component },
    { path: 'class', name: 'Class的基本语法', component },
    { path: 'class-extends', name: 'Class的继承', component },
    { path: 'promise', name: 'Promise', component },
    { path: 'regex', name: '正则的扩展', component },
    { path: 'object', name: '对象的扩展', component },
    { path: 'object-methods', name: '对象的新增方法', component },
  ]
}

export default ruanYiFeng