import api from '@/api'

export default {
  state: {
    cName: '',
    fundBank: '',
    isShop: false,
    merchantCode: '',
    merchantInuse: false,
    role: '',
    storeCode: '',
    token: '',
    userName: '',
  },
  mutations: {
    SET_CNAME (state, name) {
      state.cName = name
    },
    SET_FUND_BANK (state, name) {
      state.fundBank = name
    },
    SET_IS_SHOP (state, flag) {
      state.isShop = flag
    },
    SET_MERCHANT_CODE (state, code) {
      state.merchantCode = code
    },
    SET_MERCHANT_INUSE (state, flag) {
      state.merchantInuse = flag
    },
    SET_ROLE (state, role) {
      state.role = role
    },
    SET_STORE_CODE (state, code) {
      state.storeCode = code
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER_NAME (state, name) {
      state.userName = name
    }
  },
  actions: {
    Login ({ commit }, { username, password, vercode, remb }) {
      return new Promise((resolve, reject) => {
        api.login({
          username,
          password,
          vercode,
          remb,
        })
        .then(res => {
          commit('SET_CNAME', res.cname)
          commit('SET_FUND_BANK', res.fund_bank)
          commit('SET_IS_SHOP', res.is_shop)
          commit('SET_MERCHANT_CODE', res.merchant_code)
          commit('SET_MERCHANT_INUSE', res.merchant_inuse)
          commit('SET_ROLE', res.role)
          commit('SET_STORE_CODE', res.store_code)
          commit('SET_TOKEN', res.token)
          commit('SET_USER_NAME', res.username)

          resolve(res)
        })
        .catch(err => reject(err))
      })
    },
    GetUserInfo ({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        api.getUserInfo({
          token
        })
        .then(res => {
          commit('SET_CNAME', res.cname)
          commit('SET_FUND_BANK', res.fund_bank)
          commit('SET_IS_SHOP', res.is_shop)
          commit('SET_MERCHANT_CODE', res.merchant_code)
          commit('SET_MERCHANT_INUSE', res.merchant_inuse)
          commit('SET_ROLE', res.role)
          commit('SET_STORE_CODE', res.store_code)
          commit('SET_TOKEN', res.token)
          commit('SET_USER_NAME', res.username)

          resolve(res)
        })
        .catch(err => reject(err))
      })
    }
  }
}