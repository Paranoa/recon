import { apiUrl } from '@/api/config'
import axios from 'axios'
import util from '@/util/util'
import loading from '@/util/loading'

export default {
  test,
  login,
  resetPwd,
  homeInfo,
  storeFundList,
  storeOpenAccount,
  storeUnlock,
  storeResetPwd,
  get,
  post,
  queryOrder,
  storeDeposit,
  storeDepositStatus,
  billingDetail,
  cardOrderList,
  exportExcel,
  cancelRefund,
  checkRefundLimit,
  getStoreCodes,
  calculateRefund,
  getOrderInfo,
  myApplyLoanType1,
  doOut,
  tkOrderList,
  tkAudit
}

function login (data) {
  return post(apiUrl.login, data)
}

function resetPwd (data) {
  return post(apiUrl.resetPwd, data)
}

function homeInfo (data) {
  return post(apiUrl.homeInfo, data)
}

function storeFundList (data) {
  return get(apiUrl.storeFundList, data)
}

function storeOpenAccount (data) {
  return post(apiUrl.storeOpenAccount, data)
}

function storeDeposit (data) {
  return post(apiUrl.storeDeposit, data)
}

function storeUnlock (data) {
  return post(apiUrl.storeUnlock, data)
}

function storeResetPwd (data) {
  return post(apiUrl.storeResetPwd, data)
}

function storeDepositStatus (data) {
  return post(apiUrl.storeDepositStatus, data)
} 

function billingDetail (data) {
  return post(apiUrl.billingDetail, data)
}

function test () {
  return get('../mock/test.json')
}

function queryOrder (data) {
  return post(apiUrl.queryOrder, data)
}

function calculateRefund(data){
  return post(apiUrl.calculateRefund,data)
}

function getStoreCodes(){
  return post(apiUrl.getStoreCodes)
}

function cardOrderList (data) {
  return get(apiUrl.cardOrderList, data)
}

function exportExcel (data) {
  return axios
    .get(apiUrl.exportExcel, { params: data,  responseType: 'blob' })
    .then(res => {
      util.download(res, '刷卡消费列表.xls')
    })
}

function cancelRefund (data) {
  return post(apiUrl.cancelRefund, data)
}

function checkRefundLimit (data) {
  return post(apiUrl.checkRefundLimit, data)
}

function bookRefund(data){
  return post(apiUrl.bookRefund)
}

function getOrderInfo(data){
  return post(apiUrl.getOrderInfo,data)
}

function myApplyLoanType1(data){
  return post(apiUrl.myApplyLoanType1,data)
}
function doOut(data){
  return post(apiUrl.doOut,data);
}
function tkOrderList (data) {
  return post(apiUrl.tkOrderList, data)
}

function tkAudit (data) {
  return post(apiUrl.tkAudit, data)
} 

function get (url, params, options) {
  return new Promise((resolve, reject) => {
    var load = loading.service()

    axios.get(url, { params, ...options })
      .then(({ data }) => {
        load.close()
        if (data) {
          if (data.success) {
            resolve(data.result)
          } else {
            reject(data.errorMessage || '接口错误:' + url)
          }
        } else {
          reject('错误:' + JSON.stringify(data))
        }
      })
      .catch(({ response } = {}) => {
        load.close()
        reject('错误:' + JSON.stringify(response))
      })
  })
}

function post (url, params) {
  var postParams = new URLSearchParams()
  for (var key in params) {
    postParams.append(key, params[key])
  }

  return new Promise((resolve, reject) => {
    var load = loading.service()

    axios.post(url, postParams, {
      headers: { 
        'token': util.getToken()
      }
    })
      .then(({ data }) => {
        load.close()
        if (data) {
          if (data.success) {
            resolve(data.result)
          } else {
            reject(data.errorMessage || '接口错误:' + url)
          }
        } else {
          reject('错误:' + JSON.stringify(data))
        }
      })
      .catch(({ response } = {}) => {
        load.close()
        reject('错误:' + JSON.stringify(response))
      })
  })
}
