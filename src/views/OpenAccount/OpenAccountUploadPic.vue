<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div>
        <div style="margin:10px auto; width: 400px;height: 50px">
          <div>
            <span style="color: red">请上传电子回单:</span>
            <FileUpload @success="uploaded">点击上传文件</FileUpload>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="confirm">确认</button>
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal'
  import FileUpload from '@/components/FileUpload'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        uploadImg: ''
      }
    },
    components: {
      BaseModal,
      FileUpload
    },
    methods: {
      uploaded () {
        tihs.$emit('upload')
      },
      close () {
        this.$emit('close')
      }
    }
  }

  function valForm () {

  }

</script>