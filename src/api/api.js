import { apiUrl } from '@/api/config'

export default {
  test,
  login,
  storeFundList,
  get,
  post,
  queryOrder,
  storeDeposit,
  storeDepositStatus,
  billingDetail,
}

function login (data) {
  return post(apiUrl.login, data)
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
  return get(apiUrl.queryOrder, data)
}

function get (url, params) {
  return new Promise((resolve, reject) => {
    $.get(url, params)
      .then(res => {
        if (res) {
          if (res.success) {
            resolve(res.result)
          } else {
            reject(res.errorMessage || '接口错误:' + url)
          }
        } else {
          reject('错误:' + JSON.stringify(res))
        }
      })
      .catch(err => {
        reject('错误:' + JSON.stringify(err))
      })
  })
}

function post (url, body) {
  return new Promise((resolve, reject) => {
    $.post(url, body)
      .then(res => {
        if (res) {
          if (res.success) {
            resolve(res.result)
          } else {
            reject(res.errorMessage || '接口错误:' + url)
          }
        } else {
          reject('错误:' + JSON.stringify(res))
        }
      })
      .catch(err => {
        reject('错误:' +JSON.stringify(err))
      })
  })
}
