import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './util/filter'
import store from '@/store'
import '@/permission' //权限控制

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import './themes/common.css'
import './themes/index.css'

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
