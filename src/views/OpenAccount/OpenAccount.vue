<template>
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div v-if="!isShop">
          <form @submit.prevent="storeFundList">门店搜索
            <input type="text" v-model="query.storeName">
            <button style="margin-left: 15px; margin-bottom: 10px">点击搜索</button>
          </form>
        </div>
        <div>
          <table class="table table-hover">
            <template v-for="(store, key) in storeInfos">
              <tr :key="key">
                <th colspan="5" style="border-top: none; font-size: 17px; font-weight: bold; line-height: 3; padding: 6px">{{ key }}</th>
              </tr>
              <tr :key="key">
                <th>渠道名称</th>
                <th>开户状态</th>
                <th>银行账号</th>
                <th>可提现余额(元)</th>
                <th>操作</th>
              </tr>
              <tr v-for="fund of store" :key="fund.quDaoCode">
                <td>{{ fund.quDaoCode | fundName }}</td>
                <td>
                  <template v-if="fund.quDaoCode === 'KLJ01'">
                    {{ fund.openStatus | openStatusKL }}
                  </template>
                  <template v-else-if="fund.quDaoCode === 'SSJ01'">
                    {{ fund.openStatus | openStatusSSJ }}
                  </template></td>
                <td>{{ fund.bankNo }}</td>
                <td>{{ fund.tMoney }}</td>
                <td class="btns">
                  <template v-if="false && fund.quDaoCode === 'KLJ01'"> <!-- 考拉操作禁用 -->
                    <div v-if="fund.openStatus === 'APPLYING' || fund.openStatus ==='BACK'" class="btn-glow btn btn-lg" @click="openAccountKL(fund)">开户</div>
                    <div v-if="fund.openStatus === 'AUDIT'">--</div>
                    <div v-if="fund.openStatus === 'PASSED'" class="btn-glow btn btn-lg"
                      @click="cashKL(fund)">提现</div>
                    <div v-if="fund.openStatus === 'PASSED'" class="btn-glow btn btn-lg"
                      @click="modal.cashRecord = true, modalParam.cashRecord = fund">提现记录</div>
                  </template>
                  <template v-else-if="fund.quDaoCode === 'SSJ01'">
                    <div v-if="fund.openStatus === '4' || fund.openStatus ==='2'" class="btn-glow btn btn-lg" @click="openAccountSSJ(fund)">开户</div>
                    <div v-if="fund.openStatus === '3'">--</div>
                    <div v-if="fund.openStatus === '1'" class="btn-glow btn btn-lg"
                      @click="modal.ssjCash = true, modalParam.ssjCash = fund.storeCode">提现</div>
                    <div v-if="fund.openStatus === '1'" class="btn-glow btn btn-lg"
                      @click="modal.cashRecord = true, modalParam.cashRecord = fund">提现记录</div>
                    <div v-if="fund.openStatus === '5'" class="btn-glow btn btn-lg" @click="unlockSSJ(fund)">解锁</div>
                    <div v-if="fund.openStatus === '1'" class="btn-glow btn btn-lg" @click="ResetPwdSSJ(fund)">重置密码</div>
                  </template>
                </td>
              </tr>
            </template>
            <tr v-if="loading">
              <td colspan="5">加载中...</td>
            </tr>
            <tr v-else-if="!Object.keys(storeInfos).length">
              <td colspan="5">无门店</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <aside class="backdrop" v-show="hasModal"></aside>

    <CashRecord v-if="modal.cashRecord" width="1000px"
      :modalParam="modalParam.cashRecord"
      @close="closeModal('cashRecord')" />

    <SSJCash v-if="modal.ssjCash" width="500px" 
      :modalId="modalParam.ssjCash"
      @close="closeModal('ssjCash')"
      @inputed="amount => { depositAmount = amount; cashSSJ()}"></SSJCash>

    <UploadPic v-if="modal.uploadPic" width="500px"
      :storeCode="modalParam.uploadPic"
      @success="closeModal('uploadPic'); storeFundList()"
      @close="closeModal('uploadPic')" />
  </div>
</template>

<script>
  import api from '@/api'
  import { apiUrl } from '@/api/config'
  import CashRecord from './OpenAccountCashRecord.vue'
  import SSJCash from './OpenAccountSSJCash.vue'
  import UploadPic from './OpenAccountUploadPic.vue'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        loading: true,
        modal: {
          cashRecord: false,
          ssjCash: false,
          uploadPic: false
        },
        modalParam: {
          cashRecord: '',
          ssjCash: '',
          uploadPic: ''
        },
        storeInfos: {},
        query: {
          storeName: ''
        }
      }
    },
    computed: {
      ...mapGetters(['isShop']),
      hasModal () {
        for (var key in this.modal) {
          if (this.modal[key]) {
            return true
          }
        }
      }
    },
    components: {
      CashRecord,
      SSJCash,
      UploadPic
    },
    methods: {
      closeModal (modalId) {
        this.modal[modalId] = false
      },
      storeFundList () {
        this.loading = true
        api.storeFundList({ searchStoreName: this.query.storeName })
        .then(res => {
          this.loading = false
          this.storeInfos = res || {}
        })
        .catch(err => {
          this.loading = false
          this.$ui.alert(err)
        })
      },
      openAccountKL (fund) {
        api.storeOpenAccount({
          storeCode: fund.storeCode,
          fundId: fund.quDaoCode
        })
        .then(res => {
          window.open(res)
        })
        .catch(err => {
          if (/未上传图片.*请上传图片/.test(err)) {
            this.modal.uploadPic = true
            this.modalParam.uploadPic = fund.storeCode
          } else {
            this.$ui.alert(err)
          }
        })
      },
      openAccountSSJ (fund) {
        api.storeOpenAccount({
          storeCode: fund.storeCode,
          fundId: fund.quDaoCode
        })
        .then(res => {
          window.open(res)
        })
        .catch(err => {
          if (/未上传图片.*请上传图片/.test(err)) {
            this.modal.uploadPic = true
            this.modalParam.uploadPic = fund.storeCode
          } else {
            this.$ui.alert(err)
          }
        })
      },
      cashKL (fund) {
        api.storeDeposit({
          storeCode: fund.storeCode,
          fundId: 'KLJ01',
          depositAmount: 0,
        })
        .then(res => {
          var newWin = window.open()
          newWin.document.body.innerHTML = '加载中...';
          newWin.document.write(res)
          newWin.focus()
        })
        .catch(err => this.$ui.alert(err))
      },
      cashSSJ () {
        api.storeDeposit({
          storeCode: this.modalParam.ssjCash,
          fundId: 'SSJ01',
          depositAmount: this.depositAmount
        })
        .then(res => {
          window.open(res)
        })
        .catch(err => {
          this.$ui.alert(err)
        })
      },
      unlockSSJ ({ storeCode }) {
        api.storeUnlock({
          storeCode,
          callbackUrl: apiUrl.cbUrl + '/home/openAccount'
        })
        .then(res => {
          window.open(res)
        })
        .catch(err => {
          this.$ui.alert(err)
        })

      },
      ResetPwdSSJ ({ storeCode }) {
        api.storeResetPwd({
          storeCode,
          callbackUrl: apiUrl.cbUrl + '/home/openAccount'
        })
        .then(res => {
          window.open(res)
        })
        .catch(err => {
          this.$ui.alert(err)
        })
      }
    },
    mounted () {
      this.storeFundList()
    }
  }
</script>

<style scoped>
  .btns .btn { margin: 0 3px; }
</style>