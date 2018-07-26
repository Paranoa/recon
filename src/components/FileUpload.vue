<template>
  <FileUpload ref="upload" v-model="files" accept="image/png,image/gif,image/jpeg,image/webp" :data="data" @input-file="input" :post-action="postAction" :multiple="multiple" :size="2 * 1024 * 1024">
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
    },
    multiple: {
      type: Boolean,
      default: false
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
          if (newFile.response.success) {
            this.$emit('success', newFile.response, newFile,name)
          } else {
            this.$emit('error', newFile.response.errorMessage)
          }
        }
      }

      if (this.auto) {
        // 自动上传
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      } else {
        // 只在auto为false时会触发的事件 传出refs引用,父组件以ref.active = true的形式激活上传
        var fileName = newFile ? newFile.name : ''
        this.$emit('selected', this.$refs.upload, fileName)
      }

    }
  }
}
</script>

<style scoped>
  label.file-uploads { margin: 0; display: inline }
</style>
