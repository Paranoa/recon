export default [
  {
    path: '/login',
    alias: '/',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'index',
        alias: '/',
        component: () => import('@/views/HomeIndex/HomeIndex.vue'),
        name: 'homeIndex'
      },
      {
        path: 'openAccount',
        component: () => import('@/views/OpenAccount/OpenAccount.vue'),
        name: 'openAccount'
      },
      {
        path: 'order',
        component: () => import('@/views/Order/Order.vue'),
        name: 'order'
      },
      {
        path: 'cardOrder',
        component: () => import('@/views/CardOrder/CardOrder.vue'),
        name: 'cardOrder'
      },
      {
        path: 'ddgOrder',
        component: () => import('@/views/DdgOrder/DdgOrder.vue'),
        name: 'ddgOrder'
      },
      {
        path: 'tkorder',
        component: () => import('@/views/TkOrder/TkOrder.vue'),
        name: 'tkorder'
      },
      {
        path: 'resetpwd',
        component: () => import('@/views/Resetpwd/Resetpwd.vue'),
        name: 'resetpwd'
      },
    ]
  }
]