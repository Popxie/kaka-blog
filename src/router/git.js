const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')

const git = {
  path: '/git',
  name: 'Git相关',
  component: RouterView,
  children: [
    { path: 'git-config', name: 'git config', component },
    { path: 'git-order', name: 'git常用命令', component },
    { path: 'github-https-to-ssh', name: 'github https to ssh', component },
  ]
}

export default git