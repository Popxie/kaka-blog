const RouterView = () => import('components/RouterView')

const git = {
  path: '/git',
  name: 'Git相关',
  component: RouterView,
  children: [
    {
      path: 'git-config',
      name: 'Git Config',
      component: () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')
    },
    {
      path: 'git-order',
      name: 'Git常用命令',
      component: () => import(/* webpackChunkName: "git" */ '@/pages/ViewList')
    },
  ]
}

export default git