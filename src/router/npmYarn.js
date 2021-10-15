const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "npm&yarn" */ '@/pages/ViewList')

const npmYarn = {
  path: '/npm-yarn',
  name: 'npm & yarn命令',
  component: RouterView,
  children: [
    { path: 'npm-yarn', name: 'npm & yarn', component },
    { path: 'npm-orders', name: 'npm相关命令', component },
    { path: 'u-dont-know-npm', name: '你不知道的npm', component },
    { path: 'npm-version-control', name: 'npm的语义版本控制', component },
    { path: 'npm-script', name: '运行多个 npm script 的各种姿势', component },
    { path: 'npm-script-params', name: '给npm script 传递参数和添加注释', component },
  ]
}

export default npmYarn