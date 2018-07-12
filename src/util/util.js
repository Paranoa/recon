export default {
  dateToString (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var date = date.getDate()
    return year + '-' + fixNum(month) + '-' + fixNum(date)
  }
}

function fixNum (num) {
  return num <= 9 ? '0' + num : num
}