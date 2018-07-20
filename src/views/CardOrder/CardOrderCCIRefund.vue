<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div class="content-body form-horizontal">
        <div style="margin-left: 40px" class="refund-box">
          <div class="fbld">
            贷款金额：<span>{{ merchantAmount }}</span>元
          </div>
          <div>
            请将款项打入以下账户：
          </div>
          <div>
            金额：<span>{{ merchantAmount }}</span>元
          </div>
          <div>
            户名：即科金融信息服务(上海)有限公司
          </div>
          <div>
            开户行：中国银行上海市国定路支行
          </div>
          <div>
            账号：436466315168
          </div>
          <div>
            因银行网点搬迁，<span class="fbld">如在退款/汇款操作时查询不到“开户行：中国银行上海市国定路支行”，可以选择“中国银行上海市新江湾城支行”。其他信息不变!</span>
          </div>
          <div>
            备注信息：<span style="color: red">{{ name }} {{ mobile }}</span>
          </div>
        </div>
        <div style="margin-left: 20px; margin-top: 10px">
          <span >上传打款凭证：</span>
          <FileUpload class="upload" action="refundPic" :auto="false" :data="{ appId: modalId }" @selected="ref => { uploadRef = ref }" @success="reserveSuccess" @error="reserveError">{{ uploadRef ? '已上传' : '选择文件' }}</FileUpload>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="reserve">预约</button>
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>
<script>
  import api from '@/api'
  import BaseModal from '@/components/BaseModal.vue'
  import FileUpload from '@/components/FileUpload.vue'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        merchantAmount: '',
        name: '',
        mobile: '',
        uploadRef: null,
      }
    },
    components: {
      BaseModal,
      FileUpload,
    },
    methods: {
      reserve () {
        if (this.uploadRef) {
          if(confirm('您确认要申请退贷吗？')) {
            this.uploadRef.active = true
          }
        } else {
          alert('请选择打款凭证图片')
        }
      },
      reserveSuccess () {
        alert('预约成功')
        this.$emit('close')
      },
      reserveError (err) {
        alert(err)
      },
      close () {
        this.$emit('close')
      },
    },
    mounted () {
      api.checkRefundLimit({ appId: this.modalId})
        .then(res => {
          this.merchantAmount = res.merchantAmount
          this.name = res.name
          this.mobile = res.mobile
        })
    }
  }
</script>

<style scoped>
  .upload {
    display: inline;
  }
  .refund-box > div {
    margin-top: 10px
  }
</style>