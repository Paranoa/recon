<template>
  <BaseModal title="提示" :width="width" @close="close">
    <template slot="body">
      <div>
        <div style="margin:10px auto; width: 400px;height: 50px">
          <div>
            <span style="color: red">请上传电子回单:</span>
            <FileUpload @success="uploaded" action="account/file/upload" :data="{ storeCode }">
              <span class="btn" style="margin: 0 10px">点击上传文件</span>
            </FileUpload>
            <span>{{ fileName || '未选择任何文件' }}</span>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal'
  import FileUpload from '@/components/FileUpload'

  export default {
    props: ['width', 'storeCode'],
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
      uploaded (res, fileName) {
        this.fileName = fileName
        alert('上传成功')
        this.$emit('success')
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>