export default {
  ORDER_STATUS: [
    {
      key: '支付成功',
      val: '支付成功'
    },{
      key: '未支付',
      val: '未支付'
    },{
      key: '支付中',
      val: '支付中'
    },{
      key: '支付失败',
      val: '支付失败'
    },{
      key: '审批拒绝',
      val: '审批拒绝'
    }],
    PAY_STATUS: [{
      key: '1',
      val: '准备取消'
    },{
      key: '2',
      val: '已确认取消'
    },{
      key: '3',
      val: '取消完成'
    }
  ],
  DDG_STATUS: [
    { 
      key: '103',
      val: '商户待审核'
    },
    { 
      key: '106',
      val: '商户拒绝'
    },
    { 
      key: '110',
      val: '审批中'
    },
    { 
      key: '130',
      val: '已批准,待放款'
    },
    { 
      key: '140',
      val: '已拒绝'
    },
    { 
      key: '160',
      val: '已放款'
    }
  ],
  NOW: new Date(),
  TODAY: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  A_MONTH_BEFORE: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000)  
}