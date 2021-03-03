import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import animated from 'animate.css'
Vue.use(animated)

import toast from './components/common/toast/index.js'
Vue.use(toast)

Vue.config.productionTip = false

//创建一个$bus充当事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
