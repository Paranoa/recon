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
  simpleDate,
  numFormat,
}

function fix2 (value) {
  if (isNaN(+value)) {
    return value
  } else {
    return +(+value).toFixed(2)
  }
}

function len10 (value) {
  if (value === null || typeof value === 'undefined') {
    return ''
  } else {
    return value.toString().substring(0, 10)
  }
}

function statusMean (value) {
  return {
    '99' : '已取消',
    '100': '已保存',
    '103': '商户待审核',
    '106': '商户拒绝',
    '108': '商户通过',
    '110': '审批中',
    '130': '已批准,待放款',
    '140': '已拒绝',
    '150': '待补件',
    '160': '已放款',
    '162': '已终止',
  }[value] || value
}

function statusClass (value) {
  return {
    '99' : 'label-error',
    '100': '',
    '110': 'label-info',
    '130': 'label-alert',
    '140': 'label-error',
    '150': '',
    '160': 'label-success',
    '162': 'label-error',
  }[value] || value
}

function fundMean (value) {
  return {
    'FCS01': '富登小额贷款',
    'DJU01': '即科金融'
  }[value] || value
}

function appType (value) {
  return {
    'GMAIN': '额度订单',
    'GPAY' : '放款订单',
    'GUP'  : '提额订单',
    'NORM' : '普通订单',
  }[value] || value
}

function loanAfterStatus (value) {
  return {
    '0' : '取消完成',
    '1' : '正常',
    '2' : '退货预约',
    '3' : '退贷完成',
    '4' : '提前还款预约',
    '5' : '提前还款完成',
    '6' : '逾期终止',
    '7' : '手动终止',
    '8' : '完成',
    '20': '准备取消',
    '21': '退货已打款',
  }[value] || value
}

function fundName (value) {
  return {
    KLJ01: '渠道LK',
    SSJ01: '渠道JSS'
  }[value] || value
}

function openStatusKL (value) {
  return {
    APPLYING: '未开户',
    AUDIT   : '开户中',
    PASSED  : '开户成功',
    BACK    : '开户失败',
    REFUSED : '开户失败'
  }[value] || value
}

function openStatusSSJ (value) {
  return {
    '1': '开户成功',
    '2': '开户失败',
    '3': '开户中',
    '4': '未开户',
    '5': '锁定'
  }[value] || value
}

function cashStatus (value) {
  return {
    pending   : '处理中',
    confirming: '待确认',
    done      : '成功',
    fail      : ' 失败'
  }[value] || value
}

function simpleDate (value) {
  value = value ? value.toString() : ''
  var result = value.match(/\d{4}.?\d{1,2}.?\d{1,2}/)
  return result ? result[0] : value
}

function numFormat(num){
  return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
          return $1 + ",";
      });
  });
}