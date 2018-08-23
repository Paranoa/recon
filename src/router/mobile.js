export default [
  {
    path: '/mobile/login',
    alias: '/mobile/',
    name: 'mobileLogin',
    component: () => import('@/viewsMobile/Login.vue')
  },
  {
    path: '/mobile/ddgOrder',
    alias: '/mobile/home',
    name: 'mobileDdgOrder',
    component: () => import('@/viewsMobile/DdgOrder/DdgOrder.vue')
  }
]