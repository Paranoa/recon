const env = process.env
const baseUrl = env.VUE_APP_BASE_URL

const apiUrl = {
  queryOrder: env.VUE_APP_URL_QUERYORDER,
  login: env.VUE_APP_URL_LOGIN,
  storeFundList: env.VUE_APP_URL_STORE_FUND_LIST,
}

for (var key in apiUrl) {
  apiUrl[key] = baseUrl + apiUrl[key]
}

export { apiUrl }