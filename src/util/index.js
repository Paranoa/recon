import Cookies from 'js-cookie'

export default {
  dateToString (dateObj) {
    var year = dateObj.getFullYear()
    var month = dateObj.getMonth() + 1
    var date = dateObj.getDate()
    return year + '-' + fixNum(month) + '-' + fixNum(date)
  },
  setCookie (name, value) {
    return Cookies.set(name, value)
  },
  getCookie (name) {
    return Cookies.get(name)
  },
  downloadXls (data, name) {
    if (data) {
      let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      
      document.body.appendChild(link)
      link.click()
    }
  },
  appendUrlParams (url, params) {
    var qstr = ''
    for (var key in params) {
      qstr += ('&' + key + '=' + params[key])
    }
    if (!(/\/.+\?[^\\/]+$/).test(url)) {
      qstr = qstr.replace('&', '?')
    }
    return url + qstr
  }
}

function fixNum (num) {
  return num <= 9 ? '0' + num : num
}