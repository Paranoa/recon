import Vue from 'vue'
import ui from './ui'

Vue.use({
  install: function (vue) {
    vue.prototype.$ui = ui
    vue.$ui = ui
  }
})
