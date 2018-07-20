<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div class="content-body form-horizontal">
        <div class="form-group clearfix">
          <label for="return_img0" class="col-lg-2 control-label">上传打款凭证：</label>
          <div class="col-lg-10">
            <FileUpload>选择文件</FileUpload>
            <span class="fr">*仅限jpg/png/bmp/gif</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="return_img1" class="col-lg-2 control-label"></label>
          <div class="col-lg-10">
           <FileUpload>选择文件</FileUpload>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="return_img2" class="col-lg-2 control-label"></label>
          <div class="col-lg-10">
            <FileUpload>选择文件</FileUpload>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="inputPassword1" class="col-lg-2 control-label">备注:</label>
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
    props: ['title', 'width', 'modalId'],
    data () {
      return {
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
      submit () {
        api.test()
      }
    },
    mounted () {
      console.log('load' + this.modalId)
    }
  }
</script>

<style>
</style>