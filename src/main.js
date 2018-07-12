import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './util/filter'
import axios from 'axios'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

// 注册全局过滤器
for (let name in filters) {
  Vue.filter(name, filters[name])
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
