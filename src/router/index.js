import Vue from 'vue'
import Router from 'vue-router'

import pcRoutes from './pc'
import mobileRoutes from './mobile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_NAME,
  routes: [
    ...pcRoutes,
    ...mobileRoutes
  ]
})
