const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "npm&yarn" */ '@/pages/ViewList')

const npmYarn = {
  path: '/npm-yarn',
  name: 'npm & yarn命令',
  component: RouterView,
  children: [
    { path: 'npm-yarn', name: 'npm & yarn', component },
    { path: 'npm-orders', name: 'npm相关命令', component },
    { path: 'npm-version-control', name: 'npm的语义版本控制', component }
  ]
}

export default npmYarn