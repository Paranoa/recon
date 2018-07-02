export default {
  test,
  get,
  post
}

function test () {
  return get('../mock/test.json')
}

function get (url, params) {
  return new Promise((resolve, reject) => {
    $.get(url, { params })
      .then(res => {
        if (res) {
          if (res.result) {
            resolve(res.responseObject)
          } else {
            reject(res.errMsg || '接口错误:' + url)
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
          if (res.result) {
            resolve(res.responseObject)
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
