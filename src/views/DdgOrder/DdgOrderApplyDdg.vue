<template>
  <BaseModal title="申请单单过" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <p><strong style="font-size:17px;">确认该订单进行单单过申请吗？</strong></p>
        <div style="font-size:15px; margin-top:20px;">
          <input type="checkbox" v-model="agreed" id="agree" style="margin: 0">
          <label style="display: inline; color:#777;" for="agree">我已阅读并同意</label>
          <a target="_blank" :href="agreeLink" style="text-decoration: underline; cursor: pointer;">《单单过产品协议》</a>
        </div>
        <div class="flex flexCenter" style="margin-top:50px;">
          <div class="closeApply" @click="close">取消</div>
          <div class="apply" @click="apply">确认申请</div>
        </div>
      </div>
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
<style scoped>
  .content-body{
    padding: 40px 70px 30px 70px;
    height: 210px;
  }
  a{
    text-decoration: none !important;
  }
  .closeApply{
    background: #FAFAFA;
    border: 1px solid #A0A0A0;
    box-shadow: 0 1px 3px 0 rgba(210,210,210,0.92);
    border-radius: 100px;
    width: 110px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: #777;
    cursor: pointer;
  }
  .apply{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: #fff;
    cursor: pointer;
    width: 110px;
    height: 35px;
    background: #1A9BFE;
    box-shadow: 0 1px 3px 0 rgba(68,165,249,0.92);
    border-radius: 100px;
    margin-left: 20px;
  }
</style>
