const env = process.env

const baseUrl = env.VUE_APP_BASE_URL
const ddgApplyUrl = env.VUE_APP_DDG_APPLY
const apiUrl = {
  queryOrder: env.VUE_APP_URL_QUERYORDER,
  login: env.VUE_APP_URL_LOGIN,
  logout: env.VUE_APP_URL_LOGOUT,
  checkLogin: env.VUE_APP_URL_GET_USER_INFO,
  resetPwd: env.VUE_APP_URL_RESET_PWD,
  sendSmsCode: env.VUE_APP_URL_SEND_SMS_CODE,
  checkSmsCodeByAccount: env.VUE_APP_URL_CHECK_SMS_CODE_BY_ACCOUNT,
  resetPasswordBySmsCode: env.VUE_APP_URL_RESET_PASSWORD_BY_SMS_CODE,
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
  findRefundByExtId: env.VUE_APP_URL_FIND_REFUND_BY_EXT_ID,
  cancelRefund: env.VUE_APP_URL_CANCEL_REFUND,
  cancelRefundByExtId: env.VUE_APP_URL_CANCEL_REFUND_BY_EXT_ID,
  checkRefundLimit: env.VUE_APP_URL_CHECK_REFUND_LIMIT,
  getStoreCodes:env.VUE_APP_URL_GET_STORE_CODES,
  calculateRefund:env.VUE_APP_URL_CALCULATE_REFUND,
  bookRefund:env.VUE_APP_URL_BOOK_REFUND,
  getOrderInfo:env.VUE_APP_URL_GET_ORDER_INFO,
  orderFileUpload:env.VUE_APP_URL_ORDER_FILE_UPLOAD,
  myApplyLoanType1:env.VUE_APP_URL_ORDER_MY_APPLY_LOAN_1,
  sendFile: env.VUE_APP_URL_ORDER_SEND_FILE,
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
  ddgDoOut: env.VUE_APP_URL_DDG_DO_OUT,
  ddgExportPaymentPlan: env.VUE_APP_URL_DDG_EXPORT_PAYMENT_PLAN,
  ddgExportBillingInfo: env.VUE_APP_URL_DDG_EXPORT_BILLING_INFO,
  ddgExportBillingDetail: env.VUE_APP_URL_DDG_EXPORT_BILLING_DETAIL,
}

for (var key in apiUrl) {
  apiUrl[key] = baseUrl + apiUrl[key]
}

export { apiUrl, baseUrl, ddgApplyUrl}