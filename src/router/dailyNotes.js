const RouterView = () => import('components/RouterView')
const component = () => import(/* webpackChunkName: "other" */ '@/pages/ViewList')

const other = {
    path: '/daily-notes',
    name: '日常随笔',
    component: RouterView,
    children: [
      { path: 'picture-403', name: '图片资源403', component },
      { path: 'rem', name: 'PC端,移动端如何使用rem', component },
      { path: 'mac-terminal', name: 'Mac Terminal 常用命令', component },
      { path: 'install-private-npm', name: '如何安装私有npm包', component },
    ]
  }

export default other