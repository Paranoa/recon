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
            <a :href="img.cFtpPath" target="_blank" v-for="img of imgs" class="img-group">
              <img :src="img.cFtpPath">
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
        default () {
          return {
            mark: '',
            return_mark: '',
            imgs: []
          }
        }
      }
    },
    data () {
      return {
        show_mark: this.modalParam.mark || '',
        return_mark: this.modalParam.return_mark || '',
        imgs: this.modalParam.imgs 
      }
    },
    components: {
      BaseModal
    },
    methods: {
      pass () {
        api.tkAudit({
          refund_audit: '3',
          return_mark: this.return_mark,
          app_id: this.modalParam.C_APP_ID
        })
        .then(() => {
          alert('操作成功')
          this.$emit('success')
        })
        .catch(err => alert(err))
      },
      reject () {
        if (this.return_mark) {
          if (confirm('确定要这样操作吗？')) {
            api.tkAudit({
              refund_audit: '23',
              return_mark: this.return_mark,
              app_id: this.modalParam.C_APP_ID
            })
            .then(() => {
              alert('操作成功')
              this.$emit('success')
            })
            .catch(err => alert(err))
          }
        } else {
          alert('提示：打回需要填写打回原因！')
        }
      },
      close () {
        this.$emit('close')
      }
    },
    mounted () {
      console.log(this.modalParam)
    }
  }
</script>

<style scoped>
  .img-group img { max-width: 100px; margin: 10px }
</style>