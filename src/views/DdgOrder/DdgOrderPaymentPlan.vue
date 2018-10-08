<template>
  <BaseModal title="收款计划" :width="width" @close="close">
    <template slot="body">
      <div>
        <div class="search-line" style="margin-bottom: 20px; text-align: right; width: auto;">
          <button type="button" class="btn-glow" style="margin-left: 20px;" @click="exportXls"><i class="icon-search"></i>导出</button>
        </div>
        <table class="table table-bordered table-hover table-condensed deep-table ddg-table">
          <thead>
            <tr class="ddg-thead">
              <th>期数</th>
              <th>计划收款日期</th>
              <th>实际收款日期</th>
              <th>应收金额</th>
              <th>收款状态</th>
              <th>应收本金</th>
              <th>应收手续费</th>
              <th>应收风险管理费</th>
              <th>应收提前还款手续费</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of repaymentPlan" :key="item.key">
              <td>{{ item.tenor }}</td>
              <td>{{ item.payDate | simpleDate }}</td>
              <td>{{ item.finishDate | simpleDate }}</td>
              <td class="txtrt">{{ item.payAmount | fix2 }}</td>
              <td>{{ item.status }}</td>
              <td class="txtrt">{{ item.payCorpus | fix2 }}</td>
              <td class="txtrt">{{ item.charge | fix2 }}</td>
              <td class="txtrt">{{ item.payRisk | fix2 }}</td>
              <td class="txtrt">{{ item.payRepayAllFee | fix2 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import api from '@/api'
  import util from '@/util'

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        repaymentPlan: []
      }
    },
    components: {
      BaseModal
    },
    methods: {
      close () {
        this.$emit('close')
      },
      exportXls () {
        api.ddgExportPaymentPlan({
          orderNo: this.modalId
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '收款计划导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))              
          }
        })
        .catch(err => this.$ui.alert(err))
      }
    },
    mounted () {
      api.ddgPaymentPlan({
        orderNo: this.modalId
      })
      .then(res => {
        this.repaymentPlan = res.rows
      })
      .catch(err => this.$ui.alert(err))
    }
  }
</script>

<style scoped>
  .ddg-table td {
    text-align: center;
  }
  
  .ddg-thead th {
    padding-bottom: 5px;
    background: #eee;
    text-align: center
  }
</style>