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
      if (res) {
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
    RESET_USERINFOS (state) {
      state.cName = ''
      state.fundBank = ''
      state.isShop = false
      state.merchantCode = ''
      state.merchantInuse = false
      state.role = ''
      state.storeCode = ''
      state.token = ''
      state.userName = ''

      state.belowStores = []
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
      commit('SET_USERINFOS')
      return res
    },
    async Logout ({ commit }) {
      commit('RESET_USERINFOS', await api.logout())
    },
    async GetUserInfo ({ dispatch, commit }, { token }) {
      commit('RESET_USERINFOS')
      commit('SET_USERINFOS', await api.getUserInfo({ token }))
      // 门店信息也视为用户信息的一部分
      await dispatch('GetStoreCodes')
    },
    async GetStoreCodes ({ state, commit }) {
      // 如果是门店则没有下属门店
      if (!state.isShop) {
        commit('SET_BELOW_STORES', await api.getStoreCodes())
      }
    }
  }
}