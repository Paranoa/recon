export default {
  fix2,
  len10,
  statusMean,
  statusClass,
  fundMean,
  appType,
  loanAfterStatus
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