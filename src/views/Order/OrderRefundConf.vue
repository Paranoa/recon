<template>
  <BaseModal title="退款确认" :width="width" @close="close">
    <template slot="body">
      <div class="content-body form-horizontal">
        <div class="form-group clearfix">
          <label for="return_img0" class="col-lg-2 control-label">上传打款凭证：</label>
          <div class="col-lg-10">
            <FileUpload
              action="order/img/upload"
              @success="(res, name) => { uploadSuccess(0, res, name) }"
              @error="uploadErr">
              <span class="btn">选择文件</span>
            </FileUpload>
            <span>{{ imgFileNames[0] || '未选择任何文件' }}</span>
            <span class="fr">*仅限jpg/png/bmp/gif</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="return_img1" class="col-lg-2 control-label"></label>
          <div class="col-lg-10">
            <FileUpload
              action="order/img/upload"
              @success="(res, name) => { uploadSuccess(1, res, name) }"
              @error="uploadErr">
              <span class="btn">选择文件</span>
           </FileUpload>
           <span>{{ imgFileNames[1] || '未选择任何文件' }}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="return_img2" class="col-lg-2 control-label"></label>
          <div class="col-lg-10">
            <FileUpload
              action="order/img/upload"
              @success="(res, name) => { uploadSuccess(2, res, name) }"
              @error="uploadErr">
              <span class="btn">选择文件</span>
            </FileUpload>
            <span>{{ imgFileNames[2] || '未选择任何文件' }}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="inputPassword1" class="col-lg-2 control-label">备注: </label>
          <div class="col-lg-10"><input type="text" class="form-control" v-model="mark" maxlength="100"></div>
        </div>
        <div class="form-group clearfix">
          <div class="col-lg-10">
            <span style="color:red;font-size: 14px;" v-if="modalParam.mark">【打回原因：{{ modalParam.mark }}】</span>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="submit">提交</button>
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import FileUpload from '@/components/FileUpload.vue'
  import api from '@/api'

  export default {
    props: ['width', 'modalParam'],
    data () {
      return {
        imgFiles: [],
        imgFileNames: ['', '', ''],
        mark: ''
      }
    },
    components: {
      BaseModal,
      FileUpload,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      uploadSuccess (index, res, name) {
        this.imgFiles[index] = res.result
        this.imgFileNames.splice(index, 1, name) // 数组以splice方法操作确保数据响应式
      },
      uploadErr (err) {
        this.$ui.alert(err)
      },
      submit () {
        if (this.imgFiles.length) {
          var imgFileStr = JSON.stringify(this.imgFiles.filter(img => img))
          api.sendFile({
            app_id: this.modalParam.C_APP_ID,
            imgFileStr,
            mark: this.mark,
          })
          .then(() => {
            this.$ui.alert('上传凭证成功')
            this.$emit('success')
          })
          .catch(err => this.$ui.alert(err))
        } else {
          this.$ui.alert('请上传打款凭证')
        }
      }
    }
  }
</script>

<style scoped>
  label.file-uploads { line-height: 30px }
</style>