import api from '@/api'

export default {
  state: {
    belowStores: [],
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
    SET_BELOW_STORES (state, res) {
      state.belowStores = res
    },
    SET_USERINFOS (state, res) {
      state.cName = res.cname
      state.fundBank = res.fund_bank
      state.isShop = res.is_shop
      state.merchantCode = res.merchant_code
      state.merchantInuse = res.merchant_inuse
      state.role = res.role
      state.storeCode = res.store_code
      state.token = res.token
      state.userName = res.username
    }
  },
  actions: {
    async Login ({ commit }, { username, password, vercode, remb }) {
      var res = await api.login({
        username,
        password,
        vercode,
        remb,
      })
      commit('SET_USERINFOS', res)
      return res
    },
    async GetUserInfo ({ dispatch, commit }, { token }) {
      // 门店信息也视为用户信息的一部分
      await dispatch('GetStoreCodes')
      commit('SET_USERINFOS', await api.getUserInfo({ token }))
    },
    async GetStoreCodes ({ commit }) {
      commit('SET_BELOW_STORES', await api.getStoreCodes())
    }
  }
}