const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')

const git = {
  path: '/git',
  name: 'Git相关',
  component: RouterView,
  children: [
    { path: 'git-config', name: 'git config', component },
    { path: 'git-order-list', name: 'git命令大全', component },
    { path: 'git-common-orders', name: 'git高频使用命令', component },
    { path: 'github-https-to-ssh', name: 'github https to ssh', component },
    { path: 'git-rebase', name: 'git rebase', component },
    { path: 'git-obj', name: 'Git内部原理之Git对象', component },
    { path: 'git-obj-hash', name: 'Git内部原理之Git对象hash', component },
    { path: 'git-obj-save', name: 'Git内部原理之Git对象存储', component },
    { path: 'git-obj-reference', name: 'Git内部原理之Git对象引用', component },
  ]
}

export default git