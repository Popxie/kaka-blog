const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "you dont know js" */ '@/pages/bookViewList')

const thisObjModule = [
  { path: 'ch1', name: 'this 是什么', component },
  { path: 'ch2', name: 'this 豁然开朗', component },
  { path: 'ch3', name: '对象', component },
  { path: 'ch4', name: '混合（淆）“类”的对象', component },
  { path: 'ch5', name: '原型（Prototype）', component },
  { path: 'ch6', name: '行为委托', component },
]

const typesAndGrammar = [
  { path: 'types-grammar-ch1', name: '类型', component },
  { path: 'types-grammar-ch2', name: '值', component },
  { path: 'types-grammar-ch3', name: '原生类型', component },
  { path: 'types-grammar-ch4', name: '强制转换', component },
  { path: 'types-grammar-ch5', name: '语法', component },
]

const youDontKonwJs = {
  path: '/book',
  name: "You Don't Konw Js",
  component: RouterView,
  children: [
    {
      path: 'this-obj-prototype',
      name: 'this & 对象原型',
      component: RouterView,
      children: thisObjModule
    },
    {
      path: 'types-grammar',
      name: '类型 & 语法',
      component: RouterView,
      children: typesAndGrammar
    },
  ]
}

export default youDontKonwJs