<template>
  <div>
    <BaseModal title="申请单单过" :width="width" @close="close">
      <template slot="body">
        <div class="main-text">
          <div>确认该订单进行单单过申请吗？</div>
          <div>
            <input type="checkbox" v-model="agreed" id="agree" style="margin: 0">
            <label style="display: inline; font-size: 17px" for="agree">我已阅读并同意</label>
            <a @click="showAgeee=true" style="text-decoration: underline; cursor: pointer;">《单单过产品协议》</a>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="fl wd50p btn-white" @click="close">取消</div>
        <div class="fl wd50p btn-blue" @click="apply">确认申请</div>
      </template>
    </BaseModal>
    <aside class="backdrop" @click="close"></aside>
    <div class="iframe-box" v-show="showAgeee">
      <iframe :src="agreeLink"></iframe>
    </div>
  </div>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import api from '@/api'
  import util from '@/util'

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        agreed: true,
        showAgeee: false,
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
            alert('申请成功')
            this.$emit('success')
          })
          .catch(err => alert(err))
        } else {
          alert('请阅读并同意《单单过产品协议》') 
        }
      },
      close () {
        if (this.showAgeee) {
          this.showAgeee = false
        } else {
          this.$emit('close')
        }
      }
    },
    mounted () {
      api.ddgCpxy({
        appId: this.modalId
      })
      .then(res => {
        this.agreeLink = util.appendUrlParams(process.env.VUE_APP_DDG_CPXY, res)
      })
    }
  }
</script>

<style scoped>
  .main-text { font-size: 17px; line-height: 2; padding: 15px 0; }
  .btn-white, .btn-blue { text-align: center; line-height: 40px; font-size: 17px }
  .btn-white { color: #585858; background: #fff  }
  .btn-blue { color: #fff; background: #1BB3FD }
  .iframe-box { position: fixed; top: 50px; left: 5%; width: 90%; height: 550px; z-index: 20000; border-radius: 10px; overflow: hidden; background: #fff; }
  .iframe-box iframe { width: 100%; height: 100%; }
</style>