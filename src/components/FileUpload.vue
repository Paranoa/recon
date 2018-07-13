<template>
  <FileUpload ref="upload" v-model="files" accept="image/png,image/gif,image/jpeg,image/webp" :data="data" @input-file="input" :post-action="postAction">
    <slot></slot>
  </FileUpload>
</template>
<script>
import FileUpload from 'vue-upload-component'

export default {
  props: {
    data: Object,
    action: {
      type: String,
      default: 'account/upload'
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      files: [],
      postAction: process.env.VUE_APP_BASE_URL + this.action
    }
  },
  methods: {
    input (newFile, oldFile) {
      if (newFile && oldFile) {
        if (newFile.error !== oldFile.error) {
          this.$emit('error', newFile.error)
        }

        if (newFile.success !== oldFile.success) {
          this.$emit('success', newFile.response)
        }
      }

      // 自动上传
      if (this.auto && (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error)) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    }
  }
}
</script>

<style scoped>
  label.file-uploads { margin: 0; display: inline }
</style>
