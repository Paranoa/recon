<template>
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div v-if="isMerchantFlag">
          <div>门店搜索
            <input name="searchStoreName" type="text" id="searchStoreName" v-model="storeName">
            <button type="button" @click="search" style="margin-left: 15px; margin-bottom: 10px">点击搜索</button></div>
        </div>
        <div>
          <table class="table table-hover">
            <template v-for="(store, key) in storeInfos">
              <tr>
                <th colspan="5" style="border-top: none; font-size: 17px; font-weight: bold; line-height: 3; padding: 6px">{{ key }}</th>
              </tr>
              <tr>
                <th>渠道名称</th>
                <th>开户状态</th>
                <th>银行账号</th>
                <th>可提现余额(元)</th>
                <th>操作</th>
              </tr>
              <template v-for="fund of store">
                <tr>
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
                    <template v-if="fund.quDaoCode === 'KLJ01'">
                      <div v-if="fund.openStatus === 'APPLYING' || fund.openStatus ==='BACK'" class="btn-glow btn btn-lg" @click="openAccount(fund)">开户</div>
                      <div v-if="fund.openStatus === 'AUDIT'">--</div>
                      <div v-if="fund.openStatus === 'PASSED'" class="btn-glow btn btn-lg"
                        @click="cashKL(fund)">提现</div>
                      <div v-if="fund.openStatus === 'PASSED'" class="btn-glow btn btn-lg"
                        @click="modal.cashRecord = true, modalParam.cashRecord = fund">提现记录</div>
                    </template>
                    <template v-else-if="fund.quDaoCode === 'SSJ01'">
                      <div v-if="fund.openStatus === '4' || fund.openStatus ==='2'" class="btn-glow btn btn-lg" @click="openAccount(fund)">开户</div>
                      <div v-if="fund.openStatus === '3'">--</div>
                      <div v-if="fund.openStatus === '1'" class="btn-glow btn btn-lg"
                        @click="modal.ssjCash = true, modalParam.ssjCash = fund.storeCode">提现</div>
                      <div v-if="fund.openStatus === '1'" class="btn-glow btn btn-lg"
                        @click="modal.cashRecord = true, modalParam.cashRecord = fund">提现记录</div>
                    </template>
                  </td>
                </tr>
              </template>
            </template>
            <tr v-if="!Object.keys(storeInfos).length">
              <td colspan="5">加载中...</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <aside class="backdrop" v-show="hasModal"></aside>

    <CashRecord v-if="modal.cashRecord" width="1000px" title="提现记录" 
      :modalParam="modalParam.cashRecord"
      @close="closeModal('cashRecord')" />

    <SSJCash v-if="modal.ssjCash" width="500px" title="提示" 
      :modalId="modalParam.ssjCash"
      @close="closeModal('ssjCash')"
      @inputed="amount => { depositAmount = amount; cashSSJ()}"></SSJCash>

  </div>
</template>

<script>
  import api from '@/api/api'
  import CashRecord from './OpenAccountCashRecord.vue'
  import SSJCash from './OpenAccountSSJCash.vue'

  export default {
    data () {
      return {
        isMerchantFlag: true,
        modal: {
          cashRecord: false,
          ssjCash: false
        },
        modalParam: {
          cashRecord: '',
          ssjCash: ''
        },
        storeInfos: {},
        storeName: ''
      }
    },
    computed: {
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
      SSJCash
    },
    methods: {
      search () {
      },
      closeModal (modalId) {
        this.modal[modalId] = false
      },
      cashKL (fund) {
        api.storeDeposit({
          storeCode: fund.storeCode,
          fundId: 'KLJ01'
        })
        .then(res => {

        })
        .catch(err => alert(err))
      },
      cashSSJ (fund) {
        var newWin = window.open()
        newWin.document.body.innerHTML = '加载中...';

        api.storeDeposit({
          storeCode: this.modalParam.ssjCash,
          fundId: 'SSJ01',
          depositAmount: this.depositAmount
        })
        .then(res => {
          newWin.location.href = res
        })
        .catch(err => {
          alert(err)
        })
      },
      cashRecordKL (fund) {
        console.log(fund)
      },
      cashRecordSSJ (fund) {
        console.log(fund)
      }
    },
    mounted () {
      api.storeFundList({ storeCode: 'csyd' })
        .then(res => {
          this.storeInfos = res
        })
    }
  }
</script>

<style scoped>
  .btns .btn { margin: 0 3px; }
</style>