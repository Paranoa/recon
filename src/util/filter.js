export default {
  fix2,
  len10,
  statusMean,
  statusClass,
  fundMean,
  appType,
  loanAfterStatus,
  fundName,
  openStatusKL,
  openStatusSSJ,
  cashStatus,
}

function fix2 (value) {
  if (isNaN(+value)) {
    return value
  } else {
    return (+value).toFixed(2)
  }
}

function len10 (value) {
  if (value === null || typeof a === 'undefined') {
    return ''
  } else {
    return value.toString().substring(0, 10)
  }
}

function statusMean (value) {
  return 'statusMean' || value
}

function statusClass (value) {
  return 'statusClass' || value
}

function fundMean (value) {
  return 'fundMean' || value
}

function appType (value) {
  return 'appType' || value
}

function loanAfterStatus (value) {
  return 'loanAfterStatus' || value
}

function fundName (key) {
  return {
    KLJ01: '渠道LK',
    SSJ01: '渠道JSS'
  }[key] || key
}

function openStatusKL (key) {
  return {
    APPLYING: '未开户',
    AUDIT: '开户中',
    PASSED: '开户成功',
    BACK: '开户失败',
    REFUSED: '开户失败'
  }[key] || key
}

function openStatusSSJ (key) {
  return {
    '1': '开户成功',
    '2': '开户失败',
    '3': '开户中',
    '4': '未开户',
    '5': '锁定'
  }[key] || key
}

function cashStatus (key) {
  return {
    pending: '处理中',
    confirming: '待确认',
    done: '成功',
    fail: ' 失败'
  }[key] || key
}