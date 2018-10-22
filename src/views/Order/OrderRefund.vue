<template>
  <BaseModal title="退贷预约" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <div class="flex heightCenter">
          <span style="font-size:16px;margin-right:15px;color:#212121;">预约退货打款日期</span>
          <Datepicker input-class="datepicker-input" v-model="reserveDate" @input="findRefund" :disabledDates="{ to: today }" />
          <div class="flex" style="margin-left:20px;width:230px;">
            <div style="display: flex;align-items: center;justify-content: center;font-weight: bold;color: #fff;height: 14px;width: 27px;border-radius: 100%;background: #FF4545; margin-top:10px;margin-right:10px;">
              ！
            </div>
            <p style="margin-top:5px;color:#585858;">请在预约日期<span style="color:#5FCAFF;">16:00</span>之前完成打款，否则需要重新预约，可能会产生费用。</p>
          </div>
        </div>
        <div class="flex" style="margin-top:15px;" v-show="refundShow">
          <div class="left">
            <div class="flex">
              <strong style="width:120px;color:#212121;">贷款本金</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ loanAmt | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="客户申请的借款金额"></i>
            </div>
            <div class="flex" v-if="!hidePrincipal">
              <strong style="width:120px;">已还本金</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ paidAmt | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="客户已归还的贷款本金部分"></i>
            </div>
            <div class="flex">
              <strong style="width:120px;">剩余本金</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ corpus | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="贷款本金-已还本金"></i>
            </div>
            <div class="flex">
              <strong style="width:120px;">+应还手续费</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ fee | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="到当期为止全部应还手续费-已还手续费"></i>
            </div>
            <div class="flex" v-show="showLateFee">
              <strong style="width:120px;">+滞纳金</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ lateFee | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="逾期应还金额5%（每个账单日计算一次并累加）"></i>
            </div>
            <div class="flex" v-show="penaltiesShow">
              <strong style="width:120px;">+罚息</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ penalties | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="贷款本金*0.5‰逾期天数"></i>
            </div>
            <div class="flex" v-show="otherFeeShow">
              <strong style="width:120px;">+其他费用</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ otherFee | fix2 }}</p>
            </div>
            <div class="flex">
              <strong style="width:120px;">+退贷手续费</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ refundFee | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="贷款本金*1%"></i>
            </div>
            <div class="flex">
              <strong style="width:120px;">-贴息金额</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ merchantRefundFee | fix2 }}</p>
              <i class="icon-question-sign" style="color:#A0A0A0;" title="商户贴息金额"></i>
            </div>
            <div class="flex">
              <strong style="width:120px;">合计</strong>
              <p style="width:110px;color:#585858;"><span style="font-size:16px;color:#212121;">￥</span>{{ heji | fix2 }}</p>
            </div>
          </div>
          <div class="right">
            <div>
              <span style="color:#FF4545;font-size:20px;vertical-align: middle;">*</span>
              <span style="margin-left:5px;color:#585858;">请将款项打入以下账户</span>
            </div>
            <div class="flex">
              <strong style="width:75px;color:#212121;">金额</strong>
              <p style="color:#585858;">￥{{ heji }}</p>
            </div>
            <div class="flex">
              <strong style="width:75px;color:#212121;">户名</strong>
              <p style="color:#585858;">即科商业保理（深圳）有限公司</p>
            </div>
            <div class="flex">
              <strong style="width:75px;color:#212121;">开户行</strong>
              <p style="color:#585858;">中国工商银行杨浦支行</p>
            </div>
            <div class="flex">
              <strong style="width:75px;color:#212121;">账号</strong>
              <p style="color:#585858;">1001330309100055282</p>
            </div>
            <!-- <div>
              <span style="color:#FF4545;font-size:20px;vertical-align: middle;">*</span>
              <span style="margin-left:5px; color:#585858;">因银行网点搬迁，</span>
              <span style="color:#0F0F0F;">如在退款/汇款操作时查询不到“开户行："中国银行上海市国定路支行"，可以选择"中国银行上海市新江湾城支行"。其他信息不变！</span>
            </div> -->
            <div class="flex">
              <div style="width:75px; color:#585858;">备注信息</div>
              <span style="color:#FF3949;font-size:16px;">{{ remark }}</span>
            </div>
          </div>
        </div>
        <div class="yuyue" @click="yuyue" v-show="refundShow">预约</div>
      </div>
    </template>
  </BaseModal>
</template>
<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import api from '@/api'
  import constant from '@/util/constant'

  export default {
    props: ['width', 'modalId', 'hidePrincipal'], // hidePrincipal控制是否显示已还本金(单单过的取消退款不显示)
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
        refundShow:false,
        otherFeeShow:false,
        today:constant.TODAY
      }
    },
    components: {
      BaseModal,
      Datepicker
    },
    methods: {
      findRefund () {
        const self = this
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
        })
      },
      yuyue () {
        this.$ui.confirm('确定要这样操作吗？', (confirm) => {
          api.bookRefund({
            'refund_id':this.modalId,
            'refund_end':this.reserveDate
          }).then(resultData=>{
            confirm.close()
            this.$ui.alert(resultData.msg)
            this.$emit('success')
          }).catch(err => alert(err))
        })
      },
      close () {
        this.$emit('close')
      },
    }
  }
</script>

<style scoped>
  .content-body { 
    height: 430px;
    padding: 30px; 
  }
  .left strong{
    font-size: 15px;
  }
  .left>div,.right>div{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .right{
    margin-left: 32px;
  }
  .yuyue{
    width: 110px;
    height: 35px;
    background: #F6A623;
    box-shadow: 0 1px 3px 0 #EFB657;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    font-size: 17px;
    margin-top: 5px;
  }
  .icon-question-sign { font-size: 14px; float: right; margin-right: 20px; margin-top: 3px;}
  .modal-dialog .datepicker-input { min-width: 0; width: 100px }
</style>