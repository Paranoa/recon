import router from './router'
import util from '@/util'
import store from './store'

// 白名单中的路由不检验权限
const whiteList = ['/', '/login']

router.beforeEach((to, from, next) => {
  let token = util.getCookie('token')

  if (whiteList.includes(to.path)) {
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
        alert('登录超时')
        console.error(err)
        next('/login')
      })
    } else {
      next('/login')
    }
  }
})
