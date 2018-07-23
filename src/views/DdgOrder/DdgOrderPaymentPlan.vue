<template>
  <BaseModal title="收款计划" :width="width" @close="close">
    <template slot="body">
      <div>
        <table class="table table-bordered table-hover table-condensed deep-table" id="paymentPlanTable">
          <thead>
            <tr>
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
            <tr v-for="item of repaymentPlan">
              <td>{{ item.tenor }}</td>
              <td>{{ item.payDate }}</td>
              <td>{{ item.finishDate }}</td>
              <td>{{ item.payAmount }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.payCorpus }}</td>
              <td>{{ item.charge }}</td>
              <td>{{ item.payRisk }}</td>
              <td>{{ item.payRepayAllFee }}</td>
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
      }
    },
    mounted () {
      api.ddgPaymentPlan({
        orderNo: this.modalId
      })
      .then(res => {
        this.repaymentPlan = res.rows
      })
    }
  }
</script>