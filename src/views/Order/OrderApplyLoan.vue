<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <div>
          <h5>订单信息</h5>
          <hr style="width: 80%; margin: 10px 0"/>
          <table class="applyloan-table table table-striped">
            <tbody>
              <tr>
                <th>客户姓名</th>
                <td>{{ order.C_NAME_CN }}</td>
                <th>客户手机</th>
                <td>{{ order.C_MBL_TEL }}</td>
                <th>订单号</th>
                <td>{{ order.C_APP_ID }}</td>
              </tr>
              <tr>
                <th>申请金额</th>
                <td>{{ order.N_AMT_APPLIED }}</td>
                <th>分期期数</th>
                <td>{{ order.N_TENOR_APPLIED }}</td>
                <th>分期类型</th>
                <td>{{ order.pdt }}</td>
              </tr>
              <tr>
                <th>分期状态</th>
                <td>{{ order.SELF_ADD_APPLY_STATUS }}</td>
                <th>销售姓名</th>
                <td>{{ order.C_SALES_ID }}</td>
                <th>发货地址</th>
                <td>{{ order.addr1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h5>资料上传</h5>
          <hr style="width: 80%; margin: 10px 0"/>
          <div class="form-group clearfix">
            <div class="col-lg-10">
              发货时间: <Datepicker v-model="sendTime" />
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="fbld col-lg-2 control-label">下单凭证：请上传下单凭证</label>
            <div class="col-lg-10">
              <div class="tinyImgUpload-img-thumb tinyImgUpload-img-item" v-for="(file, index) of orderFiles" :key="file.id">
                <img class="tinyImgUpload-thumb-icon" :src="file.src">
                <i class="tinyImgUpload-img-remove" @click="orderFiles.splice(index, 1)">x</i>
              </div>
              <FileUpload @success="orderFileUploaded">
                <div class="tinyImgUpload-img-up-add tinyImgUpload-img-item">
                  <span class="tinyImgUpload-img-add-icon">+</span>
                </div>
              </FileUpload>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="fbld col-lg-2 control-label ">打款记录：请上传打款记录</label>
            <div class="col-lg-10">
              <div class="tinyImgUpload-img-thumb tinyImgUpload-img-item" v-for="(file, index) of finaceFiles" :key="file.id">
                <img class="tinyImgUpload-thumb-icon" :src="file.src">
                <i class="tinyImgUpload-img-remove" @click="finaceFiles.splice(index, 1)">x</i>
              </div>
              <FileUpload @success="finaceFileUploaded">
                <div class="tinyImgUpload-img-up-add  tinyImgUpload-img-item">
                  <span class="tinyImgUpload-img-add-icon">+</span>
                </div>
              </FileUpload>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-default" @click="close">关闭</button>
      <button type="button" class="btn btn-primary" @click="submit">提交申请</button>
    </template>   
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import FileUpload from '@/components/FileUpload.vue'
  import api from '@/api/api'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        order: {},
        orderFiles: [],
        finaceFiles: [],
        sendTime: '',
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
        this.orderFiles.push(res)
      },
      finaceFileUploaded (res) {
        this.finaceFiles.push(res)
      },
      submit () {
        api.test()
      }
    },
    mounted () {
      console.log('loadCancel' + this.modalId)
    }
  }
</script>

<style scoped>
  .content-body { max-height: none; height: 480px }
  .applyloan-table th, .applyloan-table td { border-color: #edf2f7 }
  .icon-question-sign { font-size: 14px; float: right; margin-right: 20px; margin-top: 3px }

  .tinyImgUpload-img-item {
    position: relative;
    float: left;
    margin-right: 0.1875rem;
    margin-bottom: 0.1875rem;
    height: 2.34375rem;
    width: 2.34375rem;
    box-sizing: border-box;
  }
  .tinyImgUpload-img-thumb {
    border: 1px solid #000;
  }
  .tinyImgUpload-thumb-icon {
    width: 100%;
    height: 100%;
  }
  .tinyImgUpload-img-up-add {
    display: table;
    border: 1px dashed #E0E0E0;
  }
  .tinyImgUpload-img-add-icon {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .tinyImgUpload-img-remove {
    cursor: pointer;
    position: absolute;
    right: -0.1875rem;
    top: -0.1875rem;
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #f7333d;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 0.25rem;
    overflow: hidden;
    background-clip: padding-box;
    line-height: 1;
  }
  .tinyImgUpload-img-file-input {
    display: none;
  }
</style>