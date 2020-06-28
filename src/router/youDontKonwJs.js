const RouterView = () => import('components/RouterView')

const thisObjModule = [
  {
    path: 'ch1',
    name: 'this 是什么',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'ch2',
    name: 'this 豁然开朗',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'ch3',
    name: '对象',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'ch4',
    name: '混合（淆）“类”的对象',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'ch5',
    name: '原型（Prototype）',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'ch6',
    name: '行为委托',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
]

const typesAndGrammar = [
  {
    path: 'types-grammar-ch1',
    name: '类型',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'types-grammar-ch2',
    name: '值',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'types-grammar-ch3',
    name: '原生类型',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'types-grammar-ch4',
    name: '强制转换',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
  {
    path: 'types-grammar-ch5',
    name: '语法',
    component: () => import(/* webpackChunkName: "this & object" */ '@/pages/bookViewList')
  },
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