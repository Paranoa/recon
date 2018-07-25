import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
const HomeIndex = () => import('@/views/HomeIndex/HomeIndex.vue')
const OpenAccount = () => import('@/views/OpenAccount/OpenAccount.vue')
const Order = () => import('@/views/Order/Order.vue')
const CardOrder = () => import('@/views/CardOrder/CardOrder.vue')
const TkOrder = () => import('@/views/TkOrder/TkOrder.vue')
const Resetpwd = () => import('@/views/Resetpwd/Resetpwd.vue')
const DdgOrder = () => import('@/views/DdgOrder/DdgOrder.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_NAME,
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
