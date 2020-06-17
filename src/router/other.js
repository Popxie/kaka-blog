const RouterView = () => import('components/RouterView')

const other = {
    path: '/other',
    name: '日常随笔',
    component: RouterView,
    children: [
      {
        path: 'picture-403',
        name: '图片资源403',
        component: () => import(/* webpackChunkName: "other" */ '@/pages/ViewList')
      },
      {
        path: 'rem',
        name: 'PC端,移动端如何使用rem',
        component: () => import(/* webpackChunkName: "other" */ '@/pages/ViewList')
      },
      {
        path: 'mac-terminal',
        name: 'Mac Terminal命令',
        component: () => import(/* webpackChunkName: "other" */ '@/pages/ViewList')
      },
      {
        path: 'install-private-npm',
        name: '如何安装私有npm包',
        component: () => import(/* webpackChunkName: "other" */ '@/pages/ViewList')
      },
    ]
  }

export default other