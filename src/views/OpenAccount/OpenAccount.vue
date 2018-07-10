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
              <template v-for="(fund, key) in store">
                <tr>
                  <td>{{ key }}</td>
                  <td>{{ fund.openStatus }}</td>
                  <td>{{ fund.bankNo }}</td>
                  <td>{{ fund.tMoney }}</td>
                  <td>
                    <div v-if="fund.showKH" class="btn-glow btn  btn-lg createAccount" @click="openAccount(fund)">开户</div>
                    <div v-if="fund.showKH === '--'"  >--</div>
                    <div v-if="fund.showTX" class="btn-glow btn btn-lg withdraw" @click="cash(fund)">提现</div>
                    <div v-if="fund.showTXLS" class="btn-glow btn btn-lg showWithdraw" @click="cashRecord(fund)">提现记录</div>
                  </td>
                </tr>
              </template>
            </template>
          </table>
        </div>
      </div>
    </div>
    <aside class="backdrop" v-show="hasModal"></aside>
    <CashRecord v-if="modal.cashRecord" width="500px" title="提现记录" :modalId="modalId.cashRecord"  @close="closeModal('cashRecord')" />
    <SSJCash  v-if="modal.ssjCash" width="500px" title="提示" :modalId="modalId.ssjCash"  @close="closeModal('ssjCash')"></SSJCash>
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
          ssjCash: true
        },
        modalId: {
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
      closeModal(modalId) {
        this.modal[modalId] = false
      }
    },
    mounted () {
      api.storeFundList({
        storeCode: 'BB0409',
        fundId: 'SSJ01',
      }).then(res => {
        this.storeInfos = res
      })
    }
  }
</script>