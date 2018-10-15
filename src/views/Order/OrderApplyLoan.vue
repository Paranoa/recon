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
        <p style="font-size:17px;color:#1A2D4A;border-left:4px solid #1A2D4A;padding-left:10px;margin-top:15px;">资料上传</p>
        <div class="flex heightCenter" style="margin-top:20px;">
          <span style="font-size:16px;margin-right:15px;color:#212121;">发货时间</span>
          <Datepicker v-model="sendTime" :disabledDates="{ to: today }" />
        </div>
        <p style="color:#212121;font-size:15px;margin-top:20px;">下单凭证：请上传下单凭证</p>
        <div class="flex flexWrap" style="margin-top:10px;">
          <div style="margin-right:15px; margin-bottom:10px;" class="tinyImgUpload-img-thumb tinyImgUpload-img-item" v-for="(file, index) of orderFiles" :key="file.id">
            <img style="width:90px;height:62px;" class="tinyImgUpload-thumb-icon" :src="file.imgUrl">
            <img class="tinyImgUpload-img-remove" @click="orderFiles.splice(index, 1)" src="../../assets/ico/delete.png">
          </div>
          <FileUpload style="margin-right:15px; margin-bottom:10px;" @success="orderFileUploaded" action="order/img/upload" @error="uploadErr">
            <div class="addImgBox">
              <div class="addImgIcon">
                <span style="margin-left:-1px;margin-top:-4px;">+</span>
              </div>
              <span style="font-size:12px;margin-top:5px;">点击添加图片</span>
            </div>
          </FileUpload>
        </div>
        <p style="color:#212121;font-size:15px;margin-top:20px;">打款记录：请上传打款记录</p>
        <div class="flex flexWrap" style="margin-top:10px;">
          <div style="margin-right:15px; margin-bottom:10px;" class="tinyImgUpload-img-thumb tinyImgUpload-img-item" v-for="(file, index) of finaceFiles" :key="file.id">
            <img style="width:90px;height:62px;" class="tinyImgUpload-thumb-icon" :src="file.imgUrl">
            <img class="tinyImgUpload-img-remove" @click="finaceFiles.splice(index, 1)" src="../../assets/ico/delete.png">
          </div>
          <FileUpload style="margin-right:15px; margin-bottom:10px;" @success="finaceFileUploaded" action="order/img/upload" @error="uploadErr">
            <div class="addImgBox">
              <div class="addImgIcon">
                <span style="margin-left:-1px;margin-top:-4px;">+</span>
              </div>
              <span style="font-size:12px;margin-top:5px;">点击添加图片</span>
            </div>
          </FileUpload>
        </div>
        <div class="flex flexCenter" style="margin-tpo:20px;margin-bottom:20px;">
          <div class="closeBtn">
            <span @click="close">关闭</span>
          </div>
          <div class="submitBtn" style="margin-left:40px;">
            <span @click="submit">提交申请</span>
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
    font-size: 14px;
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
  .addImgBox{
    background: #FAFAFA;
    box-shadow: 0 1px 3px 0 #CDCDCD;
    border-radius: 2px;
    width: 90px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .addImgIcon{
    width: 20px;
    height: 20px;
    background: #FFAE27;
    border-radius: 100%;
    color:#fff;
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tinyImgUpload-img-remove{
    position: absolute;
    width: 13px;
    height: 16px;
    margin-left: -17px;
    margin-top: 3px;
    cursor: pointer;
  }
  .closeBtn{
    background: #FAFAFA;
    border: 1px solid #A0A0A0;
    box-shadow: 0 1px 3px 0 rgba(210,210,210,0.92);
    border-radius: 100px;
    color: #777;
    display: flex;
    width: 110px;
    height: 35px;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    cursor: pointer;
  }
  .submitBtn{
    display: flex;
    width: 110px;
    height: 35px;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    background: #1A9BFE;
    box-shadow: 0 1px 3px 0 rgba(68,165,249,0.92);
    border-radius: 100px;
    color: #fff;
    cursor: pointer;
  }

</style>