import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import App from './App.vue'
import Highlight from 'vue-markdown-highlight'

import '@/assets/js/flexible.js'
// import 'lib-flexible'
// 样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/atelier-cave-light.css'
import '@/assets/style/github-markdown.css'


Vue.config.productionTip = false

Vue.use(Highlight)

if (!window.ELEMENT) Vue.use(ElementUI, {size: 'small'})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
