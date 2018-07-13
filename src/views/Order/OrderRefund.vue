<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <div class="form-group clearfix">
          <label class="col-lg-2 fl" style="font-size:12px; margin-top: 10px">预约退贷打款日期：</label>
          <Datepicker input-class="datepicker-input" v-model="reserveDate" @input="findRefund" />
          <div style="width:240px;height:50px;float:right;">请在预约日期16:00之前完成打款，否则需要重新预约，可能会产生费用</div>
        </div>
        <div class="form-group clearfix refund_show" style="width:207px;height:auto;padding:20px 0 0 50px;float:left;line-height: 23px;" v-show="refundShow">
          贷款本金：<span class="benjin">{{ loanAmt }}</span> <i class="icon-question-sign" title="客户申请的借款金额"></i><br>
          已还本金：<span class="yihuanbenjin">{{ paidAmt }}</span> <i class="icon-question-sign"  title="客户已归还的贷款本金部分"></i><br>
          剩余本金：<span class="shengyubenjin">{{ corpus }}</span> <i class="icon-question-sign"  title="贷款本金-已还本金"></i><br>
          +应还手续费：<span class="yinghuanshouxufei">{{ fee }}</span> <i class="icon-question-sign"  title="到当期为止全部应还手续费-已还手续费"></i><br>
          <div class="zhilajindiv" v-show="showLateFee">
            +滞纳金：<span class="zhilajin">{{ lateFee }}</span> <i class="icon-question-sign" title="逾期应还金额5%（每个账单日计算一次并累加）"></i>
          </div>
          <div class="faxidiv" v-show="penaltiesShow">
            +罚息：<span class="faxi">{{ penalties }}</span> <i class="icon-question-sign"  title="贷款本金*0.5‰逾期天数"></i>
          </div>
          <div class="qitafeiyongdiv" v-show="otherFeeShow">
            +其他费用：<span class="qitafeiyong">{{ otherFee }}</span>
          </div>
          +退贷手续费：<span class="shouxufei">{{ refundFee }}</span> <i class="icon-question-sign" title="贷款本金*1%"></i><br>
          -贴息金额：<span class="tiexi">{{ merchantRefundFee }}</span> <i class="icon-question-sign" title="商户贴息金额"></i><br>
          <b>合计：<span class="heji">{{ heji }}</span></b>
        </div>
        <div class="form-group clearfix refund_show" style="width:254px;float:left;line-height:17px;padding-top:20px" v-show="refundShow">
          <b>请将款项打入以下账户：</b><br><br>
          金额：<span class="heji">{{ heji }}</span><br>
          户名：即科金融信息服务（上海）有限公司<br>
          开户行：中国银行上海市国定路支行<br>
          账号：436466315168<br>
          因银行网点搬迁，<span style="font-weight: 800">如在退款/汇款操作时查询不到“开户行：中国银行上海市国定路支行”，可以选择“中国银行上海市新江湾城支行”。其他信息不变！</span><br>
          备注信息：<span class="beizhu" style="color:red">{{ remark }}</span>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="yuyue" v-show="refundShow">预约</button>
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>   
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import api from '@/api/api'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        reserveDate: null,
        loanAmt:'',
        paidAmt:'',
        corpus:'',
        fee:'',
        refundFee:'',
        merchantRefundFee:'',
        heji:'',
        remark:'',
        lateFee:'',
        penalties:'',
        otherFee:'',
        showLateFee:false,
        penaltiesShow:false,
        otherFeeShow:false,
        refundShow:false
      }
    },
    components: {
      BaseModal,
      Datepicker
    },
    methods: {
      findRefund () {
        const self = this
        console.log(this.reserveDate + ' ' + this.modalId)
        api.calculateRefund({
          'refund_id':this.modalId,
          'refund_end':this.reserveDate
        }).then(result=>{
            self.loanAmt = result.loanAmt
            self.paidAmt = result.paidAmt
            self.corpus = result.corpus
            self.fee = result.fee
            self.refundFee = result.refundFee
            self.merchantRefundFee = result.merchantRefundFee
            self.heji = result.heji
            self.remark = result.remark
            self.lateFee = result.lateFee
            if(self.lateFee>0){
              self.showLateFee = true
            }else{
              self.showLateFee =false
            }
            self.penalties = result.penalties
            if(self.penalties>0){
              self.penaltiesShow = true
            }else{
              self.penaltiesShow = false
            }
            self.otherFee = result.otherFee
            if(self.otherFee>0){
              self.otherFeeShow =  true
            }else{
              self.otherFeeShow = false
            }
            self.refundShow= true
          console.log(result)
        })
      },
      yuyue () {
        if(!confirm("确定要这样操作吗？")){
          return false;
        }
        api.bookRefund({
          'refund_id':this.modalId,
          'refund_end':this.reserveDate
        }).then(resultData=>{
            console.log(resultData)
            this.$emit('close')
        })
      },
      close () {
        this.$emit('close')
      },
    }
  }
</script>

<style scoped>
  .content-body { height: 400px }
  .icon-question-sign { font-size: 14px; float: right; margin-right: 20px; margin-top: 3px;}
  .modal-dialog .datepicker-input { min-width: 0; width: 100px }
</style>