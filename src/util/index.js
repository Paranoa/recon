import Cookies from 'js-cookie'

export default {
  dateToString (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var date = date.getDate()
    return year + '-' + fixNum(month) + '-' + fixNum(date)
  },
  setCookie (name, value) {
    return Cookies.set(name, value)
  },
  getCookie (name) {
    return Cookies.get(name)
  },
  download (data, name) {
    if (data) {
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      
      document.body.appendChild(link)
      link.click()
    }
  }
}

function fixNum (num) {
  return num <= 9 ? '0' + num : num
}