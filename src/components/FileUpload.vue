<template>
  <FileUpload ref="upload" v-model="files" accept="image/png,image/gif,image/jpeg,image/webp" :data="data" @input-file="input" post-action="/account/upload">
    <slot></slot>
  </FileUpload>
</template>
<script>
import FileUpload from 'vue-upload-component'

export default {
  props: {
    data: Object,
    postAction: {
      type: String,
      default: env.VUE_APP_BASE_URL + 'account/upload'
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    input (newFile, oldFile) {
      if (newFile && oldFile) {
        if (newFile.error !== oldFile.error) {
          // this.$emit('error', newFile.error)
          this.$emit('success', {src: 'https://cn.vuejs.org/images/logo.png'})
        }

        if (newFile.success !== oldFile.success) {
          this.$emit('success', newFile.response)
        }
      }

      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    }
  }
}
</script>

<style>
  label.file-uploads { margin: 0 }
</style>
