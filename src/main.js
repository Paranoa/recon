import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './util/filter'
import axios from 'axios'
import store from '@/store'
import loading from '@/components/VLoadMask.vue'

import '@/permission' //权限控制

axios.defaults.withCredentials = true
Vue.config.productionTip = false

// 注册全局过滤器
for (let name in filters) {
  Vue.filter(name, filters[name])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
