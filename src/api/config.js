const env = process.env
const baseUrl = env.VUE_APP_BASE_URL

const apiUrl = {
  queryOrder: env.VUE_APP_URL_QUERYORDER,
  login: env.VUE_APP_URL_LOGIN,
  storeFundList: env.VUE_APP_URL_STORE_FUND_LIST,
  storeDeposit: env.VUE_APP_URL_STORE_DEPOSIT,
  billingDetail: env.VUE_APP_URL_BILLING_DETAIL,
  storeDepositStatus: env.VUE_APP_URL_STORE_DEPOSIT_STATUS,
}

for (var key in apiUrl) {
  apiUrl[key] = baseUrl + apiUrl[key]
}

export { apiUrl }