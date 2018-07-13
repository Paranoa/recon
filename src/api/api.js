import { apiUrl } from '@/api/config'
import axios from 'axios'

export default {
  test,
  login,
  homeInfo,
  storeFundList,
  get,
  post,
  queryOrder,
  storeDeposit,
  storeDepositStatus,
  billingDetail,
  cardOrderList,
  getStoreCodes,
  calculateRefund
}

function login (data) {
  return post(apiUrl.login, data)
}

function homeInfo (data) {
  return post(apiUrl.homeInfo, data)
}

function storeFundList (data) {
  return get(apiUrl.storeFundList, data)
}

function storeDeposit (data) {
  return post(apiUrl.storeDeposit, data)
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

function bookRefund(data){
  return post(apiUrl.bookRefund)
}

function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(({ data }) => {
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
      .catch(({ response }) => {
        reject('错误:' + JSON.stringify(response.data))
      })
  })
}

function post (url, params) {
  var urlParams = new URLSearchParams()
  for (var key in params) {
    urlParams.append(key, params[key])
  }
  return new Promise((resolve, reject) => {
    axios.post(url, urlParams)
      .then(({ data }) => {
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
      .catch(({ response }) => {
        reject('错误:' + JSON.stringify(response.data))
      })
  })
}
