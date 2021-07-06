const RouterView = () => import('components/RouterView')

const component = () => import(/* webpackChunkName: "qingfeng" */ '@/pages/bookViewList')

const deepChildren = [
  { path: 'deep-01', name: '01原型到原型链', component },
  { path: 'deep-02', name: '02词法作用域和动态作用域', component },
  { path: 'deep-03', name: '03执行上下文栈', component },
  { path: 'deep-04', name: '04变量对象', component },
  { path: 'deep-05', name: '05作用域链', component },
  { path: 'deep-06', name: '06从 ECMAScript 规范解读 this', component },
  { path: 'deep-07', name: '07执行上下文', component },
  { path: 'deep-08', name: '08闭包', component },
  { path: 'deep-09', name: '09参数按值传递', component },
  { path: 'deep-10', name: '10call和apply的模拟实现', component },
  { path: 'deep-11', name: '11bind模拟实现', component },
  { path: 'deep-12', name: '12new的模拟实现', component },
  { path: 'deep-13', name: '13类数组对象与 arguments', component },
  { path: 'deep-14', name: '14创建对象的多种方式以及优缺点', component },
  { path: 'deep-15', name: '15继承的多种方式和优缺点', component }
]
const ruanYiFeng = {
  path: '/qingfeng',
  name: "QingFeng’s blog",
  component: RouterView,
  children: [
    {
      path: 'deep',
      name: '深入系列',
      component: RouterView,
      children: deepChildren
    },
    {
      path: 'subject',
      name: '专题系列',
      component: RouterView,
      children: []
    },
  ]
}

export default ruanYiFeng