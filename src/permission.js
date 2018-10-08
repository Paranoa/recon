import Vue from 'vue'
import router from './router'
import util from '@/util'
import store from './store'

// 白名单中的路由不检验权限
const whiteList = ['/', '/login', '/resetpwd', '/mobile/', '/mobile/login']

router.beforeEach((to, from, next) => {
  let token = util.getCookie('token')

  if (whiteList.includes(to.path) || !to.matched.length) { // 白名单与不匹配任何路由规则的直接跳转
    next()
  } else {
    if (token) {
      store.dispatch('GetUserInfo', {
        token
      })
      .then(() => {
        next()  
      })
      .catch(err => {
        Vue.$ui.alert('登录超时')
        console.error(err)
        next(/mobile/.test(to.path) ? '/mobile/login' : '/login')
      })
    } else {
      next(/mobile/.test(to.path) ? '/mobile/login' : '/login')
    }
  }
})
