const appName = process.env.VUE_APP_NAME
const baseURL = process.env.VUE_APP_BASE_URL
const env = process.env.NODE_ENV

const apiUrl = {
  cbUrl: location.origin + '/' + appName,
  ddgCPXY: {
    development: 'https://beta.geexfinance.com/geexweixinb/views/app/mediate_service_ddg.html',
    production: 'https://beta.geexfinance.com/geexweixinb/views/app/mediate_service_ddg.html'
  }[env],
  queryOrder: 'order/getOrderList',
  login: 'user/login',
  logout: 'user/logout',
  checkLogin: 'user/getUserInfo',
  resetPwd: 'user/resetpwd',
  sendSmsCode: 'user/sendSmsCode',
  checkSmsCodeByAccount: 'user/checkSmsCodeByAccount',
  resetPasswordBySmsCode: 'user/resetPasswordBySmsCode',
  getCode:'user/getCode',
  homeInfo: 'home/getHomeInfo',
  storeFundList: 'account/storeFundList',
  storeOpenAccount: 'account/storeOpenAccount',
  storeDeposit: 'account/storeDeposit',
  storeUnlock: 'account/storeUnLock',
  storeResetPwd: 'account/storeResetPwd',
  billingDetail: 'ddg/billingDetail',
  storeDepositStatus: 'account/findStoreDepositStatus',
  cardOrderList: 'cardOrder/cardOrderInfoList',
  exportExcel: 'cardOrder/exportExcel',
  findRefundByExtId: 'order/findRefundByExtId',
  cancelRefund: 'cardOrder/cancelRefund',
  cancelRefundByExtId: 'order/cancelRefundByExtId',
  checkRefundLimit: 'cardOrder/checkRefundLimit',
  getStoreCodes:'order/getStores',
  calculateRefund:'order/calculateRefund',
  bookRefund:'order/bookRefund',
  getOrderInfo:'order/getOrderInfo',
  myApplyLoanType1:'order/myApplyLoanType1',
  sendFile: 'order/sendFile',
  doOut: 'order/out',
  tkOrderList: 'tkorder/getTkOrderList',
  tkAudit: 'tkorder/tkaudit',
  ddgOrderList: 'ddg/getOrderList',
  ddgCpxy: 'ddg/chanPinXieYiDDG',
  ddgSubmit: 'ddg/submitDDG',
  ddgRefuse: 'ddg/refuseDDG',
  ddgBillingInfo: 'ddg/billingInfo',
  ddgBillingDetail: 'ddg/billingDetail',
  ddgPaymentPlan: 'ddg/paymentPlan',
  ddgDoOut: 'ddg/out',
  ddgExportPaymentPlan: 'ddg/paymentPlan/export',
  ddgExportBillingInfo: 'ddg/billingInfo/export',
  ddgExportBillingDetail: 'ddg/billingDetail/export',
  noCardTurnSingleAcross: 'order/noCardTurnSingleAcross'
}

export { apiUrl, baseURL }