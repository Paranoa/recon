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
                {{ imgFileNames[0] || '选择文件' }}
             </FileUpload>
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
            {{ imgFileNames[1] || '选择文件' }}</FileUpload>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="return_img2" class="col-lg-2 control-label"></label>
          <div class="col-lg-10">
            <FileUpload
              action="order/img/upload"
              @success="(res, name) => { uploadSuccess(2, res, name) }"
              @error="uploadErr">
              {{ imgFileNames[2] || '选择文件' }}</FileUpload>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="inputPassword1" class="col-lg-2 control-label">备注: </label>
          <div class="col-lg-10"><input type="text" class="form-control" v-model="mark" maxlength="100"></div>
        </div>
        <div class="form-group clearfix">
          <div class="col-lg-10">
            <span style="color:red;font-size: 14px;" class="return_mark"></span>
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
    props: ['width', 'modalId'],
    data () {
      return {
        imgFiles: [],
        imgFileNames: ['','',''],
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
        this.imgFileNames[index] = name
      },
      uploadErr (err) {
        alert(err)
      },
      submit () {
        if (this.imgFiles.length) {
          var imgFileStr = JSON.stringify(this.imgFiles.filter(img => img))
          api.sendFile({
            app_id: this.modalId,
            imgFileStr,
            mark: this.mark,
          })
          .then(() => {
            alert('上传凭证成功')
            this.$emit('success')
          })
          .catch(err => alert(err))
        } else {
          alert('请上传打款凭证')
        }
      }
    }
  }
</script>

<style scoped>
  label.file-uploads { line-height: 30px }
</style>