<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div id="CardOrderCCIRefund">
        <div class="content-body">
          <div class="flex">
            <div style="width:85px;">
              <strong style="color:#212121; font-size:16px;">贷款金额</strong>
            </div>
            <div>
              <strong style="color:#585858;font-size:17px;">￥{{ modalParam.merchantAmount }}</strong>
            </div>
          </div>
          <div>
            <span style="color:#FF4545;font-size:20px;vertical-align: middle;">*</span>
            <span style="margin-left:5px;color:#585858;">请将款项打入以下账户</span>
          </div>
          <div class="flex">
            <div style="width:85px;">
              <span style="color:#212121;font-size:15px;">金额</span>
            </div>
            <div>
              <span>￥{{ modalParam.merchantAmount }}</span>
            </div>
          </div>
          <div class="flex">
            <div style="width:85px;">
              <span style="color:#212121;font-size:15px;">户名</span>
            </div>
            <div>
              <span style="color:#585858;">即科金融信息服务(上海)有限公司</span>
            </div>
          </div>
          <div class="flex">
            <div style="width:85px;">
              <span style="color:#212121;font-size:15px;">开户行</span>
            </div>
            <div>
              <span style="color:#585858;">中国工商银行杨浦支行</span>
            </div>
          </div>
          <div class="flex">
            <div style="width:85px;">
              <span style="color:#212121;font-size:15px;">账号</span>
            </div>
            <div>
              <span style="color:#585858;">1001330319100020738</span>
            </div>
          </div>
          <!-- <div>
            <span style="color:#FF4545;font-size:20px;vertical-align: middle;">*</span>
            <span style="margin-left:5px; color:#585858;">因银行网点搬迁，</span>
            <span style="color:#0F0F0F;">如在退款/汇款操作时查询不到“开户行："中国银行上海市国定路支行"，可以选择"中国银行上海市新江湾城支行"。其他信息不变！</span>
          </div> -->
          <div class="flex">
            <div style="width:85px;">
              <span style="color:#585858;font-size:13px;">备注信息</span>
            </div>
            <div>
              <strong style="color:#FF3949;font-size:16px;">{{ modalParam.name }} {{ modalParam.mobile }}</strong>
            </div>
          </div>
          <div class="flex heightCenter" style="margin-top:20px;">
            <div>
              <span style="color:#212121;font-size:15px;">上传打印凭证</span>
            </div>
            <div style="margin-left:20px;">
              <FileUpload class="upload"
                :auto="false" :data="{ appId: modalParam.appId }" action="cardOrder/refundPic"
                @selected="(ref, name) => { uploadRef = ref; uploadName = name }"
                @success="reserveSuccess"
                @error="reserveError">
                <span class="uploadBtn">{{ uploadRef ? '已上传' : '浏览' }}</span>
              </FileUpload>
              <span style="margin-left: 10px; color:#A0A0A0;">{{ uploadName || "未选择文件" }}</span>
            </div>
          </div>
          <div class="yuyue" @click="reserve">预约</div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
<script>
  import BaseModal from '@/components/BaseModal.vue'
  import FileUpload from '@/components/FileUpload.vue'

  export default {
    props: ['title', 'width', 'modalParam'],
    data () {
      return {
        merchantAmount: '',
        name: '',
        mobile: '',
        uploadRef: null,
        uploadName: '',
      }
    },
    components: {
      BaseModal,
      FileUpload,
    },
    methods: {
      reserve () {
        if (this.uploadRef) {
          this.$ui.confirm('您确认要申请退贷吗？', (confirm) => {
            confirm.close()
            this.uploadRef.active = true
          })
        } else {
          this.$ui.alert('请选择打款凭证图片')
        }
      },
      reserveSuccess () {
        this.$ui.alert('预约成功')
        this.$emit('success')
      },
      reserveError (err) {
        this.$ui.alert(err)
      },
      close () {
        this.$emit('close')
      },
    }
  }
</script>

<style scoped>
  #CardOrderCCIRefund .content-body{
    padding: 25px;
    height: 420px;
    font-size: 14px;
  }
  #CardOrderCCIRefund strong{
    font-size: 16px;
  }
  #CardOrderCCIRefund .content-body>div{
    margin-bottom: 10px;
  }
  #CardOrderCCIRefund .uploadBtn{
    border: 1px solid #1FCFCC;
    border-radius: 2px;
    color: #1FCFCC;
    padding: 5px 25px;
  }
  .file-uploads-html5{
    overflow: initial;
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
    margin-top: 30px;
  }
</style>