<template>
  <BaseModal title="申请放款" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <div class="infoTable">
          <div class="infoTableHeader">
            订单信息
          </div>
          <div class="flex" style="min-height:60px;border-bottom: 1px solid #BDBDBD;">
            <div class="cellA rightBorder">
              客户姓名
            </div>
            <div class="cellB rightBorder">
              {{ order.C_NAME_CN }}
            </div>
            <div class="cellA rightBorder">
              客户手机
            </div>
            <div class="cellB rightBorder">
              {{ order.C_MBL_TEL }}
            </div>
            <div class="cellA rightBorder">
              订单号
            </div>
            <div class="cellB">
              {{ order.C_APP_ID }}
            </div>
          </div>
          <div class="flex" style="min-height:60px;border-bottom: 1px solid #BDBDBD;">
            <div class="cellA rightBorder">
              申请金额
            </div>
            <div class="cellB rightBorder">
              {{ order.N_AMT_APPLIED }}
            </div>
            <div class="cellA rightBorder">
              分期期数
            </div>
            <div class="cellB rightBorder">
              {{ order.N_TENOR_APPLIED }}
            </div>
            <div class="cellA rightBorder">
              分期类型
            </div>
            <div class="cellB">
              {{ order.pdt }}
            </div>
          </div>
          <div class="flex" style="min-height:60px;">
            <div class="cellA rightBorder">
              分期状态
            </div>
            <div class="cellB rightBorder">
              {{ order.SELF_ADD_APPLY_STATUS|statusMean }}
            </div>
            <div class="cellA rightBorder">
              销售姓名
            </div>
            <div class="cellB rightBorder">
              {{ order.C_SALES_ID }}
            </div>
            <div class="cellA rightBorder">
              发货地址
            </div>
            <div class="cellB">
              {{ order.jiaJuDaiAddr1+' '+order.jiaJuDaiAddr2 }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import FileUpload from '@/components/FileUpload.vue'
  import api from '@/api'
  import constant from '@/util/constant'

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        order: {},
        orderFiles: [],
        finaceFiles: [],
        sendTime: '',
        today: constant.TODAY,
      }
    },
    components: {
      BaseModal,
      Datepicker,
      FileUpload,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      orderFileUploaded (res) { 
        if (res.success) {
          var resultData = res.result
          this.orderFiles.push(resultData) 
        } else {
          this.$ui.alert(res.errorMessage)
        }
      },
      finaceFileUploaded (res) {
        if (res.success) {
          var resultData = res.result
          this.finaceFiles.push(resultData) 
        } else {
          this.$ui.alert(res.errorMessage)
        }
      },
      uploadErr (err) {
        this.$ui.alert(err)
      },
      submit () {
        var orderFilesJso = JSON.stringify(this.orderFiles)
        var finaceFilesJso = JSON.stringify(this.finaceFiles)
        var data = {
          'appId':this.modalId,
          'orderFiles':orderFilesJso,
          'finaceFiles':finaceFilesJso,
          'sendTime':this.sendTime
        }
        console.log(data)
        api.myApplyLoanType1(data)
        .then(() => {
          this.$ui.alert('申请成功')
          this.$emit('success')
        })
        .catch(err => this.$ui.alert(err))
      },
      getOrderDetailInfo(){
        api.getOrderInfo({'cAppId':this.modalId})
        .then(resultData => {
          this.order = resultData.orderInfo
        })
        .catch(err => this.$ui.alert(err))
      }
    },
    mounted () {
      this.getOrderDetailInfo()
    }
  }
</script>

<style scoped>
  .content-body {
    padding: 15px 25px; 
  }
  .infoTable{
    width: 1090px;
    height: 217px;
    border: 1px solid #BDBDBD;
    border-radius: 0px 0px 4px 4px;
  }
  .infoTableHeader{
    background-color: #FAFAFA;
    height: 35px;
    padding: 10px 25px;
    font-size: 14px;
  }
  .rightBorder{
    border-right: 1px solid #BDBDBD;
  }
  .cellA{
    display: flex;
    width: 120px;
    align-items: center;
    justify-content: center;
  }
  .cellB{
    display: flex;
    width: 240px;
    align-items: center;
    padding-left: 30px;
    color: #A0A0A0;
  }

</style>