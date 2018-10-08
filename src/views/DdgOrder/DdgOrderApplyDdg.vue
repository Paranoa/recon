<template>
  <BaseModal title="申请单单过" :width="width" @close="close">
    <template slot="body">
      <div>确认该订单进行单单过申请吗？</div>
      <div>
        <input type="checkbox" v-model="agreed" id="agree" style="margin: 0">
        <label style="display: inline; font-size: 12px" for="agree">我已阅读并同意</label>
        <a target="_blank" :href="agreeLink" style="text-decoration: underline; cursor: pointer;">《单单过产品协议》</a>
        </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="apply">确认申请</button>
      <button type="button" class="btn btn-default" @click="close">取消</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import api from '@/api'
  import { apiUrl } from '@/api/config'
  import util from '@/util'

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        agreed: true,
        agreeLink: ''
      }
    },
    components: {
      BaseModal
    },
    methods: {
      apply () {
        if (this.agreed) {
          api.ddgSubmit({
            appId: this.modalId
          })
          .then(() => {
            this.$ui.alert('申请成功')
            this.$emit('success')
          })
          .catch(err => this.$ui.alert(err))
        } else {
          this.$ui.alert('请阅读并同意《单单过产品协议》') 
        }
      },
      close () {
        this.$emit('close')
      }
    },
    mounted () {
      api.ddgCpxy({
        appId: this.modalId
      })
      .then(res => {
        this.agreeLink = util.appendUrlParams(apiUrl.ddgCPXY, res)
      })
    }
  }
</script>