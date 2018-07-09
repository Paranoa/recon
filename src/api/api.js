import { apiUrl } from '@/api/config'

export default {
  test,
  login,
  get,
  post,
  queryOrder
}

function login (data) {
  return post(apiUrl.login, data)
}

function test () {
  return get('../mock/test.json')
}

function queryOrder (data) {
  return get(apiUrl.queryOrder, data)
}

function get (url, params) {
  return new Promise((resolve, reject) => {
    $.get(url, { params })
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
            reject(res.errMsg || '接口失败:' + url)
          }
        } else {
          reject('接口错误:' + JSON.stringify(res))
        }
      })
      .catch(err => {
        reject('错误:' +JSON.stringify(err))
      })
  })
}
