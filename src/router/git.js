const RouterView = () => import('components/RouterView')

const git = {
  path: '/git',
  name: 'Git相关',
  component: RouterView,
  children: [
    {
      path: 'git-config',
      name: 'git config',
      component: () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')
    },
    {
      path: 'git-order',
      name: 'git常用命令',
      component: () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')
    },
    {
      path: 'github-https-to-ssh',
      name: 'github https to ssh',
      component: () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')
    },
  ]
}

export default git