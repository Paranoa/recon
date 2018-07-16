<template>
  <BaseModal :width="width" title="退款确认" @close="close">
    <template slot="body">
      <div class="modal-body">
        <div class="form-group">
          <span class="col-lg-2">备注:</span>
          <span class="col-lg-10">{{ show_mark }}</span>
        </div>
        <br>
        <div class="form-group">
          <span class="col-lg-2">打款凭证：</span>
          <div class="col-lg-10">
            <a :href="img.src" target="_blank" v-for="img of imgs" class="img-group">
              <img :src="img.src">
            </a>
          </div>
        </div>
        <br>
        <div class="form-group">
          <span class="col-lg-2">打回原因:</span>
          <div class="col-lg-10">
            <textarea rows="3" style="margin: 0; width: 496px; height: 60px; resize: none" v-model="return_mark"></textarea>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="modal-footer">
        <button class="btn btn-default submit_audit" @click="pass">通过</button>
        <button class="btn btn-primary submit_audit" @click="reject">打回</button>
        <button class="btn btn-default" @click="close">关闭</button>
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import api from '@/api/api'
  import BaseModal from '@/components/BaseModal.vue'

  export default {
    props: {
      width: {
        type: String
      },
      modalParam: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        show_mark: this.modalParam.show_mark || '',
        return_mark: this.modalParam.return_mark || '',
        imgs: this.modalParam.imgs || [{src: 'https://cn.vuejs.org/images/logo.png'}, {src: 'https://cn.vuejs.org/images/logo.png'}, {src: 'https://cn.vuejs.org/images/logo.png'}]
      }
    },
    components: {
      BaseModal
    },
    methods: {
      pass () {

      },
      reject () {
        if (this.return_mark) {
          if (confirm('确定要这样操作吗？')) {
          }
        } else {
          alert('提示：打回需要填写打回原因！')
        }
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .img-group img { max-width: 100px; margin: 10px }
</style>