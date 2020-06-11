import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import App from './App.vue'
Vue.config.productionTip = false
import Highlight from 'vue-markdown-highlight'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Highlight)

if (!window.ELEMENT) Vue.use(ElementUI, {size: 'small'})
console.log('window:', window)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
