import { apiUrl } from '@/api/config'
import axios from 'axios'
import util from '@/util'
import loading from '@/util/loading'

export default {
  login,
  logout,
  getUserInfo,
  resetPwd,
  sendSmsCode,
  checkSmsCodeByAccount,
  resetPasswordBySmsCode,
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
  findRefundByExtId,
  cancelRefund,
  cancelRefundByExtId,
  checkRefundLimit,
  bookRefund,
  getStoreCodes,
  calculateRefund,
  getOrderInfo,
  myApplyLoanType1,
  sendFile,
  doOut,
  tkOrderList,
  tkAudit,
  ddgOrderList,
  ddgCpxy,
  ddgSubmit,
  ddgRefuse,
  ddgBillingInfo,
  ddgBillingDetail,
  ddgPaymentPlan,
  ddgDoOut,
  ddgExportBillingInfo,
  ddgExportBillingDetail,
  ddgExportPaymentPlan,
}

function login (data) {
  return post(apiUrl.login, data)
}

function logout (data) {
  return post(apiUrl.logout, data)
}

function getUserInfo (data) {
  return post(apiUrl.checkLogin, data)
}

function resetPwd (data) {
  return post(apiUrl.resetPwd, data)
}

function sendSmsCode (data) {
  return post(apiUrl.sendSmsCode, data)
}

function checkSmsCodeByAccount (data) {
  return post(apiUrl.checkSmsCodeByAccount, data)
}

function resetPasswordBySmsCode (data) {
  return post(apiUrl.resetPasswordBySmsCode, data)
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
  return get(apiUrl.exportExcel, data, { responseType: 'blob' }, true)
}

function findRefundByExtId (data) {
  return post(apiUrl.findRefundByExtId, data)
}

function cancelRefund (data) {
  return post(apiUrl.cancelRefund, data)
}

function cancelRefundByExtId (data) {
  return post(apiUrl.cancelRefundByExtId, data)
}

function checkRefundLimit (data) {
  return post(apiUrl.checkRefundLimit, data)
}

function bookRefund(data){
  return post(apiUrl.bookRefund,data)
}

function getOrderInfo(data){
  return post(apiUrl.getOrderInfo,data)
}

function myApplyLoanType1(data){
  return post(apiUrl.myApplyLoanType1,data)
}

function sendFile (data) {
  return post(apiUrl.sendFile, data)
}

function doOut(data){
  return get(apiUrl.doOut, data, { responseType: 'blob' }, true)
}
function tkOrderList (data) {
  return post(apiUrl.tkOrderList, data)
}

function tkAudit (data) {
  return post(apiUrl.tkAudit, data)
} 

function ddgOrderList (data) {
  return post(apiUrl.ddgOrderList, data)
}

function ddgCpxy (data) {
  return post(apiUrl.ddgCpxy, data)
}

function ddgSubmit (data) {
  return post(apiUrl.ddgSubmit, data)
}

function ddgRefuse (data) {
  return post(apiUrl.ddgRefuse, data)
}

function ddgBillingInfo (data) {
  return post(apiUrl.ddgBillingInfo, data)
}

function ddgBillingDetail (data) {
  return post(apiUrl.ddgBillingDetail, data)
}

function ddgPaymentPlan (data) {
  return post(apiUrl.ddgPaymentPlan, data)
}

function ddgDoOut (data) {
  return post(apiUrl.ddgDoOut, data, { responseType: 'blob' }, true)
}

function ddgExportPaymentPlan (data) {
  return post(apiUrl.ddgExportPaymentPlan, data, { responseType: 'blob' }, true)
}

function ddgExportBillingInfo (data) {
  return post(apiUrl.ddgExportBillingInfo, data, { responseType: 'blob' }, true)
}

function ddgExportBillingDetail (data) {
  return post(apiUrl.ddgExportBillingDetail, data, { responseType: 'blob' }, true)
}

function get (url, params, options, originResponse) { // originResponse为true时,返回原始响应数据
  return new Promise((resolve, reject) => {
    var load = loading.service()

    axios.get(url, { 
        params: { 
          timeStamp: new Date().getTime(),
          ...params
        },
        ...options,
        headers: {
          'token': util.getCookie('token')
        }
      }).then(({ data }) => {
        load.close()
        if (originResponse) {
          resolve(data)
        } else {
          if (data) {
            if (data.success) {
              resolve(data.result)
            } else {
              reject(data.errorMessage || '接口错误:' + url)
            }
          } else {
            reject('错误:' + JSON.stringify(data))
          }
        }
      })
      .catch(({ response } = {}) => {
        load.close()
        reject('错误:' + JSON.stringify(response))
      })
  })
}

function post (url, params, options, originResponse) {
  var postParams = new URLSearchParams()
  for (var key in params) {
    postParams.append(key, params[key])
  }

  return new Promise((resolve, reject) => {
    var load = loading.service()
    axios.post(url, postParams, {
      ...options,
      headers: {
        'token': util.getCookie('token')
      }
    }).then(({ data }) => {
        load.close()
        if (originResponse) {
          resolve(data)
        } else {
          if (data) {
            if (data.success) {
              resolve(data.result)
            } else {
              reject(data.errorMessage || '接口错误:' + url)
            }
          } else {
            reject('错误:' + JSON.stringify(data))
          }
        }
      })
      .catch(({ response } = {}) => {
        load.close()
        reject('错误:' + JSON.stringify(response))
      })
  })
}
