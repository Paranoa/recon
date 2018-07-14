import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import HomeIndex from '@/views/HomeIndex/HomeIndex.vue'
import OpenAccount from '@/views/OpenAccount/OpenAccount.vue'
import Order from '@/views/Order/Order.vue'
import CardOrder from '@/views/CardOrder/CardOrder.vue'
import DdgOrder from '@/views/DdgOrder/DdgOrder.vue'
import TkOrder from '@/views/TkOrder/TkOrder.vue'
import Resetpwd from '@/views/Resetpwd/Resetpwd.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          alias: '/',
          component: HomeIndex,
          name: 'homeIndex'
        },
        {
          path: 'openAccount',
          component: OpenAccount,
          name: 'openAccount'
        },
        {
          path: 'order',
          component: Order,
          name: 'order'
        },
        {
          path: 'cardOrder',
          component: CardOrder,
          name: 'cardOrder'
        },
        {
          path: 'ddgOrder',
          component: DdgOrder,
          name: 'ddgOrder'
        },
        {
          path: 'tkorder',
          component: TkOrder,
          name: 'tkorder'
        },
        {
          path: 'resetpwd',
          component: Resetpwd,
          name: 'resetpwd'
        }
      ]
    }
  ]
})
