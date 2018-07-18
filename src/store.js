import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading: false
  },
  mutations: {
    showLoadMask (state) {
      state.showLoading = true
    },
    hideLoadMask (state) {
      state.showLoading = false
    }
  }
})
