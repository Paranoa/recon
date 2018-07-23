const env = process.env
const baseUrl = env.VUE_APP_BASE_URL

const apiUrl = {
  queryOrder: env.VUE_APP_URL_QUERYORDER,
  login: env.VUE_APP_URL_LOGIN,
  checkLogin: env.VUE_APP_URL_GET_USER_INFO,
  resetPwd: env.VUE_APP_URL_RESET_PWD,
  getCode:env.VUE_APP_URL_GET_CODE,
  homeInfo: env.VUE_APP_URL_HOME_INFO,
  storeFundList: env.VUE_APP_URL_STORE_FUND_LIST,
  storeOpenAccount: env.VUE_APP_URL_STORE_OPEN_ACCOUNT,
  storeDeposit: env.VUE_APP_URL_STORE_DEPOSIT,
  storeUnlock: env.VUE_APP_URL_STORE_UNLOCK,
  storeResetPwd: env.VUE_APP_URL_STORE_RESET_PWD,
  billingDetail: env.VUE_APP_URL_BILLING_DETAIL,
  storeDepositStatus: env.VUE_APP_URL_STORE_DEPOSIT_STATUS,
  cardOrderList: env.VUE_APP_URL_CARD_ORDER_LIST,
  exportExcel: env.VUE_APP_URL_EXPORT_EXL,
  cancelRefund: env.VUE_APP_URL_CANCEL_REFUND,
  checkRefundLimit: env.VUE_APP_URL_CHECK_REFUND_LIMIT,
  getStoreCodes:env.VUE_APP_URL_GET_STORE_CODES,
  calculateRefund:env.VUE_APP_URL_CALCULATE_REFUND,
  bookRefund:env.VUE_APP_URL_BOOK_REFUND,
  getOrderInfo:env.VUE_APP_URL_GET_ORDER_INFO,
  orderFileUpload:env.VUE_APP_URL_ORDER_FILE_UPLOAD,
  myApplyLoanType1:env.VUE_APP_URL_ORDER_MY_APPLY_LOAN_1,
  doOut:env.VUE_APP_URL_ORDER_DO_OUT,
  tkOrderList: env.VUE_APP_URL_TK_ORDER_LIST,
  tkAudit: env.VUE_APP_URL_TK_AUDIT,
  ddgOrderList: env.VUE_APP_URL_DDG_ORDER_LIST,
  ddgCpxy: env.VUE_APP_URL_DDG_CPXY,
  ddgSubmit: env.VUE_APP_URL_DDG_SUBMIT,
  ddgRefuse: env.VUE_APP_URL_DDG_REFUSE,
  ddgBillingInfo: env.VUE_APP_URL_DDG_BILLING_INFO,
  ddgBillingDetail: env.VUE_APP_URL_DDG_BILLING_DETAIL,
  ddgPaymentPlan: env.VUE_APP_URL_DDG_PAYMENT_PLAN,
}

for (var key in apiUrl) {
  apiUrl[key] = baseUrl + apiUrl[key]
}

export { apiUrl }